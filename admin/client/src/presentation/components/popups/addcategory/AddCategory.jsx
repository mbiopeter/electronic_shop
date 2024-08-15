import React, { useState } from 'react';
import './AddCategory.css';
import '../../../css/common.css';
import Layer from '../Layer';
import ImgPicker from '../addnewproduct/imgPicker/ImgPicker';
const AddCategory = ({
    handleHidePopUp,
    showAddNewProduct
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
            {showAddNewProduct && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`AddCategory popup-css ${showAddNewProduct ? 'show-category' : 'hide'}`}>
                <div className="AddCategory-title">
                    <span>ADD CATEGORY</span>
                </div>
                <div className="AddCategory-container">
                    <div className="AddCategory-container-img-container">
                        <ImgPicker 
                            label="Category"
                            selectedImage={selectedImages}
                            handleImageChange={handleImageChange}
                            handleCloseSelected = {handleCloseSelected}      
                        />
                    </div>
                    <input className='input-css' type="text" placeholder='Category Name' />
                    <div className="AddCategory-form-btn">
                        <button className="AddCategory-form-btn-item cancel">Cancel</button>
                        <button className="AddCategory-form-btn-item submit">Submit</button>
                    </div>                    
                </div>

            </div>
        </>
    )
}

export default AddCategory