from pprint import pprint
from random import shuffle
from traceback import format_exc

from bson import ObjectId
from flask import Blueprint, jsonify, request

from settings import mongo

api_bp = Blueprint('api_bp', __name__)


@api_bp.route('')
def index():
    try:
        movies = list(mongo.db.movies.aggregate([
            {
                "$match": {'poster': {"$exists": True}}
            },

            {
                "$addFields": {'id': {"$toString": "$_id"}}
            },
            {"$project": {
                "_id": 0
            }},

            {
                "$sort": {"imdb.votes": 1}
            },
            {"$limit": 10},
        ]))
        genres = list(mongo.db.movies.distinct('genres'))
        pprint(genres)

        return jsonify(movies=movies, genres=genres)
    except:
        pprint(format_exc())
        return jsonify(movies=[])


@api_bp.route('/movie/<movie_id>')
def movie(movie_id):
    try:
        _movie = mongo.db.movies.find_one({'_id': ObjectId(movie_id)}, {'_id': 0})
        comments = list(mongo.db.comments.find({'movie_id': ObjectId(movie_id)}, {'_id': 0, 'movie_id': 0}))
        _movie['id'] = movie_id

        return jsonify(movie=_movie, comments=comments)
    except:
        pprint(format_exc())
        return jsonify(movie={}, comments=[])


@api_bp.route('search/<field>/<search_term>')
def search(field, search_term):
    try:
        with_poster = {'poster': {"$exists": True}}
        match_query = {
            'genres': {"$match": {**with_poster, **{"genres": {"$in": [search_term]}}}},
            'cast': {"$match": {**with_poster, **{"cast": {"$in": [search_term]}}}},
            'directors': {"$match": {**with_poster, **{"directors": {"$in": [search_term]}}}},
            'writers': {"$match": {**with_poster, **{"writers": {"$in": [search_term]}}}},
            'series': {"$match": {**with_poster, **{"type": "series"}}},
            'movie': {"$match": {**with_poster, **{"type": "movie"}}},
            'year': {"$match": {**with_poster, **{"year": int(search_term) if field == 'year' else search_term}}},
            'production': {"$match": {**with_poster, **{"tomatoes.production": search_term}}},
            'term': {"$match": {"$or":
                                [
                                    {**with_poster, **{"title": search_term}},
                                    {**with_poster, **{"cast": {"$in": [search_term]}}},
                                    {**with_poster, **{"directors": {"$in": [search_term]}}},
                                    {**with_poster, **{"writers": {"$in": [search_term]}}}

                                ]}},
        }

        try:
            # sorting movies, series by popularity or top-rated
            _sort = {
                'popular':  {"$sort": {"imdb.votes": -1}},
                'top-rated': {"$sort": {"imdb.rating": -1}}
            }[search_term]
        except:
            # default sort
            _sort = {"$sort": {"imdb.votes": -1}}



        if request.values and 'page' in request.values:
            page = request.values['page']
        # types : movie,series /string
        # genres /array
        # cast /array
        # directors /array
        # imdb.rating /string
        # imdb.votes /string
        # tomatoes.production /string
        # year /int

        movies = list(mongo.db.movies.aggregate([
            match_query[field],
            { "$addFields": {'id': {"$toString": "$_id"}}},
            {"$project": {"_id": 0 }},
            _sort,
            {"$limit": 20},
        ]))

        if search_term == 'on-the-air' :
            shuffle(movies)
        pprint(movies)
        return jsonify(movies=movies)
    except:
        pprint(format_exc())
        return jsonify(movies=[])
