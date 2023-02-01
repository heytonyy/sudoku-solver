import { Image, Col } from 'react-bootstrap'
import { useStateContext } from '../context/stateContext'
import SolutionDisplay from '../components/SolutionDisplay'
import ResetButton from '../components/ResetButton'

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