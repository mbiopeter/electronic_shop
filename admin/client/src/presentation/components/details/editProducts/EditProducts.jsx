import React from 'react';
import '../Edit.css';
import { Image } from 'primereact/image';
import { editProductDetails, editProductImages } from '../../../../data/details/detailsData';
const EditProducts = () => {
    return (
        <div className='Edit'>
                <div className="editHeader">
                    <span>SAMSANG GALAXY A14 LITE DETAILS</span>
                </div>
                <div className="edit-img-container"> 
                    {editProductImages.map((img) => (
                        <Image key={img.id} className={ img.id === 1 ?' edit-main-image ':null} src={img.img} alt="Image"  preview />
                    ))}
                </div>
                <div className="edit-product-details-container">
                    {editProductDetails.length >0 && editProductDetails.map((det) => (
                        <div className="edit-product-details-control" key={det.id}>
                            <div className="edit-desc-row">
                                <span className="edit-title">{det.title}:</span>
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

export default EditProducts