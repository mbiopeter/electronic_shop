import React, { useEffect, useState } from 'react';
import './AddSubCategory.css';
import '../../../css/common.css';
import Layer from '../Layer';
import ImgPicker from '../addnewproduct/imgPicker/ImgPicker';
import { categories } from '../../../../data/category/table_data';
import DropdownDemo from '../../global/select/Select';
import { useLocation } from 'react-router-dom';
const AddSubCategory = ({
    handleHidePopUp,
    showAddSubCategory
}) => {
    const[currentPage,setCurrentPage] = useState();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    
    useEffect(() => {
        if(pathSegments[1] === 'subCategory' && pathSegments[2] === 'details'){
            setCurrentPage(pathSegments[1])
        }
        
    },[])
    const [selectedImages, setSelectedImages] = useState();
    //categories state
    const [categoriesNames, setCategoriesNames] = useState([]);
    const [categoryValue,setCategoriesValue] = useState('');
    const [categoryItem,setCategoryItem] = useState([]);

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

    useEffect(()=> {
        //set categories Names
        categories.map((categoryName) =>{
            setCategoriesNames(prevState => ([
                ...prevState,
                categoryName.name
            ]));
        });
    },[])
    return (
        <>
            {showAddSubCategory && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`AddSubCategory popup-css ${showAddSubCategory ? 'show-sub-category' : 'hide'}`}>
                <div className="AddSubCategory-title">
                    <span>{currentPage === 'subCategory' 
                        ? 'EDIT SUB CATEGORY' 
                        :'ADD SUB CATEGORY'}
                        </span>
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
                        <DropdownDemo
                            width={'100%'}
                            allItems = {categoriesNames}
                            placeholder={'Select Category'}
                            value={categoryValue}
                            setValue={setCategoriesValue}
                            items={categoryItem}
                            setItems={setCategoryItem}
                        />
                        <input className='input-css' type="text" placeholder='Sub Category Name' />
                    </div>
                    
                    <div className="AddSubCategory-form-btn">
                        <button className="AddSubCategory-form-btn-item cancel">Cancel</button>
                        {currentPage === 'subCategory'
                            ?<button className="AddSubCategory-form-btn-item submit">Submit</button>
                            :<button className="AddSubCategory-form-btn-item submit">Submit</button>
                        }
                    </div>                    
                </div>

            </div>
        </>
    )
}

export default AddSubCategory