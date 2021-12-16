from pprint import pprint
from traceback import format_exc

from bson import ObjectId
from flask import Blueprint, jsonify

from settings import mongo

api_bp = Blueprint('api_bp', __name__)


@api_bp.route('')
def index():
    try:
        movies = list(mongo.db.movies.aggregate([

            {
                "$addFields": {'id': {"$toString": "$_id"}}
            },
            {"$project": {
                "_id": 0
            }},

            {
                "$sort": {"num_mflix_comments": -1}
            },
            {"$limit": 10},
        ]))
        genres = list(mongo.db.movies.distinct('genres'))
        pprint(genres)
        # movie_id = movies[0]['id']
        #
        # comments = list( mongo.db.comments.find({'movie_id':ObjectId(movie_id)}).limit(3))
        # pprint(comments)
        return jsonify(movies=movies, genres=genres)
    except:
        pprint(format_exc())
        return jsonify(movies=[])


@api_bp.route('/movie/<movie_id>')
def movie(movie_id):
    try:
        _movie = mongo.db.movies.find_one({'_id': ObjectId(movie_id)}, {'_id': 0})
        comments = list(mongo.db.comments.find({'movie_id':ObjectId(movie_id)},{'_id':0,'movie_id':0}))
        _movie['id'] = movie_id
        return jsonify(movie=_movie, comments=comments)
    except:
        pprint(format_exc())
        return jsonify(movie={}, comments=[])


@api_bp.route('search/<search_term>')
def search(search_term):
    try:
        movies = list(mongo.db.movies.aggregate([
            {
                "$match": {
                    "genres": {"$in": [search_term]}
                }
            }
            ,

            {
                "$addFields": {'id': {"$toString": "$_id"}}
            },
            {"$project": {
                "_id": 0
            }},

            {
                "$sort": {"num_mflix_comments": -1}
            },
            {"$limit": 10},
        ]))
        genres = list(mongo.db.movies.distinct('genres'))
        pprint(genres)
        # movie_id = movies[0]['id']
        #
        # comments = list( mongo.db.comments.find({'movie_id':ObjectId(movie_id)}).limit(3))
        # pprint(comments)
        return jsonify(movies=movies, genres=genres)
    except:
        pprint(format_exc())
        return jsonify(movies=[])
