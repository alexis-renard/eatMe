from .app import manager, db
from hashlib import sha256
from project.models import *


@manager.command
def loaddb(user_file,town_file,country_file,food_file,category_file,class_file,belong_category_file,belong_class_file):
    print("debut load")
    db.create_all()

    import yaml
    users_table = yaml.load(open(user_file))
    towns_table = yaml.load(open(town_file))
    countries_table = yaml.load(open(country_file))
    foods_table = yaml.load(open(food_file))
    categories_table = yaml.load(open(category_file))
    classes_table = yaml.load(open(class_file))
    link_category_table = yaml.load(open(belong_category_file))
    link_class_table = yaml.load(open(belong_class_file))
    print("debut town")

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
    print("debut food")

    # create food
    foods = {}
    for food in foods_table:
        if food["name"] not in foods:
            name = food["name"]
            img = food["img"]
            o = Food(name=name, img=img)
            db.session.add(o)
            foods[food["name"]] = o
    db.session.commit()
    print("debut class")

    # create class
    classes = {}
    for _class in classes_table:
        if _class["name"] not in classes:
            name = _class["name"]
            print(name)
            o = Class(name=name)
            db.session.add(o)
            classes[_class["name"]] = o
            print("ajoute : "+_class["name"])
    db.session.commit()
    print("debut cat")

    # create category
    categories = {}
    for category in categories_table:
        if category["name"] not in categories:
            name = category["name"]
            o = Category(name=name)
            db.session.add(o)
            categories[category["name"]] = o
    db.session.commit()
    print("debut link class food")

    # link food-class
    food_class = {}
    for f_c in link_class_table:
            id_food = f_c["id_food"]
            class_food = f_c["class"]
            o = belong_Class(food_id=id_food, class_name=class_food)
            db.session.add(o)
    db.session.commit()
    print("debut link food cat")

    # link food-category
    food_category = {}
    for f_cat in link_category_table:
            id_food = f_cat["id_food"]
            category_food = f_cat["category"]
            o = belong_Category(food_id=id_food, category_name=category_food)
            db.session.add(o)
    db.session.commit()
    print("debut user")

    # create users
    users = {}
    for user in users_table:
        if user not in users:
            id_user = user["entryId"]
            fName = user["firstName"]
            lName = user["lastName"]
            img = user["photo"]
            desc = user["desc"]
            foodLevel = user["foodLevel"]
            town_id = user["town"]
            love_list = user["love"]
            cook_list = user["cook"]
            like_list = user["like"]

            o = User(id=id_user, firstName=fName, lastName=lName, img=img,
                desc=desc, foodLevel=foodLevel, town_id=town_id)
            db.session.add(o)
            users[user] = o
            db.session.commit()

            # Gestion love_list

            love_dic = {}
            for love_id in love_list:
                if love_id not in love_dic:
                    o = love(id_user, love_id)
                    db.session.add(o)
                    love_dic[love_id] = o
            db.session.commit()

            # Gestion cook_list
            cook_dic = {}
            for cook_id in cook_list:
                if cook_id not in cook_dic:
                    o = cook(id_user, cook_id)
                    db.session.add(o)
                    cook_dic[cook_id] = o
            db.session.commit()

        # Gestion like_list
            like_dic = {}
            for like_id in like_list:
                if like_id not in like_dic:
                    o = like(id_user, like_id)
                    db.session.add(o)
                    like_dic[like_id] = o
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
