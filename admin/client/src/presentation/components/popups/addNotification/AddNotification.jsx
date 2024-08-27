import React, { useEffect, useState } from 'react'
import './AddNotification.css';
import '../../../css/common.css';
import '../../../css/variables.css';
import Layer from '../Layer';
import ImgPicker from '../addnewproduct/imgPicker/ImgPicker';
const AddNotification = ({
    showAddNotification,
    handleHidePopUp,
}) => {
    const [selectedImages, setSelectedImages] = useState();

    const handleImageChange = (event, id) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImages(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCloseSelected = (id) => {
        setSelectedImages(null);
    }

    const handleSubmit = () => {

    }
    return (
        <>
        {showAddNotification && (
            <Layer handleHidePopUp={handleHidePopUp}/>
        )}
        <div className={`AddNotificationPopUp popup-css ${showAddNotification ? 'show-AddNotificationPopUp' : 'hide'}`}>
            <div className="AddNotificationPopUp-title">
                <span>SEND NOTIFICATION</span>
            </div>
            <div className="AddNotificationPopUp-container">
                <div className="AddNotificationPopUp-container-img-container">
                    <ImgPicker
                        label="Image"
                        selectedImage={selectedImages}
                        handleImageChange={handleImageChange}
                        handleCloseSelected = {handleCloseSelected}      
                    />
                </div>
                <div className="AddNotificationPopUp-inputs">
                    <input type="text" className='input-css' placeholder="Enter Notification Tiltle..." />
                    <textarea className='input-css' placeholder="Enter Notification Tiltle..." ></textarea>                
                </div>


                <div className="AddNotificationPopUp-form-btn">
                    <button className="AddNotificationPopUp-form-btn-item cancel">Cancel</button>
                    <button onClick={handleSubmit} className="AddNotificationPopUp-form-btn-item submit">Submit</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default AddNotification