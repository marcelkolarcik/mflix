import os

from flask import Flask, send_from_directory

import backend.movies_b as movies_m
import backend.user_b as user_m
import backend.theater_b as theater_m
import backend.comments_b as comments_m
from settings import mongo, MONGO_URI

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.register_blueprint(movies_m.movies_bp, url_prefix='/api/')
app.register_blueprint(user_m.user_bp, url_prefix='/api/user/')
app.register_blueprint(theater_m.theater_bp, url_prefix='/api/theater/')
app.register_blueprint(comments_m.comments_bp, url_prefix='/api/comments/')

mongo.init_app(app, uri=MONGO_URI)


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
