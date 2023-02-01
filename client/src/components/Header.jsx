const Header = () => {
    return (
        <>
            <h1>Sudoku Solver</h1>
            <p>by heytonyyy</p>
            <p>
                Upload an image of a sudoku puzzle and the app will solve it for you!
                This app uses a Python Flask server to process the image with OpenCV and PyTessaract, then uses a backtracking algorithm to solve the puzzle.
            </p>
        </>
    )
}

export default Header