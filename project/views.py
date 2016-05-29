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


    #flash('A confirmation email has been sent via email.', 'success')
@app.route("/logout/")
def logout():
	logout_user()
	return redirect(url_for('home'))

            ###############
            ## myMatches ##
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

@app.route("/", methods=("GET",))
def home():
    if current_user.is_authenticated:
        #return jsonify(propositions=get_propositions_user(current_user.username).serialize())
        return render_template(
            "index.html",
            propositions=get_propositions_user(current_user.username)
        )
    else:
        return render_template(
            "index.html",
        )

@login_required
@app.route("/myplates", methods=("GET",))
def my_plate_route():
    return jsonify(myplates=current_user.serialize()["liked"])

@login_required
@app.route("/plates_by_class", methods=('GET',))
def plate_by_class_route():
    class_used = request.form["class"] #Mettre le bouton correspondant
    plate_by_class_dict = {}
    if  get_food_by_class(class_used) != []:
        food_list=[]
        for food in get_food_by_class(class_used):
            food_list.append(food)
            plate_by_class_dict[class_used]=food_list
    return  jsonify(plates_by_class=plate_by_class_dict)

@login_required
@app.route("/plates_by_category", methods=('GET',))
def plate_by_category_route():
    category_used = "Entree" #Mettre le bouton correspondant
    plate_by_category_dict = {}
    if  get_food_by_category(category_used) != []:
        food_list=[]
        for food in get_food_by_category(category_used):
            food_list.append(food)
            plate_by_category_dict[category_used]=food_list
    return  jsonify(plates_by_category=plate_by_category_dict)

@login_required
@app.route("/plates_by_name", methods=('GET',))
def plate_by_name_route():
    name_used = "sa" #Mettre le bouton correspondant
    plate_by_name_dict = {}
    if  get_food_by_name(name_used) != []:
        food_list=[]
        for food in get_food_by_name(name_used):
            food_list.append(food)
            plate_by_name_dict[name_used] = food_list
    return  jsonify(plates_by_name=plate_by_name_dict)

            ##############
            ## mycook ##
            ##############

@login_required
@app.route("/mycook", methods=("GET",))
def my_cook_route():
    return jsonify(mycook=current_user.serialize()["cooked"])

@login_required
@app.route("/cook_by_class", methods=('GET',))
def cook_by_class_route():
    class_used = "Gras" #Mettre le bouton correspondant
    cook_by_class_dict = {}
    if  get_food_by_class(class_used) != []:
        food_list=[]
        for food in get_food_by_class(class_used):
            if food["name"] in  current_user.serialize()["cooked"].values():
                food_list.append(food)
                cook_by_class_dict[class_used]=food_list
    return  jsonify(cooks_by_class=cook_by_class_dict)

@login_required
@app.route("/cook_by_category", methods=('GET',))
def cook_by_category_route():
    category_used = "Plat" #Mettre le bouton correspondant
    cook_by_category_dict = {}
    if  get_food_by_category(category_used) != []:
        food_list=[]
        for food in get_food_by_category(category_used):
            if food["name"] in  current_user.serialize()["cooked"].values():
                food_list.append(food)
                cook_by_category_dict[category_used]=food_list
    return  jsonify(cook_by_category=cook_by_category_dict)

@login_required
@app.route("/cook_by_name", methods=('GET',))
def cook_by_name_route():
    name_used = "ar" #Mettre le bouton correspondant
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
@app.route("/classes", methods=('GET',))
def classes_route():
    list_class = Class.get_classes()
    class_dict = {}
    for elem in list_class:
        class_dict[elem.name]=elem.serialize()["name"]
    return  jsonify(classes=class_dict)


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
# @app.route("/myplates/delete/<int:id>", methods=('DELETE',))
# def delete_plate(id):
#     plate_id = id
#     p = get_food_by_id(plate_id)
#     if p is not None :
#             if delete_plate_from_user_plates(plate_id) != None:
#                 return jsonify(state=True)
#             else:
#                 return jsonify(state=False)
#     else:
#         return jsonify(state=False)
#
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

@app.route("/addcook/search/<string:query>", methods=("GET",))
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
