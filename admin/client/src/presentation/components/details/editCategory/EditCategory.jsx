import React from 'react';
import '../Edit.css';
import { editCategoryDetails, editCategoryImage } from '../../../../data/details/detailsData';
import { Image } from 'primereact/image';
import { useLocation } from 'react-router-dom';
import { categories } from '../../../../data/category/table_data';
const EditCategory = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const currentId = pathSegments[3];
    return (
        <div className='Edit'>
            <div className="editHeader">
                <span>{categories[currentId - 1].name} Details</span>
            </div>
            <div className="edit-img-container"> 
                <Image  className='edit-main-image ' src={categories[currentId - 1].img} alt="Image"  preview />  
            </div>
            <div className="edit-product-details-container">
                {categories.length >0 &&(
                    <div className="edit-product-details-control">
                        <div className="edit-desc-row">
                            <span className="edit-title">Name:</span>
                        </div>
                        <div className="edit-desc-row">
                            <span className="edit-descrip">{categories[currentId - 1].name}</span>
                        </div>   
                    </div>                     
                )}
            </div>
        </div>
    )
}

export default EditCategory