from flask import Flask, request, abort
from flask_cors import CORS, cross_origin
from api.sudoku_services import find_solution_service


app = Flask(__name__, static_folder='client/build', static_url_path='')
CORS(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file('index.html')

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

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)

# BUILDPACK:
# heroku buildpacks:set heroku/python
# https://github.com/heroku/heroku-buildpack-apt

# HEROKU CONFIG:
# heroku config:set FLASK_APP=app.py
# heroku config:set FLASK_ENV=development
# heroku config:set TESSDATA_PREFIX=./.apt/usr/share/tesseract-ocr/4.00/tessdata

# HEROKU DEPLOY:
# heroku login
# heroku git:remote -a sudoku-solver
# git push heroku master

# HEROKU LOGS:
# heroku logs --tail