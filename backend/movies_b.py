from pprint import pprint
from random import shuffle
from traceback import format_exc

from bson import ObjectId
from flask import Blueprint, jsonify, session

from backend.comments_b import get_movie_comments
from settings import mongo

movies_bp = Blueprint('movies_bp', __name__)


@movies_bp.route('')
def index():
    try:
        # ind = mongo.db.movies.create_index([
        # ('imdb.rating',pymongo.DESCENDING)],
        # name='imdb')
        # ind2 = mongo.db.movies.create_index([('imdb.votes', pymongo.DESCENDING)],
        #                                    name='imdb2')
        # pprint(ind.ind2)
        # movies = list(mongo.db.movies.aggregate([
        #     {
        #         "$match": {'poster': {"$exists": True}}
        #     },
        #
        #     {
        #         "$addFields": {'id': {"$toString": "$_id"}}
        #     },
        #     {"$project": {
        #         "_id": 0
        #     }},
        #
        #     {
        #         "$sort": {"imdb.rating": 1}
        #     },
        #     {"$limit": 1},
        # ]))
        # pprint(movies)

        genres = list(mongo.db.movies.distinct('genres'))

        # _movies = []
        # _series = []
        # for _movie in grouped:
        #     try:
        #         _movie['id'] = str(_movie['_id'])
        #         del _movie['_id']
        #         _movie['imdb']['votes'] = int(_movie['imdb']['votes'])
        #         _movie['imdb']['rating'] = float(_movie['imdb']['rating'])
        #         if _movie['type'] == 'movie':
        #             _movies.append(_movie)
        #         else:
        #             _series.append(_movie)
        #     except:
        #         pass
        # shuffle(_movies)
        # shuffle(_series)
        # all_grouped = {
        #     'mp': sorted(_movies, key=lambda x: x['imdb']['votes'], reverse=True)[:10],
        #     'mt': sorted(_movies, key=lambda x: x['imdb']['rating'], reverse=True)[:10],
        #     'ma': _movies[:10],
        #     'sp': sorted(_series, key=lambda x: x['imdb']['votes'], reverse=True)[:10],
        #     'st': sorted(_series, key=lambda x: x['imdb']['rating'], reverse=True)[:10],
        #     'sa': _series[:10],
        # }

        all_grouped = mongo.db.grouped.find_one({}, {'_id': 0})

        return jsonify(genres=genres, all_grouped=all_grouped)
    except:
        # log error
        pprint(format_exc())
        return jsonify(movies=[])


@movies_bp.route('on-the-air/')
def on_the_air():
    try:
        ontheair = list(mongo.db.movies.aggregate([

            {"$addFields": {'id': {"$toString": "$_id"}}},
            {"$project": {"_id": 0}},

            {"$sample": {"size": 12}}

        ]

        ))

        return jsonify(movies=ontheair)

    except:
        # log error
        pprint(format_exc())
        return jsonify(movies=[])


@movies_bp.route('movie/<movie_id>')
def movie(movie_id):
    try:
        _movie = mongo.db.movies.find_one({'_id': ObjectId(movie_id)}, {'_id': 0})
        comments = get_movie_comments(movie_id)
        _movie['id'] = movie_id

        return jsonify(movie=_movie, comments=comments[::-1],
                       user_email=session.get('user_email') if 'user_email' in session else None)
    except:
        # log error
        pprint(format_exc())
        return jsonify(movie={}, comments=[])


@movies_bp.route('search/<field>/<search_term>')
def search(field, search_term):
    try:
        with_poster = {'poster': {"$exists": True}}
        match_query = {
            'genres': {"$match": {**with_poster, **{"genres": {"$in": [search_term]}}}},
            'cast': {"$match": {**with_poster, **{"cast": {"$in": [search_term]}}}},
            'directors': {"$match": {**with_poster, **{"directors": {"$in": [search_term]}}}},
            'writers': {"$match": {**with_poster, **{"writers": {"$in": [search_term]}}}},
            'series': {"$match": {**with_poster,
                                  **{"type": "series", "imdb.votes": {"$gt": 10000}, "imdb.rating": {"$gt": 6}}}},
            'movie': {"$match": {**with_poster,
                                 **{"type": "movie", "imdb.votes": {"$gt": 100000}, "imdb.rating": {"$gt": 8}}}},
            'year': {"$match": {**with_poster, **{"year": int(search_term[:4]) if field == 'year' else search_term}}},
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
                'popular': {"$sort": {"imdb.votes": 1}},
                'top-rated': {"$sort": {"imdb.rating": 1}}
            }[search_term]
        except:
            # default sort
            _sort = {"$sort": {"imdb.votes": 1}}

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
            {"$addFields": {'id': {"$toString": "$_id"}}},
            {"$project": {"_id": 0}},
            {"$sort": {"_id": 1}},
            _sort,
            {"$limit": 500},

        ]

        ))

        if search_term == 'on-the-air':
            shuffle(movies)

        return jsonify(movies=movies[::-1])
    except:
        # log error
        pprint(format_exc())
        return jsonify(movies=[])
