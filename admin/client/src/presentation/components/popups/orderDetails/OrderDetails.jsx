import React, { useEffect, useState } from 'react'
import './OrderDetails.css';
import '../../../css/common.css';
import '../../../css/variables.css';
import Layer from '../Layer';
import { orderStatus, paymentDetails, userOders } from '../../../../data/orders/table_data';
import { shippingAdress } from '../../../../data/orders/table_data';
import DropdownDemo from '../../global/select/Select';
const OrderDetails = ({
    showOderDetailsPopUp,
    handleHidePopUp,
}) => {
    const[totalPrice,setTotalPrice] = useState(0);
    const[orderValue,setOrderValue] = useState();
    const[orderItem,setOrderItems] = useState();


    var orderTotalPrice = 0
    useEffect(() => {
        userOders.map((item) => {
            orderTotalPrice +=(item.total * item.price);
        })
        setTotalPrice(orderTotalPrice);
    },[])
    const handleSubmit = () => {

    }
    return (
        <>
        {showOderDetailsPopUp && (
            <Layer handleHidePopUp={handleHidePopUp}/>
        )}
        <div className={`OrderDetailsPopUp popup-css ${showOderDetailsPopUp ? 'show-OrderDetailsPopUp' : 'hide'}`}>
            <div className="OrderDetailsPopUp-title">
                <span>ORDER DETAILS</span>
            </div>
            <div className="OrderDetailsPopUp-container">

                <div className="OrderDetailsPopUp-user-detiails">
                    <div className="OrderDetailsPopUp-user-detiails-con">
                        <span>Name:</span>
                        <span>user@gmail.com</span>
                    </div>
                    <div className="OrderDetailsPopUp-user-detiails-con">
                        <span>Order id:</span>
                        <span>EWIFKVFNKLVDFLDFN</span>
                    </div>
                </div>

                <div className="OrderDetailsPopUp-body">
                    <span className="OrderDetailsPopUp-subtitle">Items</span>
                    {userOders.map((item) => (
                        <span className="OrderDetailsPopUp-item">{item.itemName}: {item.total} x Ksh.{item.price}</span>
                    ))}
                    <div className="OrderDetailsPopUp-item-total">
                        <span className="OrderDetailsPopUp-total-price">Total Price</span>
                        <div className="OrderDetailsPopUp-total-amount">Ksh. {totalPrice}</div>
                    </div>
                </div>

                <div className="OrderDetailsPopUp-body">
                    <span className="OrderDetailsPopUp-subtitle">Shipping Adress</span>
                    <div className="OrderDetailsPopUp-body-shipping">
                        <span>Phone:</span>
                        <span>{shippingAdress.phone}</span>
                        <span>Street:</span>
                        <span>{shippingAdress.street}</span>
                        <span>City:</span>
                        <span>{shippingAdress.city}</span>
                        <span>Postal Code:</span>
                        <span>{shippingAdress.postalCode}</span>
                        <span>Country</span>
                        <span>{shippingAdress.country}</span>
                    </div>
                </div>

                <div className="OrderDetailsPopUp-body">
                    <span className="OrderDetailsPopUp-subtitle">Payment Details</span>
                    <div className="OrderDetailsPopUp-body-shipping">
                        <span>Phone:</span>
                        <span>{paymentDetails.method}</span>
                        <span>Street:</span>
                        <span>{paymentDetails.couponCode}</span>
                        <span>City:</span>
                        <span>{paymentDetails.subTotal}</span>
                        <span>Postal Code:</span>
                        <span>{paymentDetails.discount}</span>
                        <span>Country</span>
                        <span>{paymentDetails.grandTotal}</span>
                    </div>
                </div>

                <div className="OrderDetailsPopUp-status">
                    <span>Order Status</span>
                    <div className="OrderDetailsPopUp-input">
                        <DropdownDemo
                            width={'100%'}
                            allItems = {orderStatus}
                            value={orderValue}
                            setValue={setOrderValue}
                            items={orderItem}
                            setItems={setOrderItems}
                        />                    
                    </div>
                </div>

                <div className="OrderDetailsPopUp-form-btn">
                    <button className="OrderDetailsPopUp-form-btn-item cancel">Cancel</button>
                    <button onClick={handleSubmit} className="OrderDetailsPopUp-form-btn-item submit">Submit</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default OrderDetails