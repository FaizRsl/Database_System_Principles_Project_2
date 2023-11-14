import json
from sys import stderr
import networkx as nx
from datetime import date
from networkx.readwrite import json_graph
from database import *

def visualize_explain_query(plan):
    try:
        plan = json.loads(plan)

        queue = []
        visited = []

        unique_id = 1

        explanation = ""

        graph = nx.DiGraph()

        if "Plan" in plan:
            root = plan["Plan"]
            root["id"] = string_unique_id(unique_id)
            root["depth"] = 0
            root_node = string_unique_id(unique_id)

            # unique_id = chr(ord(unique_id) + 1)
            unique_id += 1
            # unique_id = get_next_unique_id(unique_id)

            queue.append(root)

            graph.add_node(
                root["id"],
                node_type=root["Node Type"],
                cost=root["Startup Cost"] + root["Total Cost"],
                depth=root["depth"],
            )

            while queue:
                current = queue.pop(0)
                visited.append(current)
                children = []

                if "Plans" in current:
                    depth = current["depth"] + 1

                    for child in current["Plans"]:
                        if child not in visited:
                            child["id"] = string_unique_id(unique_id)
                            child["depth"] = depth
                            # unique_id = chr(ord(unique_id) + 1)
                            # unique_id = get_next_unique_id(unique_id)
                            unique_id += 1
                            queue.append(child)
                            children.append(child)

                            graph.add_node(
                                child["id"],
                                node_type=child["Node Type"],
                                cost=child["Startup Cost"] + child["Total Cost"],
                                depth=depth,
                            )

                            graph.add_edge(current["id"], child["id"])

                    explanation = craft_explanation_string(
                        explanation, current["Node Type"], children, current["id"]
                    )

                # If we reach here, we are at a leaf node, add the table itself to the graph
                else:
                    table = {}
                    table["id"] = string_unique_id(unique_id)
                    table["depth"] = current["depth"] + 1
                    # unique_id = chr(ord(unique_id) + 1)
                    # unique_id = get_next_unique_id(unique_id)
                    unique_id += 1

                    graph.add_node(
                        table["id"],
                        node_type=current["Relation Name"],
                        cost=0,
                        depth=table["depth"],
                    )

                    graph.add_edge(current["id"], table["id"])

                    explanation = craft_explanation_string(
                        explanation, current["Node Type"], current, current["id"]
                    )

            # Return graph as JSON
            data = json_graph.node_link_data(graph)

            # Format the explanation to go from leaf to root. We return a list. The last element is an empty string, so pop it first
            explanation = explanation.split(".")
            explanation.pop(-1)
            explanation.reverse()

            return data, explanation
        else:
            return {}
    except Exception as e:
        print(f"An error occurred: {e}")


""" #################################################################### 
Crafts the explanation string for the graph
#################################################################### """

def craft_explanation_string(explanation, node_type, child_names, current_name):
    try:
        explanation += node_type + " "

        # Take care of joins and sorts
        if (
            node_type == "Hash"
            or node_type == "Sort"
            or node_type == "Incremental Sort"
            or node_type == "Gather Merge"
            or node_type == "Merge"
            or node_type == "Aggregate"
        ):
            explanation += child_names[0]["id"] + " as " + current_name + "."
        elif (
            node_type == "Hash Join"
            or node_type == "Nested Loop"
            or node_type == "Merge Join"
        ):

            if node_type == "Nested Loop":
                explanation += "Join "

                explanation += (
                    "between "
                    + child_names[0]["Node Type"]
                    + " "
                    + child_names[0]["id"]
                    + " (outer) and "
                    + child_names[1]["Node Type"]
                    + " "
                    + child_names[1]["id"]
                    + " (inner) as "
                    + current_name
                    + "."
                )

        else:
            # nodes like Materialize
            try:
                explanation += child_names[0]["id"] + " as " + current_name + "."
            # Relation nodes
            except:
                explanation += (
                    "on " + child_names["Relation Name"] + " as " + current_name + "."
                )
        return explanation
    except Exception as e:
        print(f"An error occurred: {e}")


""" #################################################################### 
Generates a unique ID (running character sequence) for nodes as a string
#################################################################### """


def string_unique_id(unique_id):
    try:
        return "T" + str(unique_id)
    except Exception as e:
        print(f"An error occurred: {e}")

def dict_like_to_list(dict_like, output_type):
    try:
        if output_type == "float":
            output = dict_like[1:-1]
            output = output.split(",")
            cleaned_output = [float(i) for i in output]

        if output_type == "integer":
            output = dict_like[1:-1]
            output = output.split(",")
            cleaned_output = [int(i) for i in output]

        if output_type == "date":
            output = dict_like[1:-1]
            output = output.split(",")
            cleaned_output = [date.fromisoformat(i) for i in output]
        return cleaned_output

    except Exception as e:
        print(f"An error occurred: {e}")


""" #################################################################### 
used to get the datatype of the attribute 
#################################################################### """


def get_attribute_datatype(relation, attribute):
    try:
        # retrieve a histogram
        sql = f"SELECT data_type FROM information_schema.columns WHERE table_name = '{relation}' AND column_name = '{attribute}';"
        result = query(sql)
        result = result[0]
        return result

    except Exception as e:
        print(f"An error occurred: {e}")


""" #################################################################### 
used to get the histgram for a specific attribute from a table 
#################################################################### """


def get_histogram(relation, attribute, conditions):
    try:
        operators, attribute_values, attribute_datatypes = [], [], []
        predicate_datatype = ""

        # recreate the data in the correct type
        for condition in conditions:
            operators.append(condition[0])
            datatype = get_attribute_datatype(relation, attribute)
            attribute_datatypes.append(datatype)

            if datatype == "integer":
                attribute_values.append(int(condition[1]))
            if datatype == "numeric":
                attribute_values.append(float(condition[1]))
                predicate_datatype = "numeric"
            elif datatype == "date":
                attribute_values.append(date.fromisoformat(condition[1][1:-1]))
                predicate_datatype = "date"
            else:
                attribute_values.append(condition[1])
                predicate_datatype = "string"

        # fail condition
        if len(operators) == 0:
            return "ERROR - Please give at least one valid predicate to explore."

        # dictionary object to store return result
        return_values = {
            "relation": relation,
            "attribute": attribute,
            "datatype": predicate_datatype,
            "conditions": {},
        }

        # do for every condition
        for i in range(len(operators)):
            operator = operators[i]
            attribute_value = attribute_values[i]
            attribute_datatype = attribute_datatypes[i]
            condition = conditions[i]

            # retrieve a histogram
            sql = f"SELECT histogram_bounds FROM pg_stats WHERE tablename = '{relation}' AND attname = '{attribute}';"
            result = query(sql)
            result = result[0]

            if attribute_datatype == "numeric":
                histogram = dict_like_to_list(result, "float")
            if attribute_datatype == "integer":
                histogram = dict_like_to_list(result, "integer")
            if attribute_datatype == "date":
                histogram = dict_like_to_list(result, "date")

            num_buckets = len(histogram) - 1

            # get the selectivity for the given attribute value
            leftbound = 0
            for i in range(num_buckets):
                if attribute_value > histogram[i]:
                    leftbound = i

            selectivity = (
                leftbound
                + (attribute_value - histogram[leftbound])
                / (histogram[leftbound + 1] - histogram[leftbound])
            ) / num_buckets

            # inverse logic for the >= and > operators, since prior logic assumes a <= or < operator
            if operator in ["<=", "<"]:
                pass
            elif operator in [">=", ">"]:
                selectivity = 1 - selectivity

            # set floor and ceiling
            if selectivity <= 0:
                selectivity = 0
            if selectivity >= 1:
                selectivity = 1

            # get 20% below until 20% above, in 10% intervals
            selectivities = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]

            lower = [v for v in selectivities if v <= selectivity]
            higher = [v for v in selectivities if v >= selectivity]
            lower.sort()
            higher.sort()

            selectivities_required = []

            if len(lower) != 0:
                lower_leftbound = max(len(lower) - 2, 0)
                for i in lower[lower_leftbound:]:
                    selectivities_required.append(i)

            if len(higher) != 0:
                higher_rightbound = min(len(higher), 2)
                for i in higher[:higher_rightbound]:
                    selectivities_required.append(i)

            selectivities_required.sort()
            selectivities_required = list(set(selectivities_required))

            # get the corresponding values to the selectivity that we want from the histogram
            values_required = {}
            for i in selectivities_required:
                if operator in ["<=", "<"]:
                    pass
                elif operator in [">=", ">"]:
                    i = 1 - i

                index = int(i * num_buckets)

                if operator in ["<=", "<"]:
                    values_required[i] = histogram[index]
                elif operator in [">=", ">"]:
                    values_required[1 - i] = histogram[index]

            # craft return value
            return_value = {
                "queried_selectivity": selectivity,
                "histogram_bounds": values_required,
            }

            return_values["conditions"][condition] = return_value

        return return_values

    except Exception as e:
        print(f"An error occurred: {e}")
