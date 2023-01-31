def solveSudoku(board):
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

    dfs(board, 0, 0, rows, cols, boxes)

    return board


def dfs(board, x, y, rows, cols, boxes):
    if y == 9:
        return True

    nextX = (x + 1) % 9
    nextY = y + 1 if nextX == 0 else y

    if board[y][x][0] != 0:
        return dfs(board, nextX, nextY, rows, cols, boxes)

    for i in range(1, 10):
        bx = x // 3
        by = y // 3
        box_index = by * 3 + bx
        if not rows[y][i] and not cols[x][i] and not boxes[box_index][i]:
            rows[y][i] = 1
            cols[x][i] = 1
            boxes[box_index][i] = 1
            board[y][x][0] = i

            if dfs(board, nextX, nextY, rows, cols, boxes):
                return True

            board[y][x][0] = 0
            boxes[box_index][i] = 0
            cols[x][i] = 0
            rows[y][i] = 0

    return False
