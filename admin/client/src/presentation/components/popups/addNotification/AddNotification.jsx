import React, { useEffect, useState } from 'react'
import './AddNotification.css';
import '../../../css/common.css';
import '../../../css/variables.css';
import Layer from '../Layer';
import ImgPicker from '../addnewproduct/imgPicker/ImgPicker';
import { addNotification } from '../../../../logical/notification/AddNotification';
import { ToastContainer, toast } from 'react-toastify';
const AddNotification = ({
    showAddNotification,
    handleHidePopUp,
    setReload,
    reload
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

    const[notificationName,setNotificationName] = useState();
    const[notificationDescription,setNotificationDescription] = useState();
    const uploadnewPoster = async () => {
        try{
            const newResponse = await addNotification(
                notificationName,
                notificationDescription,
                selectedImages
            );
            if(newResponse.type === 'error'){
                toast.error(newResponse.message); 
            }
            else{
                toast.success(newResponse.message); 
                setReload(!reload);
            }
        }catch(err) {
            toast.error(err);
        }
    };
    return (
        <>
        <ToastContainer />
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
                    <input onChange={(e) => setNotificationName(e.target.value)} value ={notificationName} type="text" className='input-css' placeholder="Enter Notification Tiltle..." />
                    <textarea onChange={(e) => setNotificationDescription(e.target.value)} value ={notificationDescription}className='input-css' placeholder="Enter Notification Tiltle..." ></textarea>                
                </div>


                <div className="AddNotificationPopUp-form-btn">
                    <button className="AddNotificationPopUp-form-btn-item cancel">Cancel</button>
                    <button onClick={uploadnewPoster} className="AddNotificationPopUp-form-btn-item submit">Submit</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default AddNotification