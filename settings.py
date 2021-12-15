import os
from pathlib import Path

from dotenv import load_dotenv
from flask_pymongo import PyMongo

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)
mongo = PyMongo()
MONGO_URI = os.getenv('MONGO_URI')