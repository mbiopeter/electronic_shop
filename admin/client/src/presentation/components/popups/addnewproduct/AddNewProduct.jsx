import React, { useState } from 'react'
import './AddNewProduct.css';
import '../../../css/common.css';
import Layer from '../Layer';
import ImgPicker from './imgPicker/ImgPicker';
import { add_new_product_data } from '../../../../data/popup/newProduct';
import { categories } from '../../../../data/category/table_data';
const AddNewProduct = ({
    handleHidePopUp,
    showAddNewProduct
}) => {

    const [selectedImages, setSelectedImages] = useState({});

    const handleImageChange = (event, id) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImages(prevState => ({
                    ...prevState,
                    [id]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCloseSelected = (id) => {
        setSelectedImages(prevState => ({
            ...prevState,
            [id]: null,
        }));
    }

    return (
        <>
            {showAddNewProduct && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`AddNewProducts popup-css ${showAddNewProduct ? 'show-addProduct' : 'hide'}`}>
                <div className="AddNewProducts-title">
                    <span>ADD PRODUCT</span>
                </div>
                <div className="AddNewProducts-container">
                    <div className="AddNewProducts-container-img-container">
                        {add_new_product_data.map((input) => (
                            <ImgPicker 
                                key={input.id}
                                id = {input.id}
                                label={input.label}
                                selectedImage={selectedImages[input.id]}
                                handleImageChange={handleImageChange}
                                handleCloseSelected = {handleCloseSelected}
                            />
                        ))}
                    </div>
                    <div className="AddNewProducts-form-one">
                        <input className='input-css' type="text" placeholder='Product Name'/>
                        <textarea  rows={4} placeholder='Product Name'></textarea>
                    </div>
                    <div className="AddNewProducts-form-two">
                        <select className='input-css' name="" id="">
                            <option value="" selected>Select Category</option>
                            {categories.map((category) => (
                                <option value={category.name} >{category.name}</option>
                            ))}
                        </select>
                        <select className='input-css' name="" id="">
                            <option value="" selected>Select Sub Category</option>
                            {categories.map((category) => (
                                <option value={category.name} >{category.name}</option>
                            ))}
                        </select>
                        <select className='input-css' name="" id="">
                            <option value="" selected>Select Brand</option>
                            {categories.map((category) => (
                                <option value={category.name} >{category.name}</option>
                            ))}
                        </select>
                        <input className='input-css' type="text" placeholder='Price' />
                        <input className='input-css' type="text" placeholder='Offer Price' />
                        <input className='input-css' type="text" placeholder='Quantity' />
                    </div>
                    <div className="AddNewProducts-form-three">
                        <select className='input-css' name="" id="">
                            <option value="" selected>Select Varient Type</option>
                            {categories.map((category) => (
                                <option value={category.name} >{category.name}</option>
                            ))}
                        </select>
                        <select className='input-css' name="" id="">
                            <option value="" selected>Select Items</option>
                            {categories.map((category) => (
                                <option value={category.name} >{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="AddNewProducts-form-btn">
                        <button className="AddNewProducts-form-btn-item cancel">Cancel</button>
                        <button className="AddNewProducts-form-btn-item submit">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNewProduct