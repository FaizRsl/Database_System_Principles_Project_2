import datetime
from datetime import date
from sys import stderr

class Generator:
    def generate_plans(self, arr, original_sql):
        try:
            resultList = []

            def helper(index, path, predicate_selectivities):
                if index == len(arr):
                    resultList.append([path, predicate_selectivities])
                    return

                if len(arr[index]["conditions"]) == 1:
                    for operator, value in arr[index]["conditions"].items():
                        queried_selectivity = value["queried_selectivity"]
                        for selectivity, val in value["histogram_bounds"].items():
                            old_val = value["histogram_bounds"][queried_selectivity]
                            selectivity_data = (arr[index]["attribute"], operator, old_val, val, queried_selectivity, selectivity)
                            newQuery = self.replace(arr[index]["attribute"], operator, old_val, val, path)
                            predicate_selectivities = predicate_selectivities + [selectivity_data]
                            helper(index + 1, newQuery, predicate_selectivities)

                elif len(arr[index]["conditions"]) == 2:
                    count = 0
                    lessThanHistogram = []
                    moreThanHistogram = []
                    operators = []
                    for operator, value in arr[index]["conditions"].items():
                        queried_selectivity = value["queried_selectivity"]
                        old_val = value["histogram_bounds"][queried_selectivity]
                        count += 1
                        if count == 1:  # <
                            for selectivity, val in value["histogram_bounds"].items():
                                tempVal = val
                                tempSelectivity = selectivity
                                tempQueriedSelectivity = queried_selectivity
                                tempOldVal = old_val

                            lessThanHistogram = [tempVal, tempSelectivity, tempQueriedSelectivity, tempOldVal]
                            operators.append(operator)
                        elif count == 2:  # >
                            for selectivity, val in value["histogram_bounds"].items():
                                tempVal = val
                                tempSelectivity = selectivity
                                tempQueriedSelectivity = queried_selectivity
                                tempOldVal = old_val
                            moreThanHistogram = [tempVal, tempSelectivity, tempQueriedSelectivity, tempOldVal]
                            operators.append(operator)
                    for less_than, more_than in self.generate_ranges(lessThanHistogram, moreThanHistogram):
                        more_than_path = self.replace(arr[index]["attribute"], operators[1], more_than[3], more_than[0], path)
                        both_replaced_path = self.replace(arr[index]["attribute"], operators[0], less_than[3], less_than[0], more_than_path)
                        selectivity_data = [
                            (
                                arr[index]["attribute"],
                                operators[0],
                                less_than[3],
                                less_than[0],
                                less_than[2],
                                less_than[1],
                            ),
                            (
                                arr[index]["attribute"],
                                operators[1],
                                more_than[3],
                                more_than[0],
                                more_than[2],
                                more_than[1],
                            ),
                        ]
                        predicate_selectivities = predicate_selectivities + selectivity_data
                        helper(index + 1, both_replaced_path, predicate_selectivities)

            helper(0, original_sql, [])
            return resultList
        except Exception as e:
            print(f"An error occurred: {e}")

    def generate_ranges(self, lessThanHistogram, moreThanHistogram):
        try:
            valid_ranges = [
                (lessThanBound, moreThanBound)
                for lessThanBound in lessThanHistogram
                for moreThanBound in moreThanHistogram
                if lessThanBound[0] > moreThanBound[0]
            ]
            return valid_ranges
        except Exception as e:
            print(f"An error occurred: {e}")

    def replace(self, predicate, operator, old_val, new_val, sql_query):
        try:
            if isinstance(new_val, datetime.date):
                new_val = "'{}'".format(date.isoformat(new_val))
            if isinstance(old_val, datetime.date):
                old_val = "'{}'".format(date.isoformat(old_val))
            new_query = sql_query.replace(
                "{} {} {}".format(predicate, operator, old_val),
                "{} {} {}".format(predicate, operator, new_val),
            )
            return new_query
        except Exception as e:
            print(f"An error occurred: {e}")

