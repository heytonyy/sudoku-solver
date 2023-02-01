from flask import Flask
from flask_cors import CORS

app = Flask(__name__, static_folder='client/build', static_url_path='')
CORS(app)