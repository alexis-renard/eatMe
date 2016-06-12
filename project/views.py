from .app import app, db
from flask import Flask, render_template, url_for, redirect, request, g, flash, jsonify
from datetime import datetime
from .models import *
from hashlib import sha256
from flask_login import login_user, current_user, logout_user, login_required
import copy #Importation de copy pour gérer les pointeurs lors de la suppression d'albums

@app.before_request
def before_request():
    g.user = current_user
    if g.user.is_authenticated:
        g.user.last_seen = datetime.utcnow()
        db.session.add(g.user)
        db.session.commit()

@app.route("/logout/")
def logout():
	logout_user()
	return redirect(url_for('home'))

@app.route("/")
def home():
    if current_user.is_authenticated:
        # print(get_propositions_user(current_user.username))
        return render_template(
            "index.html",
            propositions=get_propositions_user(current_user.username),
        )
    else:
        return render_template(
            "index.html",
        )

@app.route("/home_user")
def home_user():
    return jsonify(propositions=get_propositions_user(current_user.username))

        ############
        ### user ###
        ############

@app.route("/user", methods=("POST",))
def login():
    datas = request.get_json()
    username = datas.get('username')
    password = datas.get('password').encode('utf-8')
    user = get_user(username)
    if (user is not None):
        m = sha256()
        m.update(password)
        password = m.hexdigest()
        if (user.password == password):
            login_user(user)
            return jsonify(state="success", user=user.serialize()),200
        return jsonify(state="error"),401
    return jsonify(state="error"),401

@app.route("/user", methods=("PUT",))
def register():
    datas = request.get_json()
    username = datas.get("username")
    password = datas.get("password").encode('utf-8')
    firstName = datas.get("firstName")
    lastName = datas.get("lastName")
    email = datas.get("email")
    desc = datas.get("desc")
    img = datas.get("picture")
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
            img=img,
            desc=desc,
            foodLevel=0)
        db.session.add(u)
        db.session.commit()
        login_user(u)
        return jsonify(state="success"),200
    return jsonify(state="error"),401


@login_required
@app.route("/user/matches", methods=("GET",))
def matches_route():
    matches = current_user.serialize()["matched"]
    user_dict = {}
    for user in matches.values():
        user_dict[user]=get_user(user).serialize()
    return jsonify(matches=user_dict)

@app.route("/user/matches", methods=("PUT",))
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
@app.route("/user/liked", methods=("GET",))
def my_plate_like_route():
    return jsonify(plates=current_user.serialize()["liked"])


@login_required
@app.route("/user/liked/add", methods=("PUT",))
def add_user_liked():
    user = current_user
    datas = request.get_json()
    print(datas)
    liked_food = get_food(datas.get('id'))
    if liked_food not in user.liked:
        user.liked.append(liked_food)
        db.session.commit()
        return jsonify(state=True)
    else:
        return jsonify(state="error")

@login_required
@app.route("/user/liked/remove", methods=("PUT",))
def remove_user_liked():
    user = current_user
    liked_food = get_food(request.get_json().get('id'))
    if liked_food in user.liked:
        user.liked.remove(liked_food)
        db.session.commit()
        return jsonify(state=True)
    else:
        return jsonify(state="error")

@login_required
@app.route("/user/cooked", methods=("GET",))
def my_plate_cooked_route():
    return jsonify(plates=current_user.serialize()["cooked"])

@login_required
@app.route("/user/cooked/add", methods=("PUT",))
def add_user_cooked_plate():
    user = current_user
    cooked_food = get_food(request.get_json().get('id'))
    if cooked_food not in user.cooked:
        user.cooked.append(cooked_food)
        db.session.commit()
        return jsonify(state=True)
    else:
        return jsonify(state="error")

@login_required
@app.route("/user/cooked/remove", methods=("PUT",))
def remove_user_cooked_plate():
    user = current_user
    cooked_food = get_food(request.get_json().get('id'))
    if cooked_food in user.cooked:
        user.cooked.remove(cooked_food)
        db.session.commit()
        return jsonify(state=True)
    else:
        return jsonify(state="error")


@login_required
@app.route("/user/loved", methods=("PUT",))
def add_user_loved():
    user = current_user
    datas = request.get_json()
    loved_user = get_user(datas.get('username',''))
    if loved_user not in user.loved:
        user.loved.append(loved_user)
        db.session.commit()
        if user in loved_user.loved:
            user.matched.append(loved_user)
            db.session.commit()
            return jsonify(state=True, match=True)
        return jsonify(state=True, match=False)
    else:
        return jsonify(state="error")

@app.route("/user/profil", methods=("GET",))
def get_myprofil():
    user = current_user.serialize()
    return jsonify(state=True, user=user)

@app.route("/user/profil", methods=("POST",))
def get_profil_other_user():
    data = request.get_json()
    username = data.get('username')
    user = get_user(username)
    if user == None:
        return jsonify(state=False, user="User introuvable : "+username)
    return jsonify(state=True, user=user.serialize())

@app.route("/user/profil", methods=("PUT",))
def user_modif():
    user=current_user
    datas = request.get_json()
    username = datas.get("username",'')
    password = datas.get("password",'').encode('utf-8')
    firstName = datas.get("firstName",'')
    lastName = datas.get("lastName",'')
    email = datas.get("email",'')
    desc = datas.get("desc",'')
    img = datas.get("picture",'')
    m = sha256()
    m.update(password)
    password = m.hexdigest()
    if username!=user.username:
        if username!='':
            if get_user(username):
                user.username=username
            else:
                return jsonify(state=False, error="username already taken"+username+user.username),401
        else:
            return jsonify(state=False, error="username can't be empty"),400
    if password!=user.password:
        if password!='':
            user.password=password
    if firstName!=user.firstName:
        if firstName!='':
            user.firstName=firstName
        else:
            return jsonify(state=False, error="firstName can't be empty"),400
    if lastName!=user.lastName:
        if lastName!='':
            user.lastName=lastName
        else:
            return jsonify(state=False, error="lastName can't be empty"),400
    if email!=user.email:
        if email!='':
            user.email=email
        else:
            return jsonify(state=False, error="email can't be empty"),400
    if desc!=user.desc:
        if desc!='':
            user.desc=desc
        else:
            return jsonify(state=False, error="Description can't be empty"),400
    if img!=user.img:
        if img!='':
            user.img=img
    db.session.commit()
    login_user(user)
    return jsonify(state=True),200

                ##############
                ## Messages ##
                ##############

@login_required
@app.route("/allmessagesusers", methods=('GET',))
def display_all_message_users_route():
    messages_db = get_all_messages()
    print (messages_db)
    messages_json = {}
    for message in messages_db:
        messages_json[message.id]=message.serialize()
    return jsonify(messages=messages_json)


@login_required
@app.route("/allmessages", methods=('GET',))
def display_all_message_route():
    user = current_user
    messages = get_messages_by_user(user.username)
    return jsonify(messages=messages)


@login_required
@app.route("/conversation", methods=('GET',))
def display_all_message_from_conversation_route(username):
    user = current_user
    messages = get_messages_by_users(user.username, username)
    return messages

@login_required
@app.route("/conversation/add", methods=("PUT",))
def add_message_to_conversation():
    try:
        datas = request.get_json()
        sender = datas.get('sender', '')
        user_sender = get_user(sender)
        receiver = datas.get('receiver', '')
        user_receiver = get_user(receiver)
        try:
            m = Message(sender=sender, receiver=receiver,
                              content=datas.get('content'))
            try:
                db.session.add(m)
                db.session.commit()
                user_sender.send.append(m)
                user_receiver.received.append(m)
                db.session.commit()
                return jsonify(state=True)
            except:
                return jsonify(state=False, error= "Message can't be added")
        except:
            return jsonify(state=False, error="Message can't be created")
    except:
        return jsonify(state=False, error="Message can't be transfered")

                ############
                ## plates ##
                ############

@login_required
@app.route("/allplates", methods=('PUT',))
############## BUGGGGGGG A RESOUDRE MAIS JE COMPRENDS PAS ALORS JE PASSE À LA SUITE ###############
def add_plate(id):
    try:
        datas = request.get_json()
        name = datas.get('name', '')
        img = datas.get('img', '')
        categories = datas.get('categories', '')
        classes = datas.get('classes', '')
        try:
            f = Food(name=name, img=img)
            try:
                print(categories)
                print("ca bugg")
                print("categories : ")
                print(get_category("Plat"))
                print("ca bugg encore?")
                print(get_categories())
                print("ca bugg pas")
                print(classes)
                for cat in categories :
                    print("cat : "+cat)
                    print(get_user("Alexis"))
                    ### C'est le get_category qui plante. Mais sérieusement, pourquoi ? #jerage
                    print(get_category("Plat"))
                    catObject = get_category(cat)
                    print("coucou"+catObject)
                    f.foodCategory.append(catObject)
                for cla in classes :
                    print(cla)
                    claObject = get_class(cla)
                    print(claObject)
                    f.foodClass.append(claObject)
                db.session.add(f)
                db.session.commit()
                return jsonify(state=True)
            except:
                return jsonify(state=False, error= "Food can't be added")
        except:
            return jsonify(state=False, error="Food can't be created")
    except:
        return jsonify(state=False, error="Information can not be parsed")


@login_required
@app.route("/allplates", methods=('DELETE',))
def delete_plate():
    try:
        datas = request.get_json()
        idfood = datas.get("id","")
        try:
            f = get_food(idfood)
            try:
                db.session.delete(f)
                print(get_food(idfood))
                db.session.commit()
                return jsonify(state=True)
            except:
                return jsonify(state=False, error= "Food can't be deleted")
        except:
            return jsonify(state=False, error="Food can't be found")
    except:
        return jsonify(state=False, error="Information can not be parsed")


@login_required
@app.route("/allplates", methods=('GET',))
def get_all_plates_route():
    plate_dict = get_all_food()
    plates = []
    for elem in plate_dict:
        plates.append(elem.serialize())
    user = current_user.serialize();
    return jsonify(plates=plates, admin=user["admin"], cooked=user["cooked"], liked=user["liked"])

@login_required
@app.route("/plates_by_class/<string:name>", methods=('GET',))
def plate_by_class_route(name):
    plates_dict = {}
    user = current_user.serialize();
    if name == 'all':
        plates = get_all_food()
        for elem in plates:
            plates_dict[elem.name] = elem.serialize()
            print(current_user.admin)
        return jsonify(plates=plates_dict, admin=current_user.admin, cooked=user["cooked"], liked=user["liked"])
    else:
        plates = get_food_by_category(name)
        return jsonify(plates=plates, admin=current_user.admin, cooked=user["cooked"], liked=user["liked"])

@login_required
@app.route("/plates_by_category/<string:name>", methods=('GET',))
def plate_by_category_route(name):
    category_used = name
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
    name_used = name
    plate_by_name_dict = {}
    if  get_food_by_name(name_used) != []:
        food_list=[]
        for food in get_food_by_name(name_used):
            food_list.append(food)
            plate_by_name_dict[name_used] = food_list
    return  jsonify(plates_by_name=plate_by_name_dict)


@login_required
@app.route("/myplates/add/<int:id>", methods=('PUT',))
def add_plate_user(id):
    plate_id = id
    p = get_food_by_id(plate_id)
    if p is not None :
            if add_plate_to_user_plates(plate_id) != None:
                return jsonify(state=True)
            else:
                return jsonify(state=False)
    else:
        return jsonify(state=False)

            ##############
            ## mycook ##
            ##############

@login_required
@app.route("/user/cooked/class/<string:name>", methods=('GET',))
def cook_by_class_route(name):
    class_used = name
    cook_by_class_dict = {}
    if  get_food_by_class(class_used) != []:
        food_list=[]
        for food in get_food_by_class(class_used):
            if food["name"] in  current_user.serialize()["cooked"].values():
                food_list.append(food)
                cook_by_class_dict[class_used]=food_list
    return  jsonify(cooks_by_class=cook_by_class_dict)

@login_required
@app.route("/cook_by_category/<string:name>", methods=('GET',))
def cook_by_category_route(name):
    category_used = name
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
    name_used = name
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

            ##############
            ## category ##
            ##############

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


            ############
            ### food ###
            ############



            ###############
            ### Matches ###
            ###############



        ##############
        ### SEARCH ###
        ##############

@login_required
@app.route("/addplates/search/<string:search>",methods=("GET",))
@app.route("/addcook/search/<string:search>",methods=("GET",))
def searchcook(search):
    dico_food=get_food_by_name(search)
    return  jsonify(state=True, results=dico_food),200
