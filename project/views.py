from .app import app, db
from flask import Flask, render_template, url_for, redirect, request, g, flash, jsonify
from datetime import datetime
from .models import *
from flask.ext.wtf import Form
from wtforms import StringField, HiddenField, PasswordField, validators
from wtforms.validators import DataRequired, Required, EqualTo, Length
from hashlib import sha256
from flask.ext.login import login_user, current_user, logout_user, login_required
import copy #Importation de copy pour gérer les pointeurs lors de la suppression d'albums


@app.before_request
def before_request():
    g.user = current_user
    if g.user.is_authenticated:
        g.user.last_seen = datetime.utcnow()
        db.session.add(g.user)
        db.session.commit()


        ############
        ### user ###
        ############

@app.route("/user", methods=("POST",))
def login():
    username = request.form["username"]
    password = request.form["password"].encode('utf-8')
    user = get_user(username)
    if (user is not None):
        m = sha256()
        m.update(password)
        password = m.hexdigest()
        if (user.password == password):
            login_user(user)
            return jsonify(login="success"),200
        return jsonify(login="password or username incorrect"),401
    return jsonify(login="password or username incorrect"),401

@app.route("/user", methods=("PUT",))
def register():
    username = request.form["username"]
    password = request.form["password"].encode('utf-8')
    firstName = request.form["firstName"]
    lastName = request.form["lastName"]
    email = request.form["email"]
    desc = request.form["desc"]
    user = get_user(username)
    if user is None:
        m = sha256()
        m.update(password)
        password = m.hexdigest()
        u = User(username=username,
            firstName=firstName,
            lastName=lastName,
            password=m.hexdigest(),
            email=email,
            img="" ,
            desc=desc,
            foodLevel=0)
        db.session.add(u)
        db.session.commit()
        login_user(u)
        return jsonify(register="success"),200
    return jsonify(register="username already taken"),401

@login_required
@app.route("/logout/")
def logout():
	logout_user()
	return redirect(url_for('home'))

@login_required
@app.route("/user/<string:username>", methods=("GET",))
def get_user_route(username):
    return jsonify(user=get_user(username).serialize())

            ############
            ### food ###
            ############

@login_required
@app.route("/food", methods=("GET",))
def get_foods_route():
    foods = get_all_food()
    food_dict={}
    for food in foods:
        food_dict[food.name]=food.serialize()
    return jsonify(food=food_dict)


            ###############
            ### Matches ###
            ###############

@login_required
@app.route("/matches", methods=("GET",))
def matches_route():
    matches = current_user.serialize()["matched"]
    user_dict = {}
    for user in matches.values():
        user_dict[user]=get_user(user).serialize()
    return jsonify(matches=user_dict)


            ##############
            ## myplates ##
            ##############

@app.route("/")
def home():
    return render_template(
        "index.html",
    )

@app.route("/home_user")
def home_user():
    # dico = get_propositions_user(current_user.username)
    # ICook   = dico["ICook"]
    # HeCooks = dico["HeCooks"]
    # WeLike  = dico["WeLike"]
    # WeCook  = dico["WeCook"]
    return jsonify(propositions=get_propositions_user(current_user.username))

@login_required
@app.route("/myplates", methods=("GET",))
def my_plate_route():
    liked_plate = current_user.serialize()["liked"]
    return jsonify(liked_plate=liked_plate)

@login_required
@app.route("/plates_by_class/<string:className>", methods=('GET',))
def plate_by_class_route(className):
    class_used = className #Mettre le bouton correspondant
    plate_by_class_dict = {}
    if  get_food_by_class(class_used) != []:
        food_list=[]
        for food in get_food_by_class(class_used):
            food_list.append(food)
            plate_by_class_dict[class_used]=food_list
    return  jsonify(plates_by_class=plate_by_class_dict)

@login_required
@app.route("/plates_by_category/<string:category>", methods=('GET',))
def plate_by_category_route(category):
    category_used = category #Mettre le bouton correspondant
    plate_by_category_dict = {}
    if  get_food_by_category(category_used) != []:
        food_list=[]
        for food in get_food_by_category(category_used):
            food_list.append(food)
            plate_by_category_dict[category_used]=food_list
    return  jsonify(plates_by_category=plate_by_category_dict)

@login_required
@app.route("/plates_by_name/<string:name>", methods=('GET',))
def plate_by_name_route(name):
    name_used = name #Mettre le bouton correspondant
    plate_by_name_dict = {}
    if  get_food_by_name(name_used) != []:
        food_list=[]
        for food in get_food_by_name(name_used):
            food_list.append(food)
            plate_by_name_dict[name_used] = food_list
    return  jsonify(plates_by_name=plate_by_name_dict)


@login_required
@app.route("/myplates/delete/<int:id>", methods=('DELETE',))
def delete_plate(id):
    plate_id = id
    p = get_food_by_id(plate_id)
    if p is not None :
            if delete_plate_from_user_plates(plate_id) != None:
                return jsonify(state=True)
            else:
                return jsonify(state=False)
    else:
        return jsonify(state=False)


            ##############
            ### mycook ###
            ##############

@login_required
@app.route("/mycook", methods=("GET",))
def my_cook_route():
    return jsonify(mycook=current_user.serialize()["cooked"])

@login_required
@app.route("/cook_by_class/<string:className>", methods=('GET',))
def cook_by_class_route(className):
    class_used = className #Mettre le bouton correspondant
    cook_by_class_dict = {}
    if  get_food_by_class(class_used) != []:
        food_list=[]
        for food in get_food_by_class(class_used):
            if food["name"] in  current_user.serialize()["cooked"].values():
                food_list.append(food)
                cook_by_class_dict[class_used]=food_list
    return  jsonify(cooks_by_class=cook_by_class_dict)

@login_required
@app.route("/cook_by_category/<string:category>", methods=('GET',))
def cook_by_category_route(category):
    category_used = category #Mettre le bouton correspondant
    cook_by_category_dict = {}
    if  get_food_by_category(category_used) != []:
        food_list=[]
        for food in get_food_by_category(category_used):
            if food["name"] in  current_user.serialize()["cooked"].values():
                food_list.append(food)
                cook_by_category_dict[category_used]=food_list
    return  jsonify(cook_by_category=cook_by_category_dict)

@login_required
@app.route("/cook_by_name/<string:name>", methods=('GET',))
def cook_by_name_route(name):
    name_used = name #Mettre le bouton correspondant
    cook_by_name_dict = {}
    if  get_food_by_name(name_used) != []:
        food_list=[]
        for food in get_food_by_name(name_used).values():
            if food["name"] in  current_user.serialize()["cooked"].values():
                food_list.append(food)
                cook_by_name_dict[name_used]=food_list
    return  jsonify(cook_by_name=cook_by_name_dict)

        #############
        ## classes ##
        #############

@login_required
@app.route("/classes/", methods=('GET',))
@app.route("/classes/<string:name>", methods=('GET',))
def classes_route(name=None):
    if name==None:
        list_class = Class.get_classes()
        class_dict = {}
        for elem in list_class:
            class_dict[elem.name]=elem.serialize()["name"]
        return  jsonify(classes=class_dict)
    else:
        plates = get_food_by_class(name)
        return jsonify(plates=plates)



@login_required
@app.route("/category/", methods=('GET',))
@app.route("/category/<string:name>", methods=('GET',))
def category_route(name=None):
    if name==None:
        list_category = Category.get_categories()
        category_dict = {}
        for elem in list_category:
            category_dict[elem.name]=elem.serialize()["name"]
        return  jsonify(category=category_dict)
    else:
        plates = get_food_by_category(name)
        return jsonify(plates=plates)


        ##############
        ## category ##
        ##############

@login_required
@app.route("/categories", methods=('GET',))
def categories_route():
    list_category = Category.get_categories()
    category_dict = {}
    for elem in list_category:
        category_dict[elem.name]=elem.serialize()["name"]
    return  jsonify(categories=category_dict)


# @login_required
# @app.route("/myplates/add/<int:id>", methods=('PUT',))
# def add_plate(id):
#     plate_id = id
#     p = get_food_by_id(plate_id)
#     if p is not None :
#             if add_plate_to_user_plates(plate_id) != None:
#                 return jsonify(state=True)
#             else:
#                 return jsonify(state=False)
#     else:
#         return jsonify(state=False)

@app.route("/addcook/search/<string:query>",methods=("GET",))
def searchcook(query):
    r=SearchForm()
    if r.validate_on_submit():
        a=r.element.data
        b=get_food_by_name(a)
        return render_template(
            "addcook.html",
            results=b,
            form=r,
            )


@app.route("/addplates/search/<string:query>",methods=("GET",))
def searchplates(query):
    r=SearchForm()
    if r.validate_on_submit():
        a=r.element.data
        b=get_food_by_name(a)
        return render_template(
            "addplates.html",
            results=b,
            form=r,
            )
