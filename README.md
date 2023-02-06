# Sudoku Solver

A simple Flask RESTful API / React frontend that accepts a post request of an image file of a sudoku board, determines the grid of the board from the photo, converts that image to a 2x2 grid of cell, analyzes each cell and predicts the number on it, and response with the solution to the 2x2 sudoku grid.

![thumbnail](https://raw.githubusercontent.com/heytonyy/media-uploads/main/sudoku-lg.png)

## Getting Started

### Dependencies

* Frontend (in package.json):
```json
"dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.11",
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "bootstrap": "^5.2.3",
    "framer-motion": "^9.0.1",
    "react": "^18.2.0",
    "react-bootstrap": "^2.7.0",
    "react-dom": "^18.2.0",
    "react-github-corner": "^2.5.0",
    "react-icons": "^4.7.1",
    "react-router-dom": "^6.7.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.4",
    "web-vitals": "^2.1.4"
  },
```
* Backend (in Pipfile):
```
[packages]
flask = "*"
flask-cors = "*"
opencv-python-headless = "*"
pytesseract = "*"
numpy = "*"
imutils = "*"
scikit-image = "*"
gunicorn = "*"
pillow = "*"
flask-restful = "*"
flask-sqlalchemy = "*"
pymongo = "*"
```



## Version History

* 0.1
    * Initial Release


## Acknowledgments

Inspiration for this app came from these two leetcode problems:
* [Valid-Sudoku](https://leetcode.com/problems/valid-sudoku/)
* [Sudoku-Solver](https://leetcode.com/problems/sudoku-solver/description/)
