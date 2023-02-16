from flask import request, jsonify
from flask_restful import Resource, abort
from .BugReportModel import BugReport
from .pymongo_config import PyMongoConnection

import os
from uuid import uuid4
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
load_dotenv()

IMG_ABSOLUTE_PATH = os.getenv('IMG_ABSOLUTE_PATH')
RELATIVE_PATH = os.getenv('RELATIVE_PATH')


# make image names unique
def make_unique(string):
    ident = uuid4().__str__()
    return f"{string}-{ident}"

class BugReportService(Resource):
    def get(self):
        db = PyMongoConnection('sudoku', 'bug_reports')
        bugreports = db.find_all({})
        return jsonify(bugreports)

    def post(self):
        if 'file' not in request.files:
            abort(400, message="No file part")
        file = request.files['file']
        # If the user does not select a file, the browser submits an empty file without a filename.
        if file.filename == '':
            abort(400, message="No selected file")
        og_filename = secure_filename(file.filename)
        unique_filename = make_unique(og_filename)
        file.save(os.path.join(IMG_ABSOLUTE_PATH, unique_filename))
        relpath = os.path.relpath(IMG_ABSOLUTE_PATH, RELATIVE_PATH)
        image_path = f'/{relpath}/{unique_filename}'
        data = {
            'image': image_path,
            # 'solution': request.form['solution'],
            # 'reported_cells': request.form['reported_cells'],
            # 'created_at': request.form['created_at']
        }
        db = PyMongoConnection('sudoku', 'bug_reports')
        newBugReport = db.insert_one(data)
        return jsonify(newBugReport)

    def delete(self):
        pass