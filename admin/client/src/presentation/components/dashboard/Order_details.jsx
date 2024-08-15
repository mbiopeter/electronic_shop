import React from 'react';
import './Order_details.css';
import {Shipping} from '../../../logical/consts/icons';
const Order_details = ({
    color,
    main_title,
    count
}) => {
    return (
        <div className='dashboard-order-details'>
            <Shipping style={{color:color}}/>
            <div className="dashboard-order-details-title">
                <span className="dashboard-order-details-main-title">{main_title}
                </span>
                <span className="dashboard-order-details-sub-title">{count} Orders</span>
            </div>
        </div>
    )
}

export default Order_details