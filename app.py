from flask import Flask, send_from_directory

from settings import mongo, MONGO_URI

app = Flask(__name__, static_folder='frontend/build', static_url_path='')

import backend.api_b as api_m

app.register_blueprint(api_m.api_bp, url_prefix='/api/')

mongo.init_app(app, uri=MONGO_URI)


@app.route('/api/', methods=['GET'])
def index():
    print('getting fetch orig')
    return {
        'tutorial': 'React-Flask-Heroku'
    }


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
