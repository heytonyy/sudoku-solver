import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/stateContext'
import axios from 'axios'

const BugReportButton = () => {
    const { state } = useStateContext()
    const navigate = useNavigate()

    const handleSubmitBug = (e) => {
        e.preventDefault()
        apiCall()
    }

    const apiCall = () => {
        const url = 'http://localhost:5000'

        const formData = new FormData()
        formData.append('file', new File([state.img], 'bug_report', { type: 'image/png' }))
        // formData.append('solution', state.solution)
        // formData.append('reported_cells', [])
        // formData.append('created_at', new Date().toISOString())
        console.log(formData)

        axios.post(`${url}/api/bugs`, formData)
            .then((res) => {
                console.log(res);
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Button onClick={handleSubmitBug}>
            Submit Bug Report
        </Button>
    )
}

export default BugReportButton