import { useStateContext } from "../context/stateContext"
import { Col } from 'react-bootstrap'
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
      <div className="center-content">
        {
          state.error &&
          <Col xs={12} className='mx-auto text-center text-light'>
            <span>Error: {state.error.message}</span>
          </Col>
        }
      </div>
    </div>
  )
}

export default Error