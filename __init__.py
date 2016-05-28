# project/__init__.py

#################
#### imports ####
#################

from flask import Flask, render_template
from flask.ext.script import Manager
from flask.ext.bootstrap import Bootstrap
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager
from flask_debugtoolbar import DebugToolbarExtension
import os.path

################
#### config ####
################

app = Flask(__name__)
app.debug = True
app.config['BOOTSTRAP_SERVE_LOCAL'] = True
app.config['SECRET_KEY'] = "efd04c67-1745-476e-a18a-6295999a2eca"


def mkpath(p):
    return os.path.normpath(
        os.path.join(
            os.path.dirname(__file__),
            p
        )
    )
app.config['SQLALCHEMY_DATABASE_URI'] = (
    'sqlite:///' + mkpath('../myapp.db')
)
