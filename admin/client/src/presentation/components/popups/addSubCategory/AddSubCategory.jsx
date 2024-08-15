import React, { useState } from 'react';
import './AddSubCategory.css';
import '../../../css/common.css';
import Layer from '../Layer';
import ImgPicker from '../addnewproduct/imgPicker/ImgPicker';
import { categories } from '../../../../data/category/table_data';
const AddSubCategory = ({
    handleHidePopUp,
    showAddSubCategory
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
            {showAddSubCategory && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`AddSubCategory popup-css ${showAddSubCategory ? 'show-sub-category' : 'hide'}`}>
                <div className="AddSubCategory-title">
                    <span>ADD SUB CATEGORY</span>
                </div>
                <div className="AddSubCategory-container">
                    <div className="AddSubCategory-container-img-container">
                        <ImgPicker 
                            label="Sub Category"
                            selectedImage={selectedImages}
                            handleImageChange={handleImageChange}
                            handleCloseSelected = {handleCloseSelected}      
                        />
                    </div>
                    <div className="AddSubCategory-input-container">
                        <select className='input-css'>
                            <option value="">Select Category</option>
                            {categories.map((category) =>(
                                <option value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <input className='input-css' type="text" placeholder='Sub Category Name' />
                    </div>
                    
                    <div className="AddSubCategory-form-btn">
                        <button className="AddSubCategory-form-btn-item cancel">Cancel</button>
                        <button className="AddSubCategory-form-btn-item submit">Submit</button>
                    </div>                    
                </div>

            </div>
        </>
    )
}

export default AddSubCategory