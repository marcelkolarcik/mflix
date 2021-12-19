from pprint import pprint

from flask import Blueprint, request, jsonify, session

from settings import mongo

user_bp = Blueprint('user_bp',__name__)

@user_bp.route('add/', methods=['POST'])
def add_user():
    try:

        user = request.get_json()
        pprint(f"add user - {user}")
        user_id = mongo.db.app_users.insert_one(user).inserted_id
        pprint(f"add user_id - {str(user_id)}")
        session['user_id'] = str(user_id)
        session['user_name'] = user['name']
        session['user_email'] = user['email']

        return jsonify(response='success')
    except Exception as e:
        pprint(e)
        return jsonify(response='error')
    pass

@user_bp.route('get/<user_id>/')
def get_user(user_id):
    try:
        pprint(f"get user_id {user_id}")
        user = mongo.db.app_users.find_one({'uid': user_id})
        if user:

            session['user_id'] = str(user['_id'])
            session['user_name'] = user['name']
            session['user_email'] = user['email']
            return jsonify(name=user['name'], email=user['email'])
        else:
            pprint('no user')
            return {}
    except Exception as e:
        pprint(e)
        return {}