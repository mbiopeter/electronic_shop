import React from 'react';
import '../Edit.css';
import { Image } from 'primereact/image';
import { editSubCategoryDetails, editSubCategoryImage } from '../../../../data/details/detailsData';

const EditSubCategory = () => {
    return (
        <div className='Edit'>
            <div className="editHeader">
                <span>MOBILE DETAILS</span>
            </div>
            <div className="edit-img-container"> 
                <Image  className='edit-main-image ' src={editSubCategoryImage[0]} alt="Image"  preview />  
            </div>
            <div className="edit-product-details-container">
                {editSubCategoryDetails.length >0 && editSubCategoryDetails.map((det) => (
                    <div className="edit-product-details-control" key={det.id}>
                        <div className="edit-desc-row">
                            <span className="edit-title">{det.name}:</span>
                        </div>
                        <div className="edit-desc-row">
                            <span className="edit-descrip">{det.value}</span>
                        </div>   
                    </div>                     
                ))}
            </div>
        </div>
    )
}

export default EditSubCategory