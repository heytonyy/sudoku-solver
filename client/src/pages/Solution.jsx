import { Col, Row } from 'react-bootstrap'
import SolutionDisplay from '../components/SolutionDisplay'
import BugReport from '../components/BugReport'
import ImageDisplay from '../components/ImageDisplay'

const Solution = () => {

  return (
    <div className='bg-container'>
      <div className='center-content'>
        <Row>
          <Col xs={6} sm={6} md={4} className='mx-auto mt-3'>
            <ImageDisplay />
          </Col>
          <Col xs={12} sm={6} md={4} className='mx-auto mt-3'>
            <SolutionDisplay />
          </Col>
        </Row>
        <Col xs={12} className='mx-auto mt-3'>
          <BugReport />
        </Col>
      </div>
    </div>
  )
}

export default Solution