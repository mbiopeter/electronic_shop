import React, { useEffect, useState } from 'react'
import './AddCoupon.css';
import '../../../css/common.css';
import '../../../css/variables.css';
import Layer from '../Layer';
import DropdownDemo from '../../global/select/Select';
import { categories } from '../../../../data/category/table_data';
import { subCategories } from '../../../../data/subCategory/table_data';
import { all_products } from '../../../../data/dashboard/table_data';
const AddCoupon = ({
    showAddCoupont,
    handleHidePopUp,
}) => {
    //discount type
    const[couponValue, setCouponValue] = useState();
    const[couponItem,setCouponItem] = useState();
    //coupon status
    const[couponStatusValue, setCouponStatusValue] = useState();
    const[couponStatusItem,setCouponStatusItem] = useState();
    //category
    const[categoryArray,setCategoryArray] = useState([]);
    const[categoryValue,setCategoryValue] = useState();
    const[categoryItem,setCategoryItem] = useState();
    //sub category
    const[subCategoryArray,setSubCategoryArray] = useState([]);
    const[subCategoryValue,setSubCategoryValue] = useState();
    const[subCategoryItem,setSubCategoryItem] = useState(); 
    //product
    const[productArray,setProductArray] = useState([]);
    const[product,setProduct] = useState();
    const[productItem,setProductItem] = useState();


    useEffect(() => {
        //set category array
        {categories.map((item) => {
            setCategoryArray(prevState => ([
                ...prevState,
                item.name
            ])
            )
        })}
        //set sub category
        {subCategories.map((item) => {
            setSubCategoryArray(prevState => ([
                ...prevState,
                item.name
            ])
            )
        })}       
        //set product
        {all_products.map((item) => {
            setProductArray(prevState => ([
                ...prevState,
                item.name
            ])
            )
        })}       
    },[]);

    const handleSubmit = () => {

    }
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
                    <input type="text" placeholder="Coupon Code" className="input-css" />
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
                    <input type="text" placeholder="Discount Amount" className="input-css" />
                    <input type="text" placeholder="Minimum Purchase Amount" className="input-css" />
                    <input type="date" placeholder="Select Date" className="input-css" />            
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
                            allItems = {categoryArray}
                            placeholder={'Select Category'}
                            value={categoryValue}
                            setValue={setCategoryValue}
                            items={categoryItem}
                            setItems={setCategoryItem}
                        />                    
                    </div>  
                    <div className="AddCouponPopUp-select">
                        <DropdownDemo
                            width={'100%'}
                            allItems = {subCategoryArray}
                            placeholder={'Select Sub Category'}
                            value={subCategoryValue}
                            setValue={setSubCategoryValue}
                            items={subCategoryItem}
                            setItems={setSubCategoryItem}
                        />                    
                    </div>  
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
                    <button onClick={handleSubmit} className="AddCouponPopUp-form-btn-item submit">Submit</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default AddCoupon