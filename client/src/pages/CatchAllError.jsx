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
    <div className='bg-container pt-5'>
      <Col xs={10} sm={8} md={6} className='mx-auto mt-5'>
        <h1>404 Error</h1>
        <h3>Redirecting to home page...</h3>
      </Col>
    </div>
  )
}

export default CatchAllError