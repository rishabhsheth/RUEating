from flask import Flask, request, jsonify
import datetime
import mysql.connector


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
    database = mysql.connector.connect(host = 'localhost', user = 'hackru_sp25', passwd = 'hackru_sp25', database = 'RUEating')
    cursor = database.cursor()
    cursor.execute(f"SELECT * FROM FOOD WHERE Name REGEXP '.*{food}.*' AND DAY >= '{today}' ORDER BY NAME, LOCATION, DAY, MEAL LIMIT 1000")
    
    rows = cursor.fetchall()
    print(rows)

    for i in range(len(rows)):
        row = rows[i]
        rows[i] = (row[0].title(), row[1], row[2], row[3].strftime('%#m/%#d/%Y'))
    
    print(rows)

    return rows


if __name__ == '__main__':
    app.run(port=5228)