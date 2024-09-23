import React, { useState } from 'react';
import './AddUsers.css';
import '../../../css/common.css';
import '../../../css/variables.css';
import Layer from '../Layer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usersUrl } from '../../../../logical/consts/apiUrl';
import { handleAddDetails } from '../../../../logical/consts/add';

const AddUsers = ({ 
    showAddUsers, 
    handleHidePopUp,
    setReload,
    reload
}) => {


    const [userDetails, setUserDetails] = useState({
        username: '',
        firstName: '',
        secondName: '',
        idNumber: null,
        phoneNumber: null
    });

    const handleAddUserOnchange = (key, value) => {
        setUserDetails(prev => ({
            ...prev,
            [key]: key === 'idNumber' || key === 'phoneNumber' ? parseInt(value) || '' : value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await handleAddDetails(userDetails,usersUrl,'register');
            setReload(!reload)
            toast.success(response.message); 

        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };
    

    return (
        <>
            {showAddUsers && (
                <Layer handleHidePopUp={handleHidePopUp} />
            )}
            <div className={`AddUsersPopUp popup-css ${showAddUsers ? 'show-AddUsersPopUp' : 'hide'}`}>
                <div className="AddUsersPopUp-title">
                    <span>ADD USERS</span>
                </div>
                <div className="AddUsersPopUp-container">
                    <input
                        type="text"
                        placeholder="Username"
                        style={{ marginBottom: 'var(--container-padding)' }}
                        className="input-css"
                        value={userDetails.username}
                        onChange={(e) => handleAddUserOnchange('username', e.target.value)}
                    />
                    <div className="AddUsersPopUp-inputs">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="input-css"
                            value={userDetails.firstName}
                            onChange={(e) => handleAddUserOnchange('firstName', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Second Name"
                            className="input-css"
                            value={userDetails.secondName}
                            onChange={(e) => handleAddUserOnchange('secondName', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="ID Number"
                            className="input-css"
                            value={userDetails.idNumber}
                            onChange={(e) => handleAddUserOnchange('idNumber', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="input-css"
                            value={userDetails.phoneNumber}
                            onChange={(e) => handleAddUserOnchange('phoneNumber', e.target.value)}
                        />
                    </div>

                    <div className="AddUsersPopUp-form-btn">
                        <button className="AddUsersPopUp-form-btn-item cancel" onClick={handleHidePopUp}>Cancel</button>
                        <button onClick={handleSubmit} className="AddUsersPopUp-form-btn-item submit">Submit</button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
};

export default AddUsers;
