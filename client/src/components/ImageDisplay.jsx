import { Container, Image } from 'react-bootstrap'
import { useStateContext } from '../context/stateContext'

const ImageDisplay = () => {
    const { state } = useStateContext()

    return (
        <Container>
            <h1 className='text-center text-light'>Image</h1>
            <Image src={state.img} fluid alt='image' />
        </Container>
    )
}

export default ImageDisplay