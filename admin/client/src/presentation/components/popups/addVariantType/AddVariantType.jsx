import React, { useState } from 'react';
import './AddVariantType.css';
import '../../../css/common.css';
import Layer from '../Layer';
import ImgPicker from '../addnewproduct/imgPicker/ImgPicker';
const AddVariantType = ({
    handleHidePopUp,
    showAddVariantType
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
            {showAddVariantType && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`AddVariantType popup-css ${showAddVariantType ? 'show-variant' : 'hide'}`}>
                <div className="AddVariantType-title">
                    <span>ADD VARIANT TYPE</span>
                </div>
                <div className="AddVariantType-container">
                    <div className="AddVariantType-container-img-container">
                        <ImgPicker 
                            label="Category"
                            selectedImage={selectedImages}
                            handleImageChange={handleImageChange}
                            handleCloseSelected = {handleCloseSelected}      
                        />
                    </div>
                    <input className='input-css' type="text" placeholder='Variant Type' />
                    <div className="AddVariantType-form-btn">
                        <button className="AddVariantType-form-btn-item cancel">Cancel</button>
                        <button className="AddVariantType-form-btn-item submit">Submit</button>
                    </div>                    
                </div>

            </div>
        </>
    )
}

export default AddVariantType