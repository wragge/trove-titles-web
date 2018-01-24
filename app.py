from flask import Flask, render_template, request, Response, jsonify
from pymongo import MongoClient
import os
import humanize


app = Flask(__name__)


MONGO_URL = os.environ['MONGO_URL']


@app.route('/')
def list_titles():
    dbclient = MongoClient(MONGO_URL)
    db = dbclient.get_default_database()
    titles = db.titles.find().sort('title')
    harvests = db.harvests.find().sort('date', -1).limit(2)
    harvest_new, harvest_old = list(harvests)
    new_titles = harvest_new['titles'] - harvest_old['titles']
    new_articles = humanize.intcomma(harvest_new['articles'] - harvest_old['articles'])
    return render_template('home.html', titles=titles, harvest=harvest_new, last_harvest=harvest_old, new_titles=new_titles, new_articles=new_articles)



@app.template_filter('humanize')
def humanize_number(text):
    """Make numbers look nice"""
    return humanize.intcomma(text)
