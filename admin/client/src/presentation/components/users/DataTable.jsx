import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { users } from '../../../data/users/table_data';
import { useNavigate } from 'react-router-dom';
import { editSystemVariables, viewDetails } from '../../../data/roles/Roles';
import { handleCheckRole } from '../../../logical/settings/Roles';
const DataTable = () => {

        //get user roles
        const[editUsersRole,setEditUsersRole] = useState(false);
        const[viewUsersDetailsRole, setViewUsersDetailsRole] = useState(false);
    
        const showEditIcon = editUsersRole || viewUsersDetailsRole ? true : false;
    
        useEffect(() => {
            //Users 
            setEditUsersRole(handleCheckRole(editSystemVariables,'edit users'));
            setViewUsersDetailsRole(handleCheckRole(viewDetails,'users details'));
        },[]);


    const navigate = useNavigate();
    const handleEdit = (row) => {
        navigate(`/users/roles/${row.id}`);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const columns = [
        { id: 'firstName', label: 'First Name', minWidth: 170 },
        { id: 'secondName', label: 'Second Name', minWidth: 170 },
        { id: 'userName', label: 'Username', minWidth: 170 },
        { id: 'idno', label: 'Id No', minWidth: 170 },
        { id: 'phone', label: 'Phone No', minWidth: 170 },
        showEditIcon && { id: 'edit', label: 'Edit', minWidth: 50, align: 'center' },
        { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    return (
        <div className="Users-datatable common-css">
            <span className='Users-datatable-title'>All Users</span>
            <StickyHeadTable columns={columns} rows={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable