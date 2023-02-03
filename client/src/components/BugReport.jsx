import { Container } from "react-bootstrap"
import BugReportButton from "./BugReportButton"

const BugReport = () => {
    return (
        <Container className="text-light text-center">
            <h3>Bug Report</h3>
            <p>
                Click on cells that were not predicted corrently to submit a bug report.
            </p>
            <BugReportButton />
        </Container>
    )
}

export default BugReport