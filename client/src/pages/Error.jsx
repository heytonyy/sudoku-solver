import { useStateContext } from "../context/stateContext"
import { Row, Col } from 'react-bootstrap'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const { state } = useStateContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!state.error) {
      navigate('/')
    }
  }, [state.error, navigate])


  return (
    <div className="bg-container">
      {
        state.error &&
        <Row className='d-flex justify-content-center align-items-center h-100'>
          <Col sm={6} md={6} className='text-center'>
            <span>Error: {state.error.message}</span>
          </Col>
        </Row>
      }
    </div>
  )
}

export default Error