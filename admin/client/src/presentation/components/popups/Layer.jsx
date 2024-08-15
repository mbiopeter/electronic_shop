import React from 'react'
import './Layer.css';
const Layer = ({
    handleHidePopUp
}) => {
    return (
        <div className='layer' onClick={handleHidePopUp}>

        </div>
    )
}

export default Layer