import { Navbar, Container, Image } from 'react-bootstrap'
import GithubCorner from 'react-github-corner'
import logo from '../assets/logo.png'

const TopNavBar = () => {

    return (
        <Navbar
            fixed='top'
            className='navbar-blur shadow-sm'
        >
            <Container>
                <Navbar.Brand href='/' className='d-flex gap-2'>
                    <Image src={logo} alt='logo' width='60' height='50' />
                    <div>
                        Sudoku Solver
                        <div className='fs-6'>
                            by @heytonyy
                        </div>
                    </div>
                </Navbar.Brand>

                {/* <Navbar.Toggle /> */}

                <Navbar.Collapse className='justify-content-end'>
                    <GithubCorner href='https://github.com/heytonyy/sudoku-solver' />
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default TopNavBar