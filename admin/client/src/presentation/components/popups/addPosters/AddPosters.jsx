import React, { useState } from 'react';
import './AddPosters.css';
import '../../../css/common.css';
import Layer from '../Layer';
import ImgPicker from '../addnewproduct/imgPicker/ImgPicker';
const AddPosters = ({
    handleHidePopUp,
    showAddPosters
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
    return (
        <>
            {showAddPosters && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`AddPosters popup-css ${showAddPosters ? 'show-posters' : 'hide'}`}>
                <div className="AddPosters-title">
                    <span>ADD POSTER</span>
                </div>
                <div className="AddPosters-container">
                    <div className="AddPosters-container-img-container">
                        <ImgPicker 
                            label="Poster"
                            selectedImage={selectedImages}
                            handleImageChange={handleImageChange}
                            handleCloseSelected = {handleCloseSelected}      
                        />
                    </div>
                    <input className='input-css' type="text" placeholder='Poster Category' />
                    <div className="AddPosters-form-btn">
                        <button className="AddPosters-form-btn-item cancel">Cancel</button>
                        <button className="AddPosters-form-btn-item submit">Submit</button>
                    </div>                    
                </div>

            </div>
        </>
    )
}

export default AddPosters