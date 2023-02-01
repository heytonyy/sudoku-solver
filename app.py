from flask import Flask, request
from flask_cors import CORS, cross_origin
import cv2
import numpy as np
from server.BadRequest import BadRequest
from server.image_models import create_sudoku_board
from server.sudoku_solution import solveSudoku

app = Flask(__name__, static_folder='client/build', static_url_path='')
CORS(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file('index.html')

@app.route('/api/sudoku_grid', methods=['POST'])
@cross_origin()
def solve_sudoku():
    if 'file' not in request.files:
        raise BadRequest('No file part')
    file = request.files['file']
    # If the user does not select a file, the browser submits an empty file without a filename.
    if file.filename == '':
        raise BadRequest('No selected file')
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    board = create_sudoku_board(img)
    solution = solveSudoku(board)
    return solution


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)