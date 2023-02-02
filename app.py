from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from api.SudokuService import SudokuService


app = Flask(__name__, static_folder='client/build', static_url_path='')
CORS(app)
api = Api(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file('index.html')


api.add_resource(SudokuService, '/api/sudoku_grid')

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
