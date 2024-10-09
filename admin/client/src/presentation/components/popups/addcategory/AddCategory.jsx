import React, { useEffect, useState } from 'react';
import './AddCategory.css';
import '../../../css/common.css';
import Layer from '../Layer';
import ImgPicker from '../addnewproduct/imgPicker/ImgPicker';
import { useLocation } from 'react-router-dom';
import { addCategory } from '../../../../logical/category/Addcategory';
import { ToastContainer, toast } from 'react-toastify';
const AddCategory = ({
    handleHidePopUp,
    showAddNewProduct,
    reload,
    setReload
}) => {

    const[currentPage,setCurrentPage] = useState();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    
    useEffect(() => {
        if(pathSegments[1] === 'category' && pathSegments[2] === 'details'){
            setCurrentPage(pathSegments[2])
        }
        
    },[])
    const [selectedImages, setSelectedImages] = useState(null);
    const [categoryName, setCategoryName] = useState('');


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
    const uploadnewCategory = async () => {
        try{
            const newResponse = await addCategory(
                categoryName,
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
            {showAddNewProduct && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`AddCategory popup-css ${showAddNewProduct ? 'show-category' : 'hide'}`}>
                <div className="AddCategory-title">
                    <span>{currentPage === 'details' ? 'EDIT CATEGORY' : 'ADD CATEGORY'}</span>
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
                    <input className='input-css' type="text" placeholder='Category Name' value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
                    <div className="AddCategory-form-btn">
                        <button className="AddCategory-form-btn-item cancel">Cancel</button>
                        {currentPage === 'details' 
                        ?<button className="AddCategory-form-btn-item submit">Submit</button>
                        :<button className="AddCategory-form-btn-item submit" onClick={uploadnewCategory}>Submit</button>}
                    </div>                    
                </div>

            </div>
        </>
    )
}

export default AddCategory