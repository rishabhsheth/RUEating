from bs4 import BeautifulSoup
import requests
import datetime
import mysql.connector
#https://menuportal23.dining.rutgers.edu/FoodPronet/pickmenu.aspx?locationNum=13&locationName=The+Atrium&dtdate=02/01/2025&activeMeal=Lunch&sName=Rutgers+University+Dining

def create_or_update_db():
    # Create RUEATING database if does not exist already
    database = mysql.connector.connect(host = 'localhost', user = 'hackru_sp25', passwd = 'hackru_sp25')
    cursor = database.cursor()
    cursor.execute('CREATE DATABASE IF NOT EXISTS RUEating')

    # Create FOOD table if does not exist already
    database = mysql.connector.connect(host = 'localhost', user = 'hackru_sp25', passwd = 'hackru_sp25', database = 'RUEating')
    cursor = database.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS FOOD (Name VARCHAR(250) NOT NULL, Location VARCHAR (20) NOT NULL, Meal VARCHAR (10) NOT NULL, Day DATE NOT NULL, PRIMARY KEY (Name, Location, Meal, Day))')

    base = datetime.datetime.today()
    dates = []

    for x in range(0, 7):
        f_date = (base + datetime.timedelta(days=x))
        dates.append(f_date)

    fooddb = {
        'Busch': {'Breakfast':[],'Lunch':[],'Dinner':[]},
        'Livvy': {'Breakfast':[],'Lunch':[],'Dinner':[]},
        'Neilson':{'Breakfast':[],'Lunch':[],'Dinner':[]},
        'Atrium':{'Breakfast':[],'Lunch':[],'Dinner':[]}
    }
    diningstrs = ['Busch+Dining+Hall','Livingston+Dining+Commons','Neilson+Dining+Hall','The+Atrium']
    numstrs = ['04','03','05','13']
    mealstrs = ['Breakfast','Lunch','Dinner']
    campuses = ['Busch','Livvy','Neilson','Atrium']
    insert_command = 'INSERT IGNORE INTO FOOD (Name, Location, Meal, Day) VALUES (%s, %s, %s, %s)'

    for w in range(7): #Days Iteration
        for x in range(4): #Dining Hall Iteration
            for y in range(3): #Meal Iteration
                url = 'https://menuportal23.dining.rutgers.edu/FoodPronet/pickmenu.aspx?locationNum='+numstrs[x]+'&locationName='+diningstrs[x]+'&dtdate='+dates[w].strftime('%#m/%#d/%Y')+'&activeMeal='+mealstrs[y]+'&sName=Rutgers+University+Dining'
                page = requests.get(url)
                soup = BeautifulSoup(page.content,'html.parser')
                fieldsets = soup.find_all('fieldset')
                for fieldset in fieldsets:
                    label = fieldset.find('label')
                    if(label and label.has_attr('name')):
                        # fooddb[campuses[x]][mealstrs[y]].append(label['name'])
                        data = (label['name'], campuses[x], mealstrs[y], dates[w])
                        cursor.execute(insert_command, data)
    database.commit()
    return database

def query_db(food):
    # Find food item in FOOD
    if food == '':
        return
    database = mysql.connector.connect(host = 'localhost', user = 'hackru_sp25', passwd = 'hackru_sp25', database = 'RUEating')
    cursor = database.cursor()
    cursor.execute(f"SELECT * FROM FOOD WHERE Name REGEXP '.*{food}.*'")
    rows = cursor.fetchall()
    for row in rows:
        print(row)

# print(fooddb)

def main():
    # database = create_or_update_db()
    food = '3 chilies chipotle sauce'
    query_db(food)

if __name__ == "__main__":
    main()