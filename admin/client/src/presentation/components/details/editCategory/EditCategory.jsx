import React from 'react';
import '../Edit.css';
import { editCategoryDetails, editCategoryImage } from '../../../../data/details/detailsData';
import { Image } from 'primereact/image';
const EditCategory = () => {
    return (
        <div className='Edit'>
            <div className="editHeader">
                <span>ELECTRONICS DETAILS</span>
            </div>
            <div className="edit-img-container"> 
                <Image  className='edit-main-image ' src={editCategoryImage[0]} alt="Image"  preview />  
            </div>
            <div className="edit-product-details-container">
                {editCategoryDetails.length >0 && editCategoryDetails.map((det) => (
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

export default EditCategory