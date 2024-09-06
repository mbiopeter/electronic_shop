import React from 'react';
import '../Edit.css';
import { Image } from 'primereact/image';
import { editProductDetails, editProductImages } from '../../../../data/details/detailsData';
import { useLocation } from 'react-router-dom';
const EditProducts = ({
    products
}) => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const currentId =  pathSegments[2];
    return (
        <div className='Edit'>
                <div className="editHeader">
                    <span>{products.length > 0 && products[currentId - 1].name} Details</span>
                </div>
                <div className="edit-img-container"> 
                        {products.length > 0 && <Image className='edit-main-image ' src={products[currentId - 1].img} alt="Image"  preview />}
                        {products.length > 0 && products[currentId - 1].imgs[0] && <Image  src={products[currentId - 1].imgs[0]} alt="Image"  preview />}
                        {products.length > 0 && products[currentId - 1].imgs[1] && <Image  src={products[currentId - 1].imgs[1]} alt="Image"  preview />}
                        {products.length > 0 && products[currentId - 1].imgs[2] && <Image  src={products[currentId - 1].imgs[2]} alt="Image"  preview />}
                        {products.length > 0 && products[currentId - 1].imgs[3] && <Image  src={products[currentId - 1].imgs[3]} alt="Image"  preview />}
                </div>
                <div className="edit-product-details-container">
                    {products.length > 0 &&(
                        <>
                            <div className="edit-product-details-control" >
                                <div className="edit-desc-row">
                                    <span className="edit-title">Product Name:</span>
                                </div>
                                <div className="edit-desc-row">
                                    <span className="edit-descrip">{products[currentId - 1].name}</span>
                                </div>   
                            </div>                     
                            <div className="edit-product-details-control" >
                                <div className="edit-desc-row">
                                    <span className="edit-title">Product Description:</span>
                                </div>
                                <div className="edit-desc-row">
                                    <span className="edit-descrip">{products[currentId - 1].desc}</span>
                                </div>   
                            </div>                     
                            <div className="edit-product-details-control" >
                                <div className="edit-desc-row">
                                    <span className="edit-title">Product Category:</span>
                                </div>
                                <div className="edit-desc-row">
                                    <span className="edit-descrip">{products[currentId - 1].category}</span>
                                </div>   
                            </div>                     
                            <div className="edit-product-details-control" >
                                <div className="edit-desc-row">
                                    <span className="edit-title">Product Sub Category:</span>
                                </div>
                                <div className="edit-desc-row">
                                    <span className="edit-descrip">{products[currentId - 1].sub_category}</span>
                                </div>   
                            </div>                     
                            <div className="edit-product-details-control" >
                                <div className="edit-desc-row">
                                    <span className="edit-title">Product Brand:</span>
                                </div>
                                <div className="edit-desc-row">
                                    <span className="edit-descrip">{products[currentId - 1].brand}</span>
                                </div>   
                            </div>                     
                            <div className="edit-product-details-control" >
                                <div className="edit-desc-row">
                                    <span className="edit-title">Product Price:</span>
                                </div>
                                <div className="edit-desc-row">
                                    <span className="edit-descrip">{products[currentId - 1].price}</span>
                                </div>   
                            </div>                     
                            <div className="edit-product-details-control" >
                                <div className="edit-desc-row">
                                    <span className="edit-title">Product Offer Price:</span>
                                </div>
                                <div className="edit-desc-row">
                                    <span className="edit-descrip">{products[currentId - 1].offerPrice}</span>
                                </div>   
                            </div>                     
                            <div className="edit-product-details-control" >
                                <div className="edit-desc-row">
                                    <span className="edit-title">Product Quantity:</span>
                                </div>
                                <div className="edit-desc-row">
                                    <span className="edit-descrip">{products[currentId - 1].quantity}</span>
                                </div>   
                            </div>
                            {products[currentId - 1].variantType.map((variant) => (
                                <div className="edit-product-details-control" >
                                    <div className="edit-desc-row">
                                        <span className="edit-title">{variant.name}:</span>
                                    </div>
                                    <div className="edit-desc-row">
                                        <span className="edit-descrip">{variant.values.join(', ')}</span>
                                    </div>   
                                </div>          
                            ))}
                        </>
                    )}
                </div>
        </div>
    )
}

export default EditProducts