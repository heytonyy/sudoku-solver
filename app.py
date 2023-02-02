from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restful import Api
from api.SudokuService import SudokuService
from api.BugReportService import BugReportService

# FLASK config
app = Flask(__name__, static_folder='client/build', static_url_path='')

# DB config
db = SQLAlchemy()
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sudoku_solver.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# CORS config
CORS(app)

# API config
api = Api(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file('index.html')


api.add_resource(SudokuService, '/api/sudoku')
api.add_resource(BugReportService, '/api/bugs')

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
