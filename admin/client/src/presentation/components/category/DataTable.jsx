import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { categories } from '../../../data/category/table_data';
import { useNavigate } from 'react-router-dom';
import {fetchCurrentUserRoles } from '../../../data/roles/Roles';
import { handleCheckRole } from '../../../logical/settings/Roles';
const DataTable = () => {

        //get user roles
        const[editCategoryRole,setEditCategoryRole] = useState(false);
        const[viewCategoryDetailsRole, setViewCategoryDetailsRole] = useState(false);
        const[deleteCategoryDetailsRole, setDeleteCategoryDetailsRole] = useState(false);
    
        const showEditIcon = editCategoryRole || viewCategoryDetailsRole ? true : false;
    
        useEffect(() => {
            const getCurrentUsersRoles = async () => {
                //get all the current user Roles
                const roles = await fetchCurrentUserRoles();
                setEditCategoryRole(handleCheckRole(roles.editSystemVariables,'edit category'));
                setViewCategoryDetailsRole(handleCheckRole(roles.viewDetails,'category details'));
                setDeleteCategoryDetailsRole(handleCheckRole(roles.deleteItems,'remove categories'));
            }
            getCurrentUsersRoles();
        },[]);


    const navigate = useNavigate();
    const handleEdit = (row) => {
        navigate(`/category/details/${row.id}`);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const columns = [
        { id: 'name', label: 'Category Name', minWidth: 170 },
        { id: 'addedDate', label: 'Added Date', minWidth: 100 },
        showEditIcon && { id: 'edit', label: 'Edit', minWidth: 50, align: 'center' },
        deleteCategoryDetailsRole && { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    return (
        <div className="category-datatable common-css">
            <span className='category-datatable-title'>All Categories</span>
            <StickyHeadTable columns={columns} rows={categories} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable