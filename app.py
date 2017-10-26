from flask import Flask, render_template, request, Response, jsonify
from pymongo import MongoClient
import os

app = Flask(__name__)

MONGO_URL = os.environ['MONGO_URL']


@app.route('/')
def list_titles():
    dbclient = MongoClient(MONGO_URL)
    db = dbclient.get_default_database()
    titles = db.titles.find().sort('title')
    return render_template('home.html', titles=titles)
