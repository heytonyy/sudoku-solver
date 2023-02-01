import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useStateContext } from '../context/stateContext'

const ResetButton = () => {
    const { dispatch } = useStateContext()
    const navigate = useNavigate()

    const handleReset = () => {
        dispatch({ type: 'RESET' })
        navigate('/')
    }

    return (
        <Button onClick={handleReset}>
            Reset
        </Button>
    )
}

export default ResetButton