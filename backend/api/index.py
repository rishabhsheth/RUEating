from flask import Flask, request, jsonify
import datetime
import psycopg2
import os
from dotenv import load_dotenv

app = Flask(__name__)

@app.route('/api/getquery', methods=['POST', "GET"])
def get_query():

    data = request.get_json()
    food = data.get('food')
    print(food)
    return query_db(food)


def query_db(food):
    # Find food item in FOOD
    if food == '':
        return
    today = datetime.datetime.today().strftime('%Y-%m-%d')
    print(today)
    load_dotenv()
    DB_HOST = os.getenv('DB_HOST')
    DB_NAME = os.getenv('DB_NAME')
    DB_USER = os.getenv('DB_USER')
    DB_PASSWD = os.getenv('DB_PASSWD')
    database = psycopg2.connect(host = DB_HOST, dbname = DB_NAME, user = DB_USER, password = DB_PASSWD)
    cursor = database.cursor()
    # cursor.execute(f"SELECT * FROM FOOD WHERE Name REGEXP '.*{food}.*' AND DAY >= '{today}' ORDER BY NAME, LOCATION, DAY, MEAL LIMIT 1000")
    # cursor.execute(f"SELECT * FROM FOOD WHERE Name REGEXP '.*{food}.*' AND DAY >= '{today}' ORDER BY NAME ASC, LOCATION ASC, DAY ASC, CASE WHEN MEAL = 'Breakfast' THEN 1 WHEN Meal = 'Lunch' THEN 2 WHEN Meal = 'Dinner' THEN 3 ELSE 4 END ASC LIMIT 1000")
    cursor.execute(f"SELECT * FROM FOOD WHERE Name ILIKE '%{food}%' ORDER BY NAME ASC, LOCATION ASC, DAY ASC, CASE WHEN MEAL = 'Breakfast' THEN 1 WHEN Meal = 'Lunch' THEN 2 WHEN Meal = 'Dinner' THEN 3 ELSE 4 END ASC LIMIT 1000")

    rows = cursor.fetchall()
    print(rows)

    for i in range(len(rows)):
        row = rows[i]
        rows[i] = (row[0].title(), row[1], row[2], row[3].strftime('%#m/%#d/%Y'))
    
    print(rows)
    cursor.close()
    database.close()
    return rows


if __name__ == '__main__':
    app.run(port=5228)