import React, { useEffect, useState } from 'react'
import './AddCoupon.css';
import '../../../css/common.css';
import '../../../css/variables.css';
import Layer from '../Layer';
import DropdownDemo from '../../global/select/Select';
import {fetchProducts } from '../../../../data/dashboard/table_data';
import { ToastContainer, toast } from 'react-toastify';
import { handleAddCoupon } from '../../../../logical/coupon/AddCoupon';
const AddCoupon = ({
    showAddCoupont,
    handleHidePopUp,
    reload,
    setReload
}) => {
    //discount type
    const[couponValue, setCouponValue] = useState();
    const[couponItem,setCouponItem] = useState();
    //coupon status
    const [productArray,setProductArray] = useState([]);
    const[couponStatusValue, setCouponStatusValue] = useState();
    const[couponStatusItem,setCouponStatusItem] = useState();
    //product
    const[product,setProduct] = useState();
    const[productItem,setProductItem] = useState();

    const[all_products,setProducts] = useState([]);
    useEffect(() => {
        //Fetch all products
        const handleFetchproducts = async () =>{
            try{
                const [allProductsData] = await Promise.all([
                    fetchProducts('allProducts'),
                ]);
            setProducts(allProductsData);
            }catch(error){

            }
        }
        handleFetchproducts();
    },[]);


    useEffect(() => {     
        //set product
        if (all_products.length > 0) {
            const productNames = all_products.map((product) => product.name);
            setProductArray(productNames);
            
        }    
        
    },[all_products]);
    const [name,setName] = useState();
    const [discountAmount,setDiscountAmount] = useState();
    const [minimumAmount,setMinimumAmount] = useState();
    const [expiry,setExpiry] = useState();

    const uploadNewCoupon = async () => {
        try{
            const newResponse = await handleAddCoupon(
                name,
                couponValue,
                discountAmount,
                minimumAmount,
                expiry,
                product
            );
            if(newResponse.type === 'error'){
                toast.error(newResponse.message); 
            }
            else{
                setReload(!reload);
                toast.success(newResponse.message); 
                
            }
        }catch(err) {
            toast.error(err);
            console.log(err);
        }
    };

    return (
        <>
        {showAddCoupont && (
            <Layer handleHidePopUp={handleHidePopUp}/>
        )}
        <div className={`AddCouponPopUp popup-css ${showAddCoupont ? 'show-AddCouponPopUp' : 'hide'}`}>
            <div className="AddCouponPopUp-title">
                <span>ADD COUPON</span>
            </div>
            <div className="AddCouponPopUp-container">
                <div className="AddCouponPopUp-inputs">
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Coupon Code" className="input-css" />
                    <div className="AddCouponPopUp-select">
                        <DropdownDemo
                            width={'100%'}
                            allItems = {['Fixed','Percentage']}
                            placeholder={'Discount Type'}
                            value={couponValue}
                            setValue={setCouponValue}
                            items={couponItem}
                            setItems={setCouponItem}
                        />                    
                    </div>
                    <input onChange={(e) => setDiscountAmount(e.target.value)} value={discountAmount} type="text" placeholder="Discount Amount" className="input-css" />
                    <input onChange={(e) => setMinimumAmount(e.target.value)} value={minimumAmount}   type="text" placeholder="Minimum Purchase Amount" className="input-css" />
                    <input onChange={(e) => setExpiry(e.target.value)} value={expiry} type="date" placeholder="Select Date" className="input-css" />            
                    <div className="AddCouponPopUp-select">
                        <DropdownDemo
                            width={'100%'}
                            allItems = {['Active','Expired','Used']}
                            placeholder={'Status'}
                            value={couponStatusValue}
                            setValue={setCouponStatusValue}
                            items={couponStatusItem}
                            setItems={setCouponStatusItem}
                        />                    
                    </div>                         
                </div>
                <div className="AddCouponPopUp-input-two">
                    <div className="AddCouponPopUp-select">
                        <DropdownDemo
                            width={'100%'}
                            allItems = {productArray}
                            placeholder={'Select Product'}
                            value={product}
                            setValue={setProduct}
                            items={productItem}
                            setItems={setProductItem}
                        />                    
                    </div>  
                </div>

                <div className="AddCouponPopUp-form-btn">
                    <button className="AddCouponPopUp-form-btn-item cancel">Cancel</button>
                    <button onClick={uploadNewCoupon} className="AddCouponPopUp-form-btn-item submit">Submit</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default AddCoupon