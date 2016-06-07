# WELCOME TO EATME PROJECT
---
## Run the app
In order to run our application in your localhost, please follow

Create your virtual environnement :
```
virtualenv -p python3 venv
```

Install all requirements :
```
pip install -r requirements.txt
```

Load the data base (yeah it's quit long) :
```
python manage.py loaddb project/static/yml/user.yml project/static/yml/town.yml project/static/yml/country.yml project/static/yml/food.yml project/static/yml/category.yml project/static/yml/class_db.yml
```

Then run the app :
```
python manage.py runserver
```

*Then go to your [localhost](http://localhost:5000)*
