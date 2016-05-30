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


@app.route("/user/matches/", methods=("PUT",))
def route_for_add_match():
    datas= request.get_json()
    usermatch = datas.get('username')
    user = get_user(usermatch)
    if (user in current_user.loved) and (current_user in user.loved):
        if not user in current_user.matched:
            current_user.matched.append(user)
            db.session.commit()
            return jsonify(register="success"),200
        else:
            return jsonify(register="username already in matches list"),401
    return jsonify(register="usernames are not lovers"),401


@login_required
@app.route("/user/liked", methods=("PUT",))
def add_user_liked():
    user = current_user
    liked_food = get_food(request.get_json().get('id'))
    if liked_food not in user.liked:
        user.liked.append(liked_food)
        db.session.commit()
        return jsonify(state=True)
    else:
        return jsonify(state=False, error="food already liked")

@login_required
@app.route("/user/cooked", methods=("PUT",))
def add_user_cooked():
    user = current_user
    cooked_food = get_food(request.get_json().get('id'))
    if cooked_food not in user.cooked:
        user.cooked.append(cooked_food)
        db.session.commit()
        return jsonify(state=True)
    else:
        return jsonify(state=False, error="food already cooked")

@login_required
@app.route("/user/loved", methods=("PUT",))
def add_user_loved():
    user = current_user
    datas = request.get_json()
    print(datas.get('username',''))
    loved_user = get_user(datas.get('username',''))
    if loved_user not in user.loved:
        user.loved.append(loved_user)
        db.session.commit()
        return jsonify(state=True)
    else:
        return jsonify(state=False, error="user already loved")

            ############
            ### food ###
            ############

@app.route("/logout/")
def logout():
	logout_user()
	return redirect(url_for('home'))

            ###############
            ### Matches ###
            ###############

@login_required
@app.route("/matches", methods=("GET",))
def matches_route():
    matches = current_user.sm = sha256()
        m.update(password)
        password = m.hexdigest()erialize()["matched"]
    user_dict = {}
    for user in matches.values():
        user_dict[user]=get_user(user).serialize()
    return jsonify(matches=user_dict)

            ###############
            ####  USER ####
            ###############

@login_required
@app.route("/user", methods=("PUT",))
    user=current_user
    datas = request.get_json()
    username = datas.get("username")
    password = datas.get("password").encode('utf-8')
    firstName = datas.get("firstName")
    lastName = datas.get("lastName")
    email = datas.get("email")
    desc = datas.get("desc")
    m = sha256()
    m.update(password)
    password = m.hexdigest()
    if username!=user.username:
        if username!="":
            if get_user(username):
                user.username=username
            else:
                return jsonify(state=False, error="username already taken"),401
        else:
            return jsonify(state=False, error="username can't be empty"),400
    if password!=user.password:
        if password!="":
            user.password=password
        else:
            return jsonify(state=False, error="password can't be empty"),400
    if firstName!=user.firstName:
        if firstName!="":
            user.firstName=firstName
        else:
            return jsonify(state=False, error="firstName can't be empty"),400
    if lastName!=user.lastName:
        if lastName!="":
            user.lastName=lastName
        else:
            return jsonify(state=False, error="lastName can't be empty"),400
    if email!=user.email:
        if email!="":
            user.email=email
        else:
            return jsonify(state=False, error="email can't be empty"),400
    if desc!=user.desc:
        if desc!="":
            user.desc=desc
        else:
            return jsonify(state=False, error="desc can't be empty"),400

    return jsonify(state=True),200

            ##############
            ## myplates ##
            ##############

# @app.route("/")
# def home():
#     if current_user.is_authenticated:
#         #return jsonify(propositions=get_propositions_user(current_user.username).serialize())
#         print('----propositions---wpouhahahahahahahao-')
#         print(get_propositions_user(current_user.username))
#         return render_template(
#             "index.html",
#             propositions=get_propositions_user(current_user.username)
#         )
#     else:
#         return render_template(
#             "index.html",
#         )



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
@app.route("/plates_by_class/<string:name>", methods=('GET',))
def plate_by_class_route(name):
    class_used = name #Mettre le bouton correspondant
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
    name_used = request.form["name"] #Mettre le bouton correspondant
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
@app.route("/myplates", methods=("GET",))
def my_plate_route():
    return jsonify(user=current_user.serialize())

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

        ##############
        ### SEARCH ###
        ##############


@app.route("/addcook/search/<string:query>",methods=("GET",))
def searchcook(query):
    datas = request.get_json()
    a=datas.get("search")
    b=get_food_by_name(a)
    return  jsonify(state=True, results=b),200



@app.route("/addplates/search/<string:query>",methods=("GET",))
def searchplates(query):
    datas = request.get_json()
    a=datas.get("search")
    b=get_food_by_name(a)
    return  jsonify(state=True, results=b),200
