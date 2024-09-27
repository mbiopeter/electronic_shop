import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { useNavigate } from 'react-router-dom';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { editSystemVariables, fetchCurrentUserRoles, viewDetails } from '../../../data/roles/Roles';
const DataTable = ({
    subTitle,
    products
}) => {

    //get user roles
    const[editProductRole,setEditproductRole] = useState(false);
    const[viewProductDetailsRole, setViewProductDetailsRole] = useState(false);
    const[deleteProductDetailsRole, setDeleteProductDetailsRole] = useState(false);

    const showEditIcon = editProductRole || viewProductDetailsRole ? true : false;

    useEffect(() => {
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();
            //product 
            setEditproductRole(handleCheckRole(roles.editSystemVariables,'edit products'));
            setViewProductDetailsRole(handleCheckRole(roles.viewDetails,'product details'));
            setDeleteProductDetailsRole(handleCheckRole(roles.deleteItems,'remove products'));
        }
        getCurrentUsersRoles();
    },[]);

    const navigate = useNavigate();
    const handleEdit = (row) => {
        navigate(`/details/${row.id}`);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'category', label: 'Category', minWidth: 100 },
        { id: 'sub_category', label: 'Sub Category', minWidth: 100 },
        { id: 'price', label: 'Price', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
        showEditIcon && { id: 'edit', label: 'Edit', minWidth: 50, align: 'center' },
        deleteProductDetailsRole && { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    return (
        <div className="dashboard-datatable common-css">
            <span className='dashboard-datatable-title'>{subTitle}</span>
            <StickyHeadTable columns={columns} rows={products} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable