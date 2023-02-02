import { Col } from 'react-bootstrap'
import Header from '../components/Header'
import ImageFormUpload from '../components/ImageFormUpload'

const Home = () => {
  return (
    <div className='bg-container'>
      <div className='center-content'>
        <Col xs={10} sm={9} md={8} lg={7} className='mx-auto'>
          <Header />
        </Col>
        <Col xs={8} sm={6} md={4} lg={3} className='mx-auto'>
          <ImageFormUpload />
        </Col>
      </div>
    </div>
  )
}

export default Home