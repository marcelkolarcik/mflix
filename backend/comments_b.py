from datetime import datetime
from pprint import pprint
from traceback import format_exc

from bson import ObjectId
from flask import Blueprint, request, jsonify, session

from settings import mongo

comments_bp = Blueprint('comments_bp', __name__)


@comments_bp.route('add/', methods=['POST'])
def add_comment():
    try:
        form_data = request.get_json()

        if form_data['comment'] == '':
            return jsonify(result='error', message='empty comment')

        comment_data = {
            'name': session.get('user_name'),
            'email': session.get('user_email'),
            'text': form_data['comment'][:500],
            'movie_id': ObjectId(form_data['movieId']),
            'date': datetime.utcnow()
        }

        mongo.db.comments.insert_one(comment_data)

        comment_data['movie_id'] = str(comment_data['movie_id'])
        comment_data['_id'] = str(comment_data['_id'])
        comment_data['date'] = str(comment_data['date'])
        pprint(comment_data)
        return jsonify(result='success', comment=comment_data)
    except:
        # log error
        pprint(format_exc())
        return jsonify(result='error')


@comments_bp.route('delete/', methods=['POST'])
def delete():
    try:
        form_data = request.get_json()
        pprint(form_data)
        comment_id = form_data['commentId']
        mongo.db.comments.delete_one({'_id': ObjectId(comment_id), 'email': session.get('user_email')})
        return jsonify(result='success')
    except:
        # log error
        pprint(format_exc())
        return jsonify(result='error')


def get_movie_comments(movie_id):
    try:
        return list(mongo.db.comments.find(
            {'movie_id': ObjectId(movie_id)},
            {'_id': 0,
             'id': {"$toString": "$_id"},
             "text": 1,
             "date": 1,
             "name": 1,
             "email": 1},
        ))
    except:
        # log error
        return []
