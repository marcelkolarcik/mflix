from pprint import pprint
from traceback import format_exc

from bson import ObjectId
from flask import Blueprint, jsonify

from settings import mongo

theater_bp = Blueprint('theater_bp', __name__)


@theater_bp.route('<theater_id>/<movie_ids>/')
def theater(theater_id, movie_ids):
    try:
        _theater = mongo.db.theaters.find_one({'_id': ObjectId(theater_id)}, {'_id': 0})
        _theater['_id'] = theater_id
        pprint(_theater)
        movies = list(mongo.db.movies.aggregate([
            {"$match": {"_id": {"$in": [ObjectId(movie_id) for movie_id in movie_ids.split(',') if movie_id]}}},

            {"$project": {"_id": 0, 'id': {"$toString": "$_id"}, "title": 1, "plot": 1, "poster": 1, "imdb": 1}},

        ]

        ))

        return jsonify(theater=_theater, movies=movies)
    except:
        # log error
        pprint(format_exc())
        return jsonify(theater={})


@theater_bp.route('all/')
def theaters():
    try:
        _theaters = list(mongo.db.theaters.find({}, {'_id': {"$toString": "$_id"}, "location": 1}).limit(500))

        return jsonify(theaters=_theaters)

    except:
        # log error
        pprint(format_exc())
        return jsonify(theaters=[])
