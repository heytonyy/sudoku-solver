import { Image, Col, Row } from 'react-bootstrap'
import { useStateContext } from '../context/stateContext'
import SolutionDisplay from '../components/SolutionDisplay'
import ResetButton from '../components/ResetButton'

const Solution = () => {
  const { state } = useStateContext()

  return (
    <div className='bg-container'>
      <div className='center-content'>
        <Row>
          <Col xs={12} sm={6} md={4} className='mx-auto mt-3'>
            <h3 className='text-center text-light'>Solution</h3>
            <SolutionDisplay />
          </Col>
          <Col xs={6} sm={6} md={4} className='mx-auto mt-3'>
            <h3 className='text-center text-light'>Original Image</h3>
            <Image src={state.img} fluid alt='image' />
          </Col>
        </Row>
        <Col xs={12} className='text-center mt-5'>
          <ResetButton />
        </Col>
      </div>
    </div>
  )
}

export default Solution