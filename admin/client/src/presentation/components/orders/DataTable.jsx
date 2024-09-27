import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
const DataTable = ({
    handleShowPopUp,
    filteredOrders
}) => {
        //get user roles
        const[editOrderRole,setEditOrderRole] = useState(false);
        const[DeleteOrdersRole,setDeleteOrdersRole] = useState(false);

    
        useEffect(() => {
            const getCurrentUsersRoles = async () => {
                //get all the current user Roles
                const roles = await fetchCurrentUserRoles();

                setEditOrderRole(handleCheckRole(roles.editSystemVariables,'edit orders'));
                setDeleteOrdersRole(handleCheckRole(roles.deleteItems,'remove order'));
            }
            getCurrentUsersRoles();
        },[]);

    const handleEdit = (row) => {
        handleShowPopUp(row.id);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row.id);
    };
    const columns = [
        { id: 'name', label: 'Customer Name', minWidth: 170 },
        { id: 'amount', label: 'Order Amount', minWidth: 170 },
        { id: 'payment', label: 'Payment', minWidth: 170 },
        { id: 'status', label: 'Status', minWidth: 170 },
        { id: 'date', label: 'Date', minWidth: 100 },
        editOrderRole &&{ id: 'edit', label: 'Edit', minWidth: 50, align: 'center' },
        DeleteOrdersRole && { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    return (
        <div className="sub-category-datatable common-css">
            <span className='sub-category-datatable-title'>All Orders</span>
            <StickyHeadTable columns={columns} rows={filteredOrders} onEdit={handleEdit} onDelete={handleDelete}  handleShowPopUp={handleShowPopUp}/>
        </div>
    )
}

export default DataTable