import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Image, Row, Col } from 'react-bootstrap'
import { useStateContext } from '../context/stateContext'
import loader from '../assets/loader.svg'


const Loader = () => {
  const { state } = useStateContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (state.img) {
      if (!state.loading) {
        if (state.error) {
          navigate('/error')
        } else {
          navigate('/solution')
        }
      }
    } else {
      navigate('/')
    }
  }, [state.img, state.loading, state.error, navigate])

  return (
    <div className='bg-container'>
      {
        state.img &&
        <Row className='d-flex justify-content-center align-items-center h-100'>
          <Col className='text-center'>
            <h3>Calculating...</h3>
            <Image src={loader} fluid alt='loader' />
          </Col>
        </Row>
      }
    </div>
  )
}

export default Loader