import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col } from 'react-bootstrap'

const CatchAllError = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }, [navigate])

  return (
    <div className='bg-container'>
      <div className='center-content'>
        <Col xs={12} className='mx-auto text-light'>
          <h1>404 Error</h1>
          <h3>Redirecting to home page...</h3>
        </Col>
      </div>
    </div>
  )
}

export default CatchAllError