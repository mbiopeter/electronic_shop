import React, { useEffect, useState } from 'react';
import './AddSubCategory.css';
import '../../../css/common.css';
import Layer from '../Layer';
import ImgPicker from '../addnewproduct/imgPicker/ImgPicker';
import DropdownDemo from '../../global/select/Select';
import { useLocation } from 'react-router-dom';
import { categoriesUrl } from '../../../../logical/consts/apiUrl';
import { handleFetchAllCategories } from '../../../../logical/category/fetch';
import { ToastContainer, toast } from 'react-toastify';
import { addSubCategory } from '../../../../logical/subCategory/AddSubCategory';

const AddSubCategory = ({
    handleHidePopUp,
    showAddSubCategory,
    reload,
    setReload
}) => {
    const[currentPage,setCurrentPage] = useState();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    
    useEffect(() => {
        if(pathSegments[1] === 'subCategory' && pathSegments[2] === 'details'){
            setCurrentPage(pathSegments[1]);
        }
    },[]);

    const [selectedImages, setSelectedImages] = useState();
    const [categories, setCategories] = useState([]);
    const [categoriesNames, setCategoriesNames] = useState([]);
    const [categoryValue, setCategoriesValue] = useState('');
    const [categoryItem, setCategoryItem] = useState([]);

    const [subCategoryName,setSubCategoryName] = useState(null);

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
    };

    useEffect(() => {
        // Get categories data
        const getAllCategories = async () => {
            try {
                const usersData = await handleFetchAllCategories(categoriesUrl, 'all');
                setCategories(usersData); 
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        getAllCategories();
    }, []);

    // Update category names when categories state changes
    useEffect(() => {
        if (categories.length > 0) {
            const categoryNames = categories.map((category) => category.name);
            setCategoriesNames(categoryNames);
        }
    }, [categories]);

    const uploadnewSubCategory = async () => {
        try{
            const newResponse = await addSubCategory(
                subCategoryName,
                categoryValue,
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
            <ToastContainer/>
            {showAddSubCategory && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`AddSubCategory popup-css ${showAddSubCategory ? 'show-sub-category' : 'hide'}`}>
                <div className="AddSubCategory-title">
                    <span>{currentPage === 'subCategory' 
                        ? 'EDIT SUB CATEGORY' 
                        : 'ADD SUB CATEGORY'}
                    </span>
                </div>
                <div className="AddSubCategory-container">
                    <div className="AddSubCategory-container-img-container">
                        <ImgPicker 
                            label="Sub Category"
                            selectedImage={selectedImages}
                            handleImageChange={handleImageChange}
                            handleCloseSelected={handleCloseSelected}      
                        />
                    </div>
                    <div className="AddSubCategory-input-container">
                        <DropdownDemo
                            width={'100%'}
                            allItems={categoriesNames}
                            placeholder={'Select Category'}
                            value={categoryValue}
                            setValue={setCategoriesValue}
                            items={categoryItem}
                            setItems={setCategoryItem}
                        />
                        <input className='input-css' type="text" placeholder='Sub Category Name' onChange={(e) => setSubCategoryName(e.target.value)} value={subCategoryName}/>
                    </div>
                    <div className="AddSubCategory-form-btn">
                        <button className="AddSubCategory-form-btn-item cancel">Cancel</button>
                        <button className="AddSubCategory-form-btn-item submit" onClick={uploadnewSubCategory}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddSubCategory;
