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

@app.route("/login/", methods=("GET","POST",))
def login():
    error = None
    f = LoginForm()
    if not f.is_submitted():
        f.next.data = request.args.get("next")
    elif f.validate_on_submit():
        user = f.get_authenticated_user()
        if user:
            login_user(user)
            next = f.next.data or url_for("home")
            return redirect(next)
        else:
            error = "Incorrect Login or password "
    return render_template("login.html",form = f, error=error)

@app.route("/register/", methods=("GET","POST",))
def register():
    error = None
    f = RegisterForm()
    if not f.is_submitted():
        f.next.data = request.args.get("next")
    elif f.validate_on_submit():
        users = get_user(f.username.data) #récupération des users dans la base de donné pour les tester par rapport au user entré
        users_email = get_user_by_email(f.email.data) #récupération des users dans la base de donné pour les tester par rapport au user entré
        if (users_email == None and users == None):
                m = sha256()
                m.update(f.password.data.encode())
                u = User(username=f.username.data,firstName=f.firstName.data ,lastName=f.lastName.data ,password=m.hexdigest(),email=f.email.data ,img="" ,desc=f.desc.data ,foodLevel=0 )
                db.session.add(u)
                db.session.commit()
                login_user(u)
                next = f.next.data or url_for("home")
                return redirect(next)
        else:
            error=""
            if (users_email != None):
                error+="This email has already been taken"
                if (users != None):
                    error+=", and this username too. Please focus."
            elif (users != None):
                error+="This user already exists"
            else:
                error+="An error has occured"
    return render_template("register.html",form = f, error = error)

@app.route("/logout/")
def logout():
	logout_user()
	return redirect(url_for('home'))

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

@app.route("/user/")
def user():
    return render_template(
        "user.html",
        user=get_user("Gerard")
    )


@login_required
@app.route("/myplates", methods=("GET",))
def my_plate_route():
    return jsonify(myplates=current_user.serialize()["liked"])

@login_required
@app.route("/classes", methods=('GET',))
def classes_route():
    list_class = Class.get_classes()
    class_dict = {}
    for elem in list_class:
        class_dict[elem.name]=elem.serialize()["name"]
    return  jsonify(classes=class_dict)

@login_required
@app.route("/plates_by_class", methods=('GET',))
def plate_by_class_route():
    class_used = request.form["class"] #Mettre le bouton correspondant
    plate_by_class_dict = {}
    if  Food.get_food_by_class(class_used) != []:
        food_list=[]
        for food in Food.get_food_by_class(class_used):
            food_list.append(food)
            plate_by_class_dict[class_used]=food_list
    return  jsonify(plates_by_class=plate_by_class_dict)

@login_required
@app.route("/plates_by_category", methods=('GET',))
def plate_by_category_route():
    category_used = "Entree" #Mettre le bouton correspondant
    plate_by_category_dict = {}
    if  Food.get_food_by_category(category_used) != []:
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
