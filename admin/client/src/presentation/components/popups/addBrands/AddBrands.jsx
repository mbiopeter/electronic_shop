import React, { useState } from 'react';
import './AddBrands.css';
import '../../../css/common.css';
import Layer from '../Layer';
import ImgPicker from '../addnewproduct/imgPicker/ImgPicker';
import { subCategories } from '../../../../data/subCategory/table_data';
const AddBrands = ({
    handleHidePopUp,
    showAddBrands
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
            {showAddBrands && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`AddBrands popup-css ${showAddBrands ? 'show-brands' : 'hide'}`}>
                <div className="AddBrands-title">
                    <span>ADD BRAND</span>
                </div>
                <div className="AddBrands-container">
                    <div className="AddBrands-container-img-container">
                        <ImgPicker 
                            label="Brands"
                            selectedImage={selectedImages}
                            handleImageChange={handleImageChange}
                            handleCloseSelected = {handleCloseSelected}      
                        />
                    </div>
                    <div className="AddBrands-input-container">
                        <select className='input-css'>
                            <option value="">Select Sub Category</option>
                            {subCategories.map((subCategories) =>(
                                <option value={subCategories.id}>{subCategories.name}</option>
                            ))}
                        </select>
                        <input className='input-css' type="text" placeholder='Brand Name' />
                    </div>
                    
                    <div className="AddBrands-form-btn">
                        <button className="AddBrands-form-btn-item cancel">Cancel</button>
                        <button className="AddBrands-form-btn-item submit">Submit</button>
                    </div>                    
                </div>

            </div>
        </>
    )
}

export default AddBrands