import React, { useEffect, useState } from 'react'
import './Coupon.css';
import '../../css/common.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/coupon/DataTable';
import AddCoupon from '../../components/popups/addCoupon/AddCoupon';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
const Coupon = () => {
    const [showAddCoupont, setShowAddCoupont] = useState(false);


    //roles useState
    const[viewCouponRole, setViewCouponRole] = useState(false);
    const[addCouponRole, setAddCouponRole] = useState(false);

        //check and set user roles
    useEffect(() =>{
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();
            setAddCouponRole(handleCheckRole(roles.addSystemVariables,'create coupon'));
            setViewCouponRole(handleCheckRole(roles.viewDetails,'all coupon codes'));     
        }
        getCurrentUsersRoles();
    },[])


    const handleAddNew = () => {
        setShowAddCoupont(true);
    }

    const handleHidePopUp = () => {
        setShowAddCoupont(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            {addCouponRole && <AddCoupon
                handleHidePopUp={handleHidePopUp} 
                showAddCoupont={showAddCoupont} 
            />} 
            <div className="Coupon">
                <SubHeading
                    title='My Coupon Codes'
                    handleAddNew = {handleAddNew}
                    assignedRole={addCouponRole}
                />
                {viewCouponRole && <div className="Coupon-table">
                    <DataTable />
                </div>}     
            </div>
        </>
    )
}

export default Coupon