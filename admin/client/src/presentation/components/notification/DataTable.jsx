import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { notifications } from '../../../data/notification/table_data';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
const DataTable = () => {
    const handleEdit = (row) => {
        console.log('Edit:', row);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const[deleteNotificationDetailsRole, setDeleteNotificationDetailsRole] = useState(false);

    useEffect(() => {
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();

            setDeleteNotificationDetailsRole(handleCheckRole(roles.deleteItems,'remove notification'));
        }
        getCurrentUsersRoles();
    },[]);
    const columns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'desc', label: 'Description', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 100 }, 
        deleteNotificationDetailsRole && { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    return (
        <div className="category-datatable common-css">
            <span className='category-datatable-title'>All Coupon Codes</span>
            <StickyHeadTable columns={columns} rows={notifications} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable