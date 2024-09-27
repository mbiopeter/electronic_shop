import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { couponCodes } from '../../../data/coupon/table_data';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
import { handleCheckRole } from '../../../logical/settings/Roles';
const DataTable = () => {
    const handleEdit = (row) => {
        console.log('Edit:', row);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
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
    const columns = [
        { id: 'name', label: 'Coupon Name', minWidth: 170 },
        { id: 'status', label: 'Status', minWidth: 100 },
        { id: 'type', label: 'Type', minWidth: 100 },
        { id: 'amount', label: 'Amount', minWidth: 100 },
        deleteCouponDetailsRole && { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    return (
        <div className="category-datatable common-css">
            <span className='category-datatable-title'>All Coupon Codes</span>
            <StickyHeadTable columns={columns} rows={couponCodes} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable