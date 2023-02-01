import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Card, Image, Button, Form } from 'react-bootstrap'
import { useStateContext } from '../context/stateContext'

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
        const url = 'https://sudoku-solver.herokuapp.com'

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

export default ImageForm