import React, { useEffect, useState } from 'react';
import './AddBrands.css';
import '../../../css/common.css';
import Layer from '../Layer';
import ImgPicker from '../addnewproduct/imgPicker/ImgPicker';
import { ToastContainer, toast } from 'react-toastify';
import DropdownDemo from '../../global/select/Select';
import { useLocation } from 'react-router-dom';
import { brandsUrl, subCategoriesUrl } from '../../../../logical/consts/apiUrl';
import { addBrand } from '../../../../logical/brand/AddBrand';
import { handleFetchAllSubCategories } from '../../../../logical/subCategory/fetch';
const AddBrands = ({
    handleHidePopUp,
    showAddBrands,
    setReload,
    reload
}) => {
    const [brandName,setBrandName] = useState(null);

    const location = useLocation();
    const pathSegments = location.pathname.split('/');
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

    const[subCategories,setSubCategories] = useState([]);
    useEffect(() => {
        // Get categories data
        const getAllSubCategories = async () => {
            try {
                const usersData = await handleFetchAllSubCategories(subCategoriesUrl, 'all');
                setSubCategories(usersData); 
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        getAllSubCategories();
    }, []);

    // Update sub category names when subCategories state changes
    useEffect(() => {
        if (subCategories.length > 0) {
            const subCategoryNames = subCategories.map((subCategory) => subCategory.name);
            setSubCategoriesNames(subCategoryNames);
        }
    }, [subCategories]);
    const uploadNewBrand = async () => {
        try{
            const newResponse = await addBrand(
                brandName,
                subCategoryValue,
                selectedImages
            );
            console.log(newResponse);
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
            {showAddBrands && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`AddBrands popup-css ${showAddBrands ? 'show-brands' : 'hide'}`}>
                <div className="AddBrands-title">
                    <span>{pathSegments[2] === 'details' ? 'EDIT BRANDS' :'ADD BRAND'}</span>
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
                        <input className='input-css' type="text" placeholder='Brand Name' onChange={(e) => setBrandName(e.target.value)} value={brandName}/>
                    </div>
                    
                    <div className="AddBrands-form-btn">
                        <button className="AddBrands-form-btn-item cancel">Cancel</button>
                        {pathSegments[2] === 'details' ? (
                            <button className="AddBrands-form-btn-item submit">Submit</button>
                        ):(
                            <button className="AddBrands-form-btn-item submit" onClick={uploadNewBrand}>Submit</button> 
                        )}
                    </div>                    
                </div>

            </div>
        </>
    )
}

export default AddBrands