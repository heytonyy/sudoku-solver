from flask import request
from flask_restful import Resource, abort
from api.SudokuModel import SudokuModel


class SudokuService(Resource):
    def get(self):
        return {"message": "Hello, World!"}

    def post(self):
        if 'file' not in request.files:
            abort(400, message="No file part")
        file = request.files['file']
        # If the user does not select a file, the browser submits an empty file without a filename.
        if file.filename == '':
            abort(400, message="No selected file")
        model = SudokuModel(file)
        return model.solution
