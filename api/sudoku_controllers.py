from api import app
from flask import request, abort
from flask_cors import cross_origin
from api.sudoku_services import find_solution_service


@app.post('/api/sudoku_grid')
@cross_origin()
def solve_sudoku():
    if 'file' not in request.files:
        abort(400, description="No file part")
    file = request.files['file']
    # If the user does not select a file, the browser submits an empty file without a filename.
    if file.filename == '':
        abort(400, description="No selected file")
    solution = find_solution_service(file)
    return solution