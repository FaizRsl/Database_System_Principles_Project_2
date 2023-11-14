import sqlparse
import collections 
from constant.constants import (
    operators,
    range_comparators
)
from operator import mul, add, sub, truediv
from constant.constants import FROM, SELECT, GROUP_BY, ORDER_BY

class SQLParser:
    def __init__(self):
        self.comparison = collections.defaultdict(list)
        self.parenthesis = []
        self.select_attributes = []
        self.tables = []
        self.orderby_attributes = []
        self.groupby_attributes = []

    def clean_query(self, query):
        sql = query.replace(" date ", " ")

        start = query.find("+ interval")
        if start != -1:
            end = query.find('\n', start)
            query = query[:start] + query[end:]

        while "between" in query:
            start = query.find("between")
            end = query.find('\n', start)
            between_part = query[start:end].split()
            first_exp, second_exp = between_part[1], between_part[-1]
            query = query[:start] + f">= {first_exp} <= {second_exp}" + query[end:]

        query = query.replace("\t", "").replace("\n", " ")
        return query

    def parse_query(self, query):
        cleaned_sql = self.clean_query(self.sql_formatter(self.remove_double_spacing(query)))
        parsed = sqlparse.parse(cleaned_sql)
        stmt = parsed[0]
        from_seen, select_seen, orderby_seen, groupby_seen = False, False, False, False

        for token in stmt.tokens:
            if select_seen:
                self.collect_identifiers(token, self.select_attributes)
            if from_seen:
                self.collect_identifiers(token, self.tables)
            if orderby_seen:
                self.collect_identifiers(token, self.orderby_attributes)
            if groupby_seen:
                self.collect_identifiers(token, self.groupby_attributes)

            if isinstance(token, sqlparse.sql.Where):
                self.process_where_clause(token)

            if token.is_keyword:
                keyword_upper = token.value.upper()
                select_seen, from_seen, orderby_seen, groupby_seen = False, False, False, False

                if keyword_upper == SELECT:
                    select_seen = True
                elif keyword_upper == FROM:
                    from_seen = True
                elif keyword_upper == ORDER_BY:
                    orderby_seen = True
                elif keyword_upper == GROUP_BY:
                    groupby_seen = True

    def collect_identifiers(self, token, attribute_list):
        if isinstance(token, sqlparse.sql.IdentifierList):
            attribute_list.extend(identifier.get_real_name() for identifier in token.get_identifiers())
        elif isinstance(token, sqlparse.sql.Identifier):
            attribute_list.append(token.get_real_name())

    def process_where_clause(self, where_tokens):
        for where_token in where_tokens:
            if isinstance(where_token, sqlparse.sql.Comparison):
                comparison_string = "{}\n".format(where_token)
                comparison_key, comparison_operator, comparison_value = comparison_string.strip().split(" ")
                self.comparison[comparison_key].append((comparison_operator, comparison_value))
            elif isinstance(where_token, sqlparse.sql.Parenthesis):
                self.parenthesis.append("{}\n".format(where_token))

    def query_index(self, inside, whole):
        window = len(inside)
        n = len(whole)

        if window > n:
            return -1

        base, MOD = 26, 10 ** 9 + 7
        charToInt = lambda ch: ord(ch) - ord("a")

        hash1, hash2 = 0, 0
        for i in range(window):
            hash1 = (hash1 * base + charToInt(whole[i])) % MOD
            hash2 = (hash2 * base + charToInt(inside[i])) % MOD

        if hash1 == hash2:
            return 0

        start = 1
        while start < n - window + 1:
            hash1 = (hash1 * base - charToInt(whole[start - 1]) * (base ** window) + charToInt(whole[start + window - 1])) % MOD
            if hash1 == hash2:
                return start
            start += 1

        return -1

    def calculate(self, s):
        OP = {"*": mul, "+": add, "-": sub, "/": truediv}
        operators = {"+", "*", "-", "/"}
        current_operator = "+"
        current_number, previous_number = "", ""

        for char in s:
            if char in operators:
                current_operator = char
                previous_number = current_number
                current_number = ""
            elif char != " ":
                current_number += char

        return OP[current_operator](float(previous_number), float(current_number))

    def sql_formatter(self, query):
        end, temp = 0, ""
        for index in range(1, len(query) - 1):
            if query[index] in operators:
                if query[index - 1] not in operators and ord(query[index - 1]) != 32:
                    temp += query[end: index] + ' '
                    end = index
                if query[index + 1] not in operators and ord(query[index + 1]) != 32:
                    temp += query[end: index + 1] + ' '
                    end = index + 1

        temp += query[end: len(query)]
        return temp

    def nested_query(self, sql):
        select_index = [i for i, word in enumerate(sql.split(" ")) if word.upper() == 'SELECT']
        if len(select_index) == 2:
            start_index = end_index = select_index[1]

            while not sql.split(" ")[start_index].startswith('('):
                start_index -= 1

            flag = any(sql.split(" ")[i] in range_comparators for i in range(start_index, start_index - 3, -1))

            if flag:
                start_part = sql.split(" ")[start_index][2:] if len(sql.split(" ")[start_index]) > 1 else sql.split(" ")[start_index]
                while not sql.split(" ")[end_index].startswith(')'):
                    end_index += 1

                end_part = sql.split(" ")[end_index][1:] if len(sql.split(" ")[end_index]) > 1 else sql.split(" ")[end_index]
                return " ".join(sql.split(" ")[:start_index] + [start_part] + ['100'] + [end_part] + sql.split(" ")[end_index + 1:])

        return sql

    def remove_double_spacing(self, sql):
        return sql.replace('  ', '')