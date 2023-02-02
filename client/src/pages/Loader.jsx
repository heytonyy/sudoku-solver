import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Image, Col } from 'react-bootstrap'
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
      <div className='center-content'>
        {
          state.img &&
          <Col xs={12} className='mx-auto text-center text-light'>
            <h1>Calculating...</h1>
            <Image src={loader} fluid alt='loader' />
          </Col>
        }
      </div>
    </div>
  )
}

export default Loader