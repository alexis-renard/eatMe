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



class User(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
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

    def get_id(self):
        return self.id

    def get_firstName(self):
        return self.name


class LoginForm(Form):
    email = db.Column(db.String(100))
    password = PasswordField('Password', [validators.Length(min=4), validators.Required()])
    next = HiddenField()

    def get_authenticated_user(self):
        user = User.query.get(self.email.data)
        if user is None:
            return None
        m = sha256()
        m.update(self.password.data.encode())
        passwd = m.hexdigest()
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

class Class(db.Model):
    name          = db.Column(db.String(100), primary_key=True)

    def __repr__(self):
        return "<Class (%d)>" % (self.name)

    def get_name(self):
        return self.name

class Category(db.Model):
    name          = db.Column(db.String(100), primary_key=True)

    def __repr__(self):
        return "<Category (%d)>" % (self.name)

    def get_name(self):
        return self.name
