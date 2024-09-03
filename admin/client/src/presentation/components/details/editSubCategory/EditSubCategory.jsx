import React from 'react';
import '../Edit.css';
import { Image } from 'primereact/image';
import { subCategories } from '../../../../data/subCategory/table_data';
import { useLocation } from 'react-router-dom';

const EditSubCategory = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const currentId = pathSegments[3];
    return (
        <div className='Edit'>
            <div className="editHeader">
                <span>{subCategories[currentId - 1].name} Details</span>
            </div>
            <div className="edit-img-container"> 
                <Image  className='edit-main-image ' src={subCategories[currentId - 1].img} alt="Image"  preview />  
            </div>
            <div className="edit-product-details-container">
                {subCategories.length > 0 && (
                    <>
                        <div className="edit-product-details-control" >
                            <div className="edit-desc-row">
                                <span className="edit-title">Name</span>
                            </div>
                            <div className="edit-desc-row">
                                <span className="edit-descrip">{subCategories[currentId - 1].name}</span>
                            </div>   
                        </div>                     
                        <div className="edit-product-details-control" >
                            <div className="edit-desc-row">
                                <span className="edit-title">Category</span>
                            </div>
                            <div className="edit-desc-row">
                                <span className="edit-descrip">{subCategories[currentId - 1].category}</span>
                            </div>   
                        </div>   
                    </>                  
                )}
            </div>
        </div>
    )
}

export default EditSubCategory