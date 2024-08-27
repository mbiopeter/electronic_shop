import React, { useEffect, useState } from 'react';
import './AddBrands.css';
import '../../../css/common.css';
import Layer from '../Layer';
import ImgPicker from '../addnewproduct/imgPicker/ImgPicker';
import { subCategories } from '../../../../data/subCategory/table_data';
import DropdownDemo from '../../global/select/Select';
const AddBrands = ({
    handleHidePopUp,
    showAddBrands
}) => {
    const [selectedImages, setSelectedImages] = useState();
    //sub categories state
    const [subCategoriesNames, setSubCategoriesNames] = useState([]);
    const [subCategoryValue,setSubCategoriesValue] = useState('');
    const [subCategoryItem,setSubCategoryItem] = useState([]);
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
    useEffect(()=> {
        //set sub categories Names
        subCategories.map((subCategoryName) =>{
            setSubCategoriesNames(prevState => ([
                ...prevState,
                subCategoryName.name
            ]));
        });
    },[])
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
                        <DropdownDemo
                            width={'100%'}
                            allItems = {subCategoriesNames}
                            placeholder={'Select Sub Category'}
                            value={subCategoryValue}
                            setValue={setSubCategoriesValue}
                            items={subCategoryItem}
                            setItems={setSubCategoryItem}
                        />
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