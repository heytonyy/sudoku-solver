import { useEffect, useRef } from 'react'
import { useStateContext } from '../context/stateContext'
import { useNavigate } from 'react-router-dom'
import { Col, Card, Image, Button, Form } from 'react-bootstrap'

const Header = () => {
  return (
    <>
      <h1>Sudoku Solver</h1>
      <p>by heytonyyy</p>
      <p>
        Upload an image of a sudoku puzzle and the app will solve it for you!
        This app uses a Python Flask server to process the image with OpenCV and PyTessaract, then uses a backtracking algorithm to solve the puzzle.
      </p>
    </>
  )
}

const ImageForm = () => {
  const { state, dispatch } = useStateContext()
  const formRef = useRef()
  const navigate = useNavigate()

  const handleImageDisplay = (e) => {
    e.preventDefault()
    if (!e.target.files[0]) {
      dispatch({ type: 'SET_IMG', payload: null })
      return;
    }
    dispatch({
      type: 'SET_IMG',
      payload: URL.createObjectURL(e.target.files[0])
    })
  }

  const apiCall = (formData) => {
    const url = 'http://localhost:5000'

    fetch(`${url}/api/sudoku_grid`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network Error')
        }
        return res.json()
      })
      .then((data) => {
        // data from flask api
        dispatch({ type: 'SET_SOLUTION', payload: data })
        dispatch({ type: 'SET_LOADING', payload: false })
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'SET_ERROR', payload: err })
        dispatch({ type: 'SET_LOADING', payload: false })
      });
  }

  const handleFormRequest = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', e.target[0].files[0])

    dispatch({ type: 'SET_LOADING', payload: true })
    navigate('/loading')

    apiCall(formData)
  }

  useEffect(() => {
    formRef.current.value = null
  }, [state.clearForm])

  return (
    <Card className='p-2'>
      {
        state.img &&
        <Image src={state.img} fluid alt="uploaded display" />
      }
      <Form onSubmit={handleFormRequest} className='p-2'>
        <Form.Group>
          <Form.Control
            ref={formRef}
            type="file"
            accept="image/*"
            capture
            className='form-control'
            onChange={handleImageDisplay}
          />
          <Form.Text className="text-muted">
            Supported formats: .jpg, .png, .heic
          </Form.Text>
        </Form.Group>
        {
          state.img &&
          <Form.Group>
            <Button type='submit' className='mt-3'>
              Get Solution
            </Button>
          </Form.Group>
        }
      </Form>
    </Card>
  )
}

const Home = () => {
  return (
    <div className='bg-container pt-5'>
      <Col xs={10} sm={9} md={8} lg={7} className='mx-auto'>
        <Header />
      </Col>
      <Col xs={8} sm={6} md={5} lg={3} className='mx-auto'>
        <ImageForm />
      </Col>
    </div>
  )
}

export default Home