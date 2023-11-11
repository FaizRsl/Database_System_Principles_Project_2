import psycopg2
import os
from sys import stderr
from dotenv import load_dotenv

load_dotenv()


def connect():
    try:
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST", "localhost"),
            database=os.getenv("DB_NAME", "TPC-H"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASSWORD", "root"),
            port=os.getenv("DB_PORT", 5432),
        )
        cur = conn.cursor()

        return conn, cur
    except Exception as e:
        print(f"An error occurred: {e}")

def query(sql_string, explain=False):
    conn, cur = connect()
    try:
        data = ""
        if conn is not None:
            cur.execute(sql_string)
            data = cur.fetchall()

            conn.close()

        if explain:
            return data[0][0][0]
        else:
            return data[0]
    except Exception as e:
        print(f"An error occurred: {e}")

