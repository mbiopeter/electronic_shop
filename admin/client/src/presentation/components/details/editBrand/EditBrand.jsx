import React from 'react';
import '../Edit.css';
import { Image } from 'primereact/image';
import { editBrandDetails, editBrandImage } from '../../../../data/details/detailsData';
import { useLocation } from 'react-router-dom';
import { brands } from '../../../../data/brands/table_data';

const EditBrand = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const currentId = pathSegments[3];
    return (
        <div className='Edit'>
            <div className="editHeader">
                <span>MOBILE DETAILS</span>
            </div>
            <div className="edit-img-container"> 
                {brands[currentId - 1] && (
                    <Image  className='edit-main-image ' src={brands[currentId - 1].img} alt="Image"  preview />
                )} 
            </div>
            <div className="edit-product-details-container">
                {brands[currentId - 1] && (
                    <>
                        <div className="edit-product-details-control" >
                            <div className="edit-desc-row">
                                <span className="edit-title">Name</span>
                            </div>
                            <div className="edit-desc-row">
                                <span className="edit-descrip">{brands[currentId - 1].name}</span>
                            </div>   
                        </div>        
                        <div className="edit-product-details-control" >
                            <div className="edit-desc-row">
                                <span className="edit-title">Sub Category</span>
                            </div>
                            <div className="edit-desc-row">
                                <span className="edit-descrip">{brands[currentId - 1].subCategory}</span>
                            </div>   
                        </div>   
                    </>     
                )}
            </div>
        </div>
    )
}

export default EditBrand