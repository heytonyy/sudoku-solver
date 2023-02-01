import { useStateContext } from '../context/stateContext'

const SolutionDisplay = () => {
    const { state } = useStateContext()

    return (
        <table className='mx-auto'>
            <thead>
                <tr className='text-center border-header'>
                    <th colSpan='9'>Solution</th>
                </tr>
            </thead>
            <tbody>
                {
                    state.solution.map((row, i) => {
                        return (
                            <tr key={i}>
                                {
                                    row.map((col, j) => {
                                        return (
                                            <td key={j} style={{ backgroundColor: col[1] === 'predicted' ? 'lightblue' : 'white' }}>
                                                {col[0]}
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default SolutionDisplay