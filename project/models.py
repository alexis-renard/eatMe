from .app import db, login_manager, app
from flask_login import UserMixin
from hashlib import sha256
from flask_login import login_user, current_user, logout_user, login_required

#Création de la table love entre deux user
love = db.Table('love',
    db.Column('lover_username', db.Integer, db.ForeignKey('user.username'), nullable=False),
    db.Column('loved_username', db.Integer, db.ForeignKey('user.username'), nullable=False),
)

matches = db.Table('matches',
    db.Column('matched_username', db.Integer, db.ForeignKey('user.username'), nullable=False),
    db.Column('matcher_username', db.Integer, db.ForeignKey('user.username'), nullable=False),
)

#Création de la table cook entre User et food
cook = db.Table('cook',
    db.Column('user_username', db.Integer, db.ForeignKey('user.username'), nullable=False),
    db.Column('food_id', db.Integer, db.ForeignKey('food.id'), nullable=False),
    db.PrimaryKeyConstraint('food_id', 'user_username')
)

#Création de la table like entre User et food
like = db.Table('like',
    db.Column('user_username', db.Integer, db.ForeignKey('user.username'), nullable=False),
    db.Column('food_id', db.Integer, db.ForeignKey('food.id'), nullable=False),
    db.PrimaryKeyConstraint('food_id', 'user_username')
)


#Création de la table belong_Class enre food et class
belong_Class = db.Table('belong_Class',
    db.Column('food_id', db.Integer, db.ForeignKey('food.id'), nullable=False),
    db.Column('class_name', db.String(100), db.ForeignKey('class.name'), nullable=False),
    db.PrimaryKeyConstraint('food_id', 'class_name')
)

#Création de la table belong_Class enre food et catégory
belong_Category = db.Table('belong_Category',
    db.Column('food_id', db.Integer, db.ForeignKey('food.id'), nullable=False),
    db.Column('category_name', db.String(100), db.ForeignKey('category.name'), nullable=False),
    db.PrimaryKeyConstraint('food_id', 'category_name')
)



class User(db.Model, UserMixin):
    username    = db.Column(db.String(100), primary_key=True)
    firstName   = db.Column(db.String(100))
    lastName    = db.Column(db.String(100))
    email       = db.Column(db.String(100), unique=True)
    password    = db.Column(db.String(100))
    img         = db.Column(db.String())
    desc        = db.Column(db.String(1000))
    foodLevel   = db.Column(db.Integer)
    town_id     = db.Column(db.Integer, db.ForeignKey("town.id"))
    town        = db.relationship("Town", backref="user")
    loved = db.relationship('User',
                           secondary=love,
                           primaryjoin=(love.c.lover_username == username),
                           secondaryjoin=(love.c.loved_username == username),
                           backref=db.backref('lovers', lazy='dynamic'),
                           lazy='dynamic')
    matched = db.relationship('User',
                           secondary=matches,
                           primaryjoin=(matches.c.matched_username == username),
                           secondaryjoin=(matches.c.matcher_username == username),
                           backref=db.backref('matchers', lazy='dynamic'),
                           lazy='dynamic')
    liked = db.relationship("Food",secondary=like, backref = db.backref("user_liked", lazy="dynamic"))
    cooked = db.relationship("Food",secondary=cook, backref = db.backref("user_cooked", lazy="dynamic"))

    def serialize(self):
        loved = {}
        for user in self.loved:
            if user.username not in loved:
                loved[user.username] = user.username
        liked = {}
        for food in self.liked:
            if food.name not in liked:
                liked[food.name] = food.name
        cooked = {}
        for food in self.cooked:
            if food.name not in cooked:
                cooked[food.name] = food.name
        matches = {}
        for match in self.matched:
            if match.username not in matches:
                matches[match.username] = match.username
        return {
            'username': self.username,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'email': self.email,
            'password': self.password,
            'img': self.img,
            'desc': self.desc,
            'foodLevel': self.foodLevel,
            'town_id': self.town_id,
            'town': self.town.serialize(),
            'loved': loved,
            'liked': liked,
            'cooked': cooked,
            'matched': matches
        }

    def get_id(self):
        return self.username

    def get_firstName(self):
        return self.name

    def get_email(self):
        return self.email

def get_users():
    return User.query.all()

def get_user(username):
    return User.query.get(username)

def get_user_by_email(email):
    return User.query.filter(User.email==email).first()

def get_propositions_user(username):
    currentuser = get_user(username)
    propositions = {}
    for user in get_users():
        if user.username!=currentuser.username:
            if (user not in currentuser.loved):
                commun_plates={}
                commun_plates["User"]=[user.serialize()]
                commun_plates["ICook"]=[]
                commun_plates["HeCooks"]=[]
                commun_plates["WeLike"]=[]
                commun_plates["WeCook"]=[]
                for plat in user.liked:
                    if plat in currentuser.cooked:
                        commun_plates["ICook"].append(plat.serialize())
                for plat in user.cooked:
                    if plat in currentuser.liked:
                        commun_plates["HeCooks"].append(plat.serialize())
                for plat in user.liked:
                    if plat in currentuser.liked:
                        commun_plates["WeLike"].append(plat.serialize())
                for plat in user.cooked:
                    if plat in currentuser.cooked:
                        commun_plates["WeCook"].append(plat.serialize())

                somme = sum([len(x) for x in commun_plates.values()])
                if somme>5:
                    propositions[user.username]=commun_plates
    return propositions

class Food(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(100))
    img         = db.Column(db.String(100))
    foodCategory = db.relationship("Category",secondary=belong_Category, backref = db.backref("food_category", lazy="dynamic"))
    foodClass = db.relationship("Class",secondary=belong_Class, backref = db.backref("food_classes", lazy="dynamic"))

    def serialize(self):
        categories = {}
        for category in self.foodCategory:
            if category.name not in categories:
                categories[category.name] = category.name
        classes = {}
        for _class in self.foodClass:
            if _class.name not in classes:
                classes[_class.name] = _class.name
        return {
            'id': self.id,
            'name': self.name,
            'img': self.img,
            'foodCategory': categories,
            'foodClass': classes
        }

    def __repr__(self):
        return "<Food (%d) %s>" % (self.id, self.name)

    def get_id_a(self):
        return self.id

    def get_name(self):
        return self.name

    def get_img(self):
        return self.img

def get_food(id):
    return Food.query.get(id)

def get_all_food():
    return Food.query.all()

def l_contient(l, m):
    for ll in l:
        if m in ll.name.lower():
            return True
    return False

def get_food_by_name(name):
        foods = Food.query.filter(Food.name.like("%" + name + "%")).all()
        food_dict = {}
        for food in foods:
            food_dict[food.name]=food.serialize()
        return  food_dict


def get_food_by_category(name):
        foods = get_all_food()
        return [food.serialize() for food in foods if l_contient(food.foodCategory, name.lower())]

def get_food_by_class(name):
        foods = get_all_food()
        return [food.serialize() for food in foods if l_contient(food.foodClass, name.lower())]

def get_food_by_class_and_category(cat_name,class_name):
        foods = get_all_food()
        return [food.serialize() for food in foods if (l_contient(food.foodClass, class_name.lower()) and l_contient(food.foodCategory, cat_name.lower()))]

def delete_plate_from_user_plates(plate_name):
    try:
        p = get_food_by_name(plate_name)
        u = current_user
        u.liked.remove(p)
        db.session.add(u)
        db.session.commit()
    except:
        return None

def add_plate_to_user_plates(plate_id):
    try:
        p = get_food(plate_id)
        u = current_user
        u.liked.add(p)
        db.session.add(u)
        db.session.commit()
    except:
        return None

class Town(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(100))
    pc          = db.Column(db.Integer)
    country     = db.Column(db.String(100))

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'pc': self.pc,
            'country': self.country
        }

    def __repr__(self):
        return "<Town (%d) %s>" % (self.id, self.name)

    def get_id_a(self):
        return self.id

    def get_name(self):
        return self.name

    def get_cp(self):
        return self.cp

    def get_country(self):
        return self.country

    def get_towns():
        return Town.query.all()

    def get_town(id):
        return Town.query.get(id)

    def get_town_by_name(name):
        try:
            towns = get_towns()
            return [town for town in towns if town.name.like("%" + name.lower() + "%")]
        except NoResultFound:
            return []



class Class(db.Model):
    name          = db.Column(db.String(100), primary_key=True)

    def serialize(self):
        return {
            'name': self.name
        }

    def __repr__(self):
        return "<Class (%d)>" % (self.name)

    def get_name(self):
        return self.name

    def get_classes():
        return Class.query.all()

    def get_class(name):
        print('debut')
        print ((Class.query.filter(Class.name.like("%" + name+ "%")).first()).food_classes)
        print('fin')
        return Class.query.filter(Class.name.like("%" + name+ "%")).first()

class Category(db.Model):
    name          = db.Column(db.String(100), primary_key=True)

    def serialize(self):
        return {
            'name': self.name
        }
    def __repr__(self):
        return "<Category (%d)>" % (self.name)

    def get_name(self):
        return self.name

    def get_categories():
        return Category.query.all()

    def get_category(name):
        return Category.query.filter(Category.name.lower().like("%" + name.lower() + "%")).first()

@login_manager.user_loader
def load_user(username):
    return User.query.get(username)
