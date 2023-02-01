from api import app, sudoku_controllers

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)

# BUILDPACK:
# heroku buildpacks:set heroku/python
# https://github.com/heroku/heroku-buildpack-apt

# HEROKU CONFIG:
# heroku config:set FLASK_APP=app.py
# heroku config:set FLASK_ENV=development
# heroku config:set TESSDATA_PREFIX=./.apt/usr/share/tesseract-ocr/4.00/tessdata
# TESSDATA_PREFIX = ./.apt/usr/share/tesseract-ocr/4.00/tessdata

# HEROKU DEPLOY:
# heroku login
# heroku git:remote -a sudoku-solver
# git push heroku master

# HEROKU LOGS:
# heroku logs --tail