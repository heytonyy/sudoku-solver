import { useState, useEffect } from 'react'
import { useStateContext } from '../context/stateContext'
import { Container } from 'react-bootstrap/'
import Cell from './Cell'

const SolutionDisplay = () => {
    const { state } = useStateContext()
    const [selectedCells, setSelectedCells] = useState([])

    useEffect(() => {
        console.log(selectedCells)
    }, [selectedCells])


    return (
        <Container>
            <h1 className='text-center text-light'>Solution</h1>
            <table className='mx-auto'>
                <tbody>
                    {
                        state.solution.map((row, i) => {
                            return (
                                <tr key={i}>
                                    {
                                        row.map((col, j) => {
                                            return (
                                                <Cell
                                                    key={j}
                                                    value={col[0]}
                                                    status={col[1]}
                                                    coord={[i, j]}
                                                    setSelectedCells={setSelectedCells}
                                                />
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </Container>
    )
}

export default SolutionDisplay