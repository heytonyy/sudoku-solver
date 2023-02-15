from flask import request, jsonify
from flask_restful import Resource, abort
from .BugReportModel import BugReport
from .pymongo_config import PyMongoConnection

class BugReportService(Resource):
    def get(self):
        db = PyMongoConnection('sudoku', 'bug_reports')
        data = {
            'image': '',
            'solution': '',
            'reported_cells': '',
        }
        bugreport = db.insert_one(data)
        return jsonify(bugreport)

    def post(self):
        if 'file' not in request.files:
            abort(400, message="No file part")
        file = request.files['file']
        # If the user does not select a file, the browser submits an empty file without a filename.
        if file.filename == '':
            abort(400, message="No selected file")
        data = {
            'image': file,
            'solution': request.form['solution'],
            'reported_cells': request.form['reported_cells'],
        }
        model = BugReport(data)
        return model.solution

    def delete(self):
        pass