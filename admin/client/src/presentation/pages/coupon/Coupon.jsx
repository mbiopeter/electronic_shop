import React, { useState } from 'react'
import './Coupon.css';
import '../../css/common.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/coupon/DataTable';
import AddCoupon from '../../components/popups/addCoupon/AddCoupon';
const Coupon = () => {
    const [showAddCoupont, setShowAddCoupont] = useState(false);

    const handleAddNew = () => {
        setShowAddCoupont(true);
    }

    const handleHidePopUp = () => {
        setShowAddCoupont(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            <AddCoupon
                handleHidePopUp={handleHidePopUp} 
                showAddCoupont={showAddCoupont} 
            /> 
            <div className="Coupon">
                <SubHeading
                    title='My Coupon Codes'
                    handleAddNew = {handleAddNew}
                />
                <div className="Coupon-table">
                    <DataTable />
                </div>     
            </div>
        </>
    )
}

export default Coupon