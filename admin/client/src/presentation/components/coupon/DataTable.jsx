import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { couponUrl } from '../../../logical/consts/apiUrl';
import { handleFetchAllCoupons } from '../../../logical/coupon/fetch';
import { ToastContainer, toast } from 'react-toastify';
import { handleDeleteApi } from '../../../logical/consts/delete';
const DataTable = ({
    reload,
    setReload
}) => {
    const handleEdit = async (row) => {

    };

    const handleDelete = async (row) => {
        const couponId= row.id;
        console.log('couponId')
        try {
            const response =await handleDeleteApi(couponUrl,'remove',couponId);
            toast.success(`${response.message}`);
            setReload(!reload);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
                
            }
        }
    };
    const[deleteCouponDetailsRole, setDeleteCouponDetailsRole] = useState(false);

    useEffect(() => {
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();

            setDeleteCouponDetailsRole(handleCheckRole(roles.deleteItems,'remove coupon'));
        }
        getCurrentUsersRoles();
    },[]);

    const[ couponCodes,setCoupons] = useState([]);
    useEffect(() => {
        const getAllCoupons = async () => {
            try {
                const CouponsData = await handleFetchAllCoupons(couponUrl,'all'); 
                setCoupons(CouponsData); 
            } catch (error) {

            }
        }
        getAllCoupons();
    },[reload]);
    const columns = [
        { id: 'name', label: 'Coupon Name', minWidth: 170 },
        { id: 'status', label: 'Status', minWidth: 100 },
        { id: 'discountType', label: 'Type', minWidth: 100 },
        { id: 'discountAmount', label: 'Amount', minWidth: 100 },
        deleteCouponDetailsRole && { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    return (
        <>
            <ToastContainer/>
            <div className="category-datatable common-css">
                <span className='category-datatable-title'>All Coupon Codes</span>
                <StickyHeadTable columns={columns} rows={couponCodes} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </>
    )
}

export default DataTable