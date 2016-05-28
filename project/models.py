from .app import db, login_manager, app
from flask.ext.login import UserMixin
from wtforms import StringField, HiddenField, PasswordField, SelectField, RadioField, validators
from wtforms.validators import DataRequired, Required, EqualTo, Length, Email
from flask.ext.wtf import Form
from hashlib import sha256
from flask.ext.login import login_user, current_user, logout_user, login_required

#Création de la table love entre deux user
love = db.Table('love',
    db.Column('lover_id', db.Integer, db.ForeignKey('user.id'), nullable=False),
    db.Column('loved_id', db.Integer, db.ForeignKey('user.id'), nullable=False),
)


#Création de la table cook entre User et food
cook = db.Table('cook',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), nullable=False),
    db.Column('food_id', db.Integer, db.ForeignKey('food.id'), nullable=False),
    db.PrimaryKeyConstraint('food_id', 'user_id')
)

#Création de la table like entre User et food
like = db.Table('like',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), nullable=False),
    db.Column('food_id', db.Integer, db.ForeignKey('food.id'), nullable=False),
    db.PrimaryKeyConstraint('food_id', 'user_id')
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
                           primaryjoin=(love.c.loved_id == id),
                           secondaryjoin=(love.c.lover_id == id),
                           backref=db.backref('lovers', lazy='dynamic'),
                           lazy='dynamic')
    liked = db.relationship("Food",secondary=like, backref = db.backref("user_liked", lazy="dynamic"))
    cooked = db.relationship("Food",secondary=cook, backref = db.backref("user_cooked", lazy="dynamic"))

    def get_username(self):
        return self.username

    def get_firstName(self):
        return self.name

    def get_email(self):
        return self.email

def get_users():
    return User.query.all()

def get_user(username):
    return User.query.get(username)

def get_food_liked_by_user(username):
    return get_user(username).liked

def get_user_by_email(email):
    return User.query.filter(User.email==email).first()

class LoginForm(Form):
    email = StringField('Email', [validators.Required(), validators.Email()])
    password = PasswordField('Password', [validators.Length(min=4), validators.Required()])
    next = HiddenField()

    def get_authenticated_user(self):
        # print('get authenticated')
        # print (self.email)
        # print (self.password)
        # print (self.email.data)
        user = get_user_by_email(self.email.data)
        # user = User.query.get(self.email.data)
        # print(user)
        if user is None:
            return None
        m = sha256()
        m.update(self.password.data.encode())
        passwd = m.hexdigest()
        # print('passwd')
        # print (passwd)
        # print('passwd user')
        # print (user.password)
        return user if passwd == user.password else None

class RegisterForm(Form):
    firstName = StringField('First Name', [validators.Length(min=4), validators.Required()]) #ce qui est entre simple quote correspond au label du champs
    lastName = StringField('Last Name', [validators.Length(min=4), validators.Required()]) #ce qui est entre simple quote correspond au label du champs
    email = StringField('Email', [validators.Length(min=4), validators.Required(), validators.Email()])
    password = PasswordField('Password', [
    	validators.Required(),
    	validators.EqualTo('confirm', message='Passwords must match'),
        validators.Length(min=4),
        validators.Email()])
    confirm = PasswordField('Repeat Password', [validators.Length(min=4), validators.Required()])
    desc = StringField('Description', [validators.Length(min=4), validators.Required()])
    next = HiddenField()


class Food(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(100))
    img         = db.Column(db.String(100))
    foodCategory = db.relationship("Category",secondary=belong_Category, backref = db.backref("food_category", lazy="dynamic"))
    foodClass = db.relationship("Class",secondary=belong_Class, backref = db.backref("food_classes", lazy="dynamic"))

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
        try:
            foods = get_all_food()
            return [food for food in foods if food.name.like("%" + name.lower() + "%")]
        except NoResultFound:
            return []

    def get_food_by_category(name):
        try:
            foods = get_all_food()
            return [food for food in foods if l_contient(food.foodCategory, name.lower())]
        except NoResultFound:
            return []

    def get_food_by_class(name):
        try:
            foods = get_all_food()
            return [food for food in foods if l_contient(food.foodClass, name.lower())]
        except NoResultFound:
            return []

    def get_food_by_class_and_category(cat_name,class_name):
        try:
            foods = get_all_food()
            return [food for food in foods if (l_contient(food.foodClass, class_name.lower()) and l_contient(food.foodCategory, cat_name.lower()))]
        except NoResultFound:
            return []


class Town(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(100))
    pc          = db.Column(db.Integer)
    country     = db.Column(db.String(100))

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

    def __repr__(self):
        return "<Class (%d)>" % (self.name)

    def get_name(self):
        return self.name

    def get_classes():
        return Class.query.all()

    def get_class(name):
        return Genre.query.filter(Class.name.lower().like("%" + name.lower() + "%")).first()

class Category(db.Model):
    name          = db.Column(db.String(100), primary_key=True)

    def __repr__(self):
        return "<Category (%d)>" % (self.name)

    def get_name(self):
        return self.name

    def get_caegories():
        return Category.query.all()

    def get_category(name):
        return Category.query.filter(Category.name.lower().like("%" + name.lower() + "%")).first()

class SearchForm(Form):
    element=StringField("Recherche",validators=[DataRequired()])

@login_manager.user_loader
def load_user(username):
    return User.query.get(username)
