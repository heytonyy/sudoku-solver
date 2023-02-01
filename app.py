from api import app, sudoku_controllers


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)