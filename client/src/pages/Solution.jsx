import Button from 'react-bootstrap/Button'
import { useStateContext } from '../context/stateContext'
import { useNavigate } from 'react-router-dom'
import { Image, Col } from 'react-bootstrap'

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

const ResetButton = () => {
  const { dispatch } = useStateContext()
  const navigate = useNavigate()

  const handleReset = () => {
    dispatch({ type: 'RESET' })
    navigate('/')
  }

  return (
    <Button onClick={handleReset}>
      Reset
    </Button>
  )
}

const Solution = () => {
  const { state } = useStateContext()

  return (
    <div className='bg-container pt-5'>
      <Col xs={12} sm={6} md={4} lg={3} className='mx-auto mt-3'>
        <SolutionDisplay />
      </Col>
      <Col xs={6} sm={5} md={4} lg={3} className='mx-auto mt-3'>
        <h3 className='text-center'>Original Image</h3>
        <Image src={state.img} fluid alt='image' />
      </Col>
      <Col className='text-center mt-4'>
        <ResetButton />
      </Col>
    </div>
  )
}

export default Solution