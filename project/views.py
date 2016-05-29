from .app import app, db
from flask import Flask, render_template, url_for, redirect, request, g, flash
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

@app.route("/")
def home():
    return render_template(
    "index.html",
    )


@app.route("/login/", methods=("GET","POST",))
def login():
    error = None
    f = LoginForm()
    if not f.is_submitted():
        f.next.data = request.args.get("next")
    elif f.validate_on_submit():
        user = f.get_authenticated_user()
        print ("validate_on_submit")
        print (f.password.data)
        print (user)
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
    if (users_email == None or users_username == None):
            m = sha256()
            m.update(f.password.data.encode())
            u = User(username=f.username.data, password=m.hexdigest(), admin=0)
            db.session.add(u)
            db.session.commit()
            login_user(u)
            next = f.next.data or url_for("home")
            return redirect(next)
        else:
            error=""
            if (users_email == None):
                error+="This email has already been taken"
                if (users_username == None):
                    error+=", and this username too. Please focus."
            if (users_username == None):
                error+="This user already exists"
    return render_template("register.html",form = f, error = error)

@app.route("/logout/")
def logout():
	logout_user()
	return redirect(url_for('home'))

            ##############
            ## myplates ##
            ##############

@login_required
@app.route("/myplates", methods=("GET",))
def my_plate_route():
    plate_list = get_food_liked_by_user(current_user.id)
    return jsonify(plate_list=plate_list)


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
