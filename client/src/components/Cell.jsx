import { useState } from 'react'

const Cell = ({ value, status, coord, setSelectedCells }) => {
    const [active, setActive] = useState(false)

    const handleClickCell = () => {
        setActive(prev => !prev)
        if (active) {
            setSelectedCells(prev => prev.filter(cell => cell.coord[0] !== coord[0] && cell.coord[1] !== coord[1]))
            return
        }
        setSelectedCells(prev => [...prev, { value, status, coord }])
    }

    return (
        <td
            className={`${status === 'predicted' ? 'predicted-cell' : 'empty-cell'} ${active ? 'active-cell' : ''}`}
            onClick={handleClickCell}
        >
            {value}
        </td>
    )
}

export default Cell