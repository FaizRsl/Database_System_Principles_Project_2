from flask import Flask, request
from sys import stderr
import ast
import re
from datetime import date

from constant.constants import (
    table_prefix,
    equality_comparators,
)

from sqlparser import *
from generator import *
from explore import *

from dotenv import load_dotenv

app = Flask(__name__)
app.config.from_object("config.Config")

@app.route("/generate", methods=["POST"])
def get_plans():
    try:
        request_data = request.json
        sqlQuery = request_data["query"]
        predicates = request_data["predicates"]

        qepString = "EXPLAIN (COSTS, VERBOSE, BUFFERS, FORMAT JSON) " + sqlQuery

        initialQep = query(qepString, explain=True)
        initialQep = json.dumps(ast.literal_eval(str(initialQep)))
        initialGraph, initialExplanation = visualize_explain_query(initialQep)
        initialQep = json.loads(initialQep)

        initialSelectivities = []

        selectivitiesList = calculate_predicate_selectivities(sqlQuery, predicates)

        for predicate in selectivitiesList:
            attribute = predicate["attribute"]
            conditions = predicate["conditions"]

            for operator in conditions:
                queried_selectivity = conditions[operator]["queried_selectivity"]
                queried_value = conditions[operator]["histogram_bounds"][queried_selectivity]

                initialSelectivities.append(
                    {
                        "attribute": attribute,
                        "operator": operator,
                        "queried_value": queried_value,
                        "new_value": None,
                        "queried_selectivity": queried_selectivity,
                        "new_selectivity": None,
                    }
                )

        allQEPPlans = {}
        add_qep_plan(allQEPPlans, initialQep, initialGraph, initialExplanation, initialSelectivities, costPerRow(initialQep))

        if len(initialSelectivities) != 0:

            new_selectivities = calculate_predicate_selectivities(sqlQuery, predicates)
            new_plans = Generator().generate_plans(new_selectivities, sqlQuery)

            for index, (new_query, predicate_selectivity_data) in enumerate(new_plans):
                predicate_selectivity_combination = []

                for i in range(len(predicate_selectivity_data)):
                    predicate_selectivity = {
                        "attribute": predicate_selectivity_data[i][0],
                        "operator": predicate_selectivity_data[i][1],
                        "queried_value": predicate_selectivity_data[i][2],
                        "new_value": predicate_selectivity_data[i][3],
                        "queried_selectivity": predicate_selectivity_data[i][4],
                        "new_selectivity": predicate_selectivity_data[i][5],
                    }
                    predicate_selectivity_combination.append(predicate_selectivity)

                qep_sql_string = "EXPLAIN (COSTS, VERBOSE, BUFFERS, FORMAT JSON) " + new_query
                newQep = query(qep_sql_string, explain=True)
                newQep = json.dumps(ast.literal_eval(str(newQep)))
                newGraph, newExplanation = visualize_explain_query(newQep)
                newQep = json.loads(newQep)
                add_qep_plan(allQEPPlans, newQep, newGraph, newExplanation, predicate_selectivity_combination, costPerRow(newQep))

        best_plan_id_cost = allQEPPlans[0]["estimated_cost_per_row"]

        best_plan_id = 0
        for plan_id in allQEPPlans:
            if plan_id != 0:
                if (allQEPPlans[plan_id]["estimated_cost_per_row"] < best_plan_id_cost):
                    if (allQEPPlans[plan_id]["explanation"] != allQEPPlans[0]["explanation"]):
                        best_plan_id_cost = allQEPPlans[plan_id]["estimated_cost_per_row"]
                        best_plan_id = plan_id

        # debug tools
        # with open("log.txt", "a") as log_file:
        #     log_file.write(f"best_plan_id_cost: {best_plan_id_cost}\n\n")

        data = {
            "data": allQEPPlans,
            "best_plan_id": best_plan_id,
            "status": "Successfully executed query.",
            "error": False,
        }

        clean_json(data)
        return data

    except Exception as e:
        print(str(e), file=stderr)

def clean_json(d):
    try:
        if isinstance(d, dict):
            for v in d.values():
                yield from clean_json(v)
        elif isinstance(d, list):
            for v in d:
                yield from clean_json(v)
        else:
            if type(d) == date:
                d = d.strftime("%Y-%m-%d")
    except:
        print()

def calculate_predicate_selectivities(sqlString, predicates):
    try:
        sql_parser = SQLParser()
        sql_parser.parse_query(sqlString)
        predicate_selectivities = []
        for predicate in predicates:
            prefix = predicate.split("_")[0]
            relation = table_prefix[prefix]
            conditions = sql_parser.comparison[predicate]
            if conditions and conditions[0][0] not in equality_comparators:
                histogram_data = get_histogram(relation, predicate, conditions)
                result = {}
                for condition, value in histogram_data["conditions"].items():
                    if len(condition) == 2:
                        operator = condition[0]
                        new_value = {k: v for k, v in value.items()}
                        cur_selectivity = new_value["queried_selectivity"]
                        new_value["histogram_bounds"][cur_selectivity] = (
                            condition[1]
                            if histogram_data["datatype"] != "date"
                            else date.fromisoformat(condition[1][1:-1])
                        )
                        result[operator] = new_value
                histogram_data["conditions"] = dict(sorted(result.items()))

                predicate_selectivities.append(histogram_data)
        return predicate_selectivities
    except:
        print()

def costPerRow(qep):
    try:
        estimated_cost_per_row = (qep["Plan"]["Startup Cost"] + qep["Plan"]["Total Cost"]) / qep["Plan"]["Plan Rows"]
    except ZeroDivisionError:
        estimated_cost_per_row = (qep["Plan"]["Startup Cost"] + qep["Plan"]["Total Cost"])
    return estimated_cost_per_row

def add_qep_plan(all_qep_plans, qep, graph, explanation, predicate_selectivity_data, estimated_cost_per_row):
    temp_plans = {
        "qep": qep,
        "graph": graph,
        "explanation": explanation,
        "predicate_selectivity_data": predicate_selectivity_data,
        "estimated_cost_per_row": estimated_cost_per_row,
    }

    index = len(all_qep_plans)
    all_qep_plans[index] = temp_plans
