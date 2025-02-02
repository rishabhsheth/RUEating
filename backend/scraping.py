from bs4 import BeautifulSoup
import requests
import datetime
#https://menuportal23.dining.rutgers.edu/FoodPronet/pickmenu.aspx?locationNum=13&locationName=The+Atrium&dtdate=02/01/2025&activeMeal=Lunch&sName=Rutgers+University+Dining


base = datetime.datetime.today()
dates = []


for x in range(0, 7):
    f_date = (base + datetime.timedelta(days=x)).strftime('%-m/%-d/%Y')
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

for w in range(7): #Days Iteration
    for x in range(4): #Dining Hall Iteration
        for y in range(3): #Meal Iteration
            url = 'https://menuportal23.dining.rutgers.edu/FoodPronet/pickmenu.aspx?locationNum='+numstrs[x]+'&locationName='+diningstrs[x]+'&dtdate='+dates[w]+'&activeMeal='+mealstrs[y]+'&sName=Rutgers+University+Dining'
            page = requests.get(url)
            soup = BeautifulSoup(page.content,'html.parser')
            fieldsets = soup.find_all('fieldset')
            for fieldset in fieldsets:
                label = fieldset.find('label')
                if(label and label.has_attr('name')):
                    fooddb[campuses[x]][mealstrs[y]].append(label['name'])
print(fooddb)