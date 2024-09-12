import React, { useEffect, useState } from 'react'
import './AddUsers.css';
import '../../../css/common.css';
import '../../../css/variables.css';
import Layer from '../Layer';
const AddUsers = ({
    showAddUsers,
    handleHidePopUp,
}) => {

    const handleSubmit = () => {

    }
    return (
        <>
        {showAddUsers && (
            <Layer handleHidePopUp={handleHidePopUp}/>
        )}
        <div className={`AddUsersPopUp popup-css ${showAddUsers ? 'show-AddUsersPopUp' : 'hide'}`}>
            <div className="AddUsersPopUp-title">
                <span>ADD USERS</span>
            </div>
            <div className="AddUsersPopUp-container">
                <input type="text" placeholder="Username" style={{marginBottom:'var(--container-padding)'}} className="input-css" />
                <div className="AddUsersPopUp-inputs">
                    <input type="text" placeholder="First Name" className="input-css" />
                    <input type="text" placeholder="Second Name" className="input-css" />
                    
                    <input type="text" placeholder="ID Number" className="input-css" />            
                    <input type="text" placeholder="Phone Number" className="input-css" />            
        
                </div>
                <div className="AddUsersPopUp-form-btn">
                    <button className="AddUsersPopUp-form-btn-item cancel">Cancel</button>
                    <button onClick={handleSubmit} className="AddUsersPopUp-form-btn-item submit">Submit</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default AddUsers