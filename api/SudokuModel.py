from imutils.perspective import four_point_transform
from skimage.segmentation import clear_border
import imutils
import numpy as np
import cv2
import pytesseract


class SudokuModel:
    def __init__(self, file):
        self.image = cv2.imdecode(np.frombuffer(
            file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
        self.board = self.create_sudoku_board(self.image)
        self.solution = self.solveSudoku(self.board)

    def __repr__(self):
        return str(self.solution)

    def create_sudoku_board(self, image):
        img = imutils.resize(image, width=600)

        # find the puzzle in the image and then
        (_, warped) = self.find_puzzle(img)

        # initialize our 9x9 Sudoku board (0 is used to represent an empty cell)
        board = [[0 for _ in range(9)] for _ in range(9)]

        # stepX and stepY are the width and height of each cell
        stepX = warped.shape[1] // 9
        stepY = warped.shape[0] // 9

        # loop over the grid locations
        for y in range(0, 9):
            # initialize the current list of cell locations
            row = []
            for x in range(0, 9):
                # compute the starting and ending (x, y)-coordinates of the current cell
                startX = x * stepX
                startY = y * stepY
                endX = (x + 1) * stepX
                endY = (y + 1) * stepY

                # add the (x, y)-coordinates to our cell locations list
                row.append((startX, startY, endX, endY))

                # crop the cell from the warped transform image and then extract the digit from the cell
                cell = warped[startY:endY, startX:endX]
                digit = self.extract_digit(cell)

                # verify that the digit is not empty
                if digit is not None:
                    # resize the cell to 28x28 pixels
                    roi = cv2.resize(digit, (28, 28))

                    # tesseract configs:
                    # --psm 10: treat the image as a single character
                    # --oem 3: use LSTM neural network
                    # -c tessedit_char_whitelist=0123456789: only recognize digits
                    pred = pytesseract.image_to_string(
                        roi, config='--psm 10 --oem 3 -c tessedit_char_whitelist=0123456789')

                    # if the prediction is empty or contains a newline, set the prediction to 0
                    if pred == '' or pred == '\x0c':
                        pred = 0
                    else:
                        pred = int(pred[0])

                    # updates the Sudoku board with the prediction
                    board[y][x] = pred

        # return the Sudoku board
        return board

    def find_puzzle(self, image):
        # convert to grayscale and blur
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (7, 7), 3)

        # apply adaptive thresholding and then invert the threshold map
        thresh = cv2.adaptiveThreshold(
            blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
        thresh = cv2.bitwise_not(thresh)

        # find contours in the thresholded image and sort them by size in descending order
        cnts = cv2.findContours(
            thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        cnts = imutils.grab_contours(cnts)
        cnts = sorted(cnts, key=cv2.contourArea, reverse=True)

        # initialize a contour that corresponds to the puzzle outline
        puzzleCnt = None

        # loop over the contours
        for c in cnts:
            # approximate the contour
            peri = cv2.arcLength(c, True)
            approx = cv2.approxPolyDP(c, 0.02 * peri, True)

            # if our approximated contour has four points, then we can assume we have found the outline of the puzzle
            if len(approx) == 4:
                puzzleCnt = approx
                break

        # if the puzzle contour is empty then our script could not find the outline of the Sudoku puzzle so raise an error
        if puzzleCnt is None:
            raise Exception(("Could not find Sudoku puzzle outline. "
                            "Try debugging your thresholding and contour steps."))

        # apply a four point perspective transform to both the original image and grayscale image to obtain a top-down bird's eye view of the puzzle
        puzzle = four_point_transform(image, puzzleCnt.reshape(4, 2))
        warped = four_point_transform(gray, puzzleCnt.reshape(4, 2))

        # return a 2-tuple of puzzle in both RGB and grayscale
        return (puzzle, warped)

    def extract_digit(self, cell):
        # apply automatic thresholding to the cell and then clear any
        # connected borders that touch the border of the cell
        thresh = cv2.threshold(
            cell, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
        thresh = clear_border(thresh)

        # find contours in the thresholded cell
        cnts = cv2.findContours(
            thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        cnts = imutils.grab_contours(cnts)

        # if no contours were found than this is an empty cell
        if len(cnts) == 0:
            return None

        # otherwise, find the largest contour in the cell and create a
        # mask for the contour
        c = max(cnts, key=cv2.contourArea)
        mask = np.zeros(thresh.shape, dtype="uint8")
        cv2.drawContours(mask, [c], -1, 255, -1)

        # compute the percentage of masked pixels relative to the total
        # area of the image
        (h, w) = thresh.shape
        percentFilled = cv2.countNonZero(mask) / float(w * h)

        # if less than 3% of the mask is filled then we are looking at
        # noise and can safely ignore the contour
        if percentFilled < 0.03:
            return None

        # apply the mask to the thresholded cell
        digit = cv2.bitwise_and(thresh, thresh, mask=mask)

        # return the digit to the calling function
        return digit

    def solveSudoku(self, board):
        rows = [[0 for _ in range(10)] for _ in range(9)]
        cols = [[0 for _ in range(10)] for _ in range(9)]
        boxes = [[0 for _ in range(10)] for _ in range(9)]

        for i in range(9):
            for j in range(9):
                num = board[i][j]
                bx = j // 3
                by = i // 3
                rows[i][num] = 1
                cols[j][num] = 1
                boxes[by * 3 + bx][num] = 1
                if num != 0:
                    board[i][j] = [num, 'predicted']
                else:
                    board[i][j] = [0, 'empty']

        SudokuModel.dfs(board, 0, 0, rows, cols, boxes)

        return board

    @staticmethod
    def dfs(board, x, y, rows, cols, boxes):
        if y == 9:
            return True

        nextX = (x + 1) % 9
        nextY = y + 1 if nextX == 0 else y

        if board[y][x][0] != 0:
            return SudokuModel.dfs(board, nextX, nextY, rows, cols, boxes)

        for i in range(1, 10):
            bx = x // 3
            by = y // 3
            box_index = by * 3 + bx
            if not rows[y][i] and not cols[x][i] and not boxes[box_index][i]:
                rows[y][i] = 1
                cols[x][i] = 1
                boxes[box_index][i] = 1
                board[y][x][0] = i

                if SudokuModel.dfs(board, nextX, nextY, rows, cols, boxes):
                    return True

                board[y][x][0] = 0
                boxes[box_index][i] = 0
                cols[x][i] = 0
                rows[y][i] = 0

        return False
