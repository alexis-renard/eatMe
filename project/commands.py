from .app import manager, db
from hashlib import sha256
from project.models import *


@manager.command
def loaddb(user_file,town_file,country_file,food_file,category_file,class_file):
    db.create_all()

    import yaml
    users_table = yaml.load(open(user_file))
    towns_table = yaml.load(open(town_file))
    countries_table = yaml.load(open(country_file))
    foods_table = yaml.load(open(food_file))
    categories_table = yaml.load(open(category_file))
    classes_table = yaml.load(open(class_file))

    # create towns
    towns = {}
    for town in towns_table:
        if town["name"] not in towns:
            name = town["name"]
            pc = town["postalCode"]
            country = town["country"]
            o = Town(name=name, pc=pc, country=country)
            db.session.add(o)
            towns[town["name"]] = o
    db.session.commit()

    # create class
    classes = {}
    for _class in classes_table:
        if _class["name"] not in classes:
            name = _class["name"]
            o = Class(name=name)
            db.session.add(o)
            classes[_class["name"]] = o
            db.session.commit()

    # create category
    categories = {}
    for category in categories_table:
        if category["name"] not in categories:
            name = category["name"]
            o = Category(name=name)
            db.session.add(o)
            categories[category["name"]] = o
            db.session.commit()

    # create food
    foods = {}
    for food in foods_table:
        if food["entryId"] not in foods:
            name = food["name"]
            img = food["img"]
            food_class = food["class"]
            food_category= food["category"]
            o = Food(name=name, img=img)
            foods[food["entryId"]] = o
            for cla in food_class:
                o.foodClass.append(classes[cla])
            for cat in food_category:
                o.foodCategory.append(categories[cat])
            db.session.add(o)
    db.session.commit()

    # create users
    users = {}
    for user in users_table:
        if user["entryId"] not in users:
            id_user = user["entryId"]
            fName = user["firstName"]
            lName = user["lastName"]
            id_user = user["entryId"]
            email = user["email"]
            pwd = user["password"]
            desc = user["desc"]
            foodLevel = user["foodLevel"]
            town_id = user["town"]
            cook_list = user["cook"]
            like_list = user["like"]

            o = User(id=id_user, firstName=fName, lastName=lName, email=email, password=pwd,
             img=img, desc=desc, foodLevel=foodLevel, town_id=town_id)
            db.session.add(o)
            users[id_user] = o
            db.session.commit()

            # Gestion cook_list
            for cook_id in cook_list:
                    o.cooked.append(foods[cook_id])
                    db.session.add(o)
            db.session.commit()

        # Gestion like_list
            for like_id in like_list:
                    o.liked.append(foods[like_id])
                    db.session.add(o)
            db.session.commit()

    # Gestion love_list
    for user in users_table:
        love_list = user["love"]
        for love_id in love_list:
            users[user["entryId"]].loved.append(users[love_id])
        db.session.commit()

    db.session.commit()


@manager.command
def syncdb():
    ''' Creates all missing tables. '''
    db.create_all()

@manager.command
def newuser(username, password):
    '''Adds a new user.'''
    from .models import User
    from hashlib import sha256
    m = sha256()
    m.update(password.encode())
    u = User(username=username, password=m.hexdigest())
    db.session.add(u)
    db.session.commit()

@manager.command
def passwd(username,password):
    from .models import load_user
    from hashlib import sha256
    m = sha256()
    m.update(password.encode())
    u = load_user(username)
    u.password = m.hexdigest()
    db.session.commit()
