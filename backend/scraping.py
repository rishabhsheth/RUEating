from bs4 import BeautifulSoup;
import requests
#https://menuportal23.dining.rutgers.edu/FoodPronet/pickmenu.aspx?locationNum=13&locationName=The+Atrium&dtdate=02/01/2025&activeMeal=Lunch&sName=Rutgers+University+Dining

'''
dininghall = input("Enter dining hall: (B) Busch, (L) Livingston, (N) Neilson, (A) Atrium")
numstr = ''
diningstr = ''

if dininghall == 'B':
    numstr = '04'
    diningstr = 'Busch+Dining+Hall'
elif dininghall == 'L':
    numstr = '03'
    diningstr = 'Livingston+Dining+Commons'
elif dininghall == 'N':
    numstr = '05'
    diningstr = 'Neilson+Dining+Hall'
elif dininghall == 'A':
    numstr = '13'
    diningstr = 'The+Atrium'

url = 'https://menuportal23.dining.rutgers.edu/FoodPronet/pickmenu.aspx?locationNum='+numstr+'&locationName='+diningstr+'&dtdate=02/01/2025&activeMeal=Lunch&sName=Rutgers+University+Dining'
page = requests.get(url)

soup = BeautifulSoup(page.content,'html.parser')

food_items = []
fieldsets = soup.find_all('fieldset')
for fieldset in fieldsets:
    label = fieldset.find('label')
    if label and label.has_attr('name'):
        food_items.append(label["name"])

for item in food_items:
    print(item)
'''

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

for x in range(4): #Dining Hall iteration
    for y in range(3): #Meal Iteration
        url = 'https://menuportal23.dining.rutgers.edu/FoodPronet/pickmenu.aspx?locationNum='+numstrs[x]+'&locationName='+diningstrs[x]+'&dtdate=02/01/2025&activeMeal='+mealstrs[y]+'&sName=Rutgers+University+Dining'
        page = requests.get(url)
        soup = BeautifulSoup(page.content,'html.parser')
        fieldsets = soup.find_all('fieldset')
        for fieldset in fieldsets:
            label = fieldset.find('label')
            if(label and label.has_attr('name')):
                fooddb[campuses[x]][mealstrs[y]].append(label['name'])

print(fooddb)