import React, { useEffect, useState } from 'react';
import './SendEmail.css';
import '../../../css/common.css';
import Layer from '../Layer';
import ImgPicker from '../addnewproduct/imgPicker/ImgPicker';
import { subCategories } from '../../../../data/subCategory/table_data';
import DropdownDemo from '../../global/select/Select';
const SendEmail = ({
    handleHidePopUp,
    showSendEmail
}) => {

    const [selectedImages, setSelectedImages] = useState();

    //set Image
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
    //unset Image
    const handleCloseSelected = (id) => {
        setSelectedImages(null);
    }

    return (
        <>
            {showSendEmail && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`SendEmail popup-css ${showSendEmail ? 'show-brands' : 'hide'}`}>
                <div className="SendEmail-title">
                    <span>SEND EMAIL</span>
                </div>
                <div className="SendEmail-container">
                    <div className="SendEmail-container-img-container">
                        <ImgPicker 
                            label="Attachment"
                            selectedImage={selectedImages}
                            handleImageChange={handleImageChange}
                            handleCloseSelected = {handleCloseSelected}      
                        />
                    </div>
                    <input className='input-css' type="text" placeholder='From' />
                    <div className="SendEmail-input-container">
                        <input className='input-css' type="text" placeholder='To' />
                        <input className='input-css' type="text" placeholder='Copy To' />
                        
                    </div>
                    <div className="SendEmail-input-container-textarea">
                        <textarea  className='input-css' ></textarea>
                    </div>
                    <div className="SendEmail-form-btn">
                        <button onClick={handleHidePopUp} className="SendEmail-form-btn-item cancel">Cancel</button>
                        <button className="SendEmail-form-btn-item submit">Send</button>
                    </div>                    
                </div>

            </div>
        </>
    )
}

export default SendEmail