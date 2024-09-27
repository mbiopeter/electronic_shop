import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { subCategories } from '../../../data/subCategory/table_data';
import { useNavigate } from 'react-router-dom';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
const DataTable = () => {

        //get user roles
        const[editSubCategoryRole,setEditSubCategoryRole] = useState(false);
        const[viewSubCategoryDetailsRole, setViewSubCategoryDetailsRole] = useState(false);
        const[deleteSubCategoryDetailsRole, setDeleteSubCategoryDetailsRole] = useState(false);
    
        const showEditIcon = editSubCategoryRole || viewSubCategoryDetailsRole ? true : false;
    
        useEffect(() => {
            const getCurrentUsersRoles = async () => {
                //get all the current user Roles
                const roles = await fetchCurrentUserRoles();
                //SubCategory 
                setEditSubCategoryRole(handleCheckRole(roles.editSystemVariables,'edit sub category'));
                setViewSubCategoryDetailsRole(handleCheckRole(roles.viewDetails,'sub category details'));
                setDeleteSubCategoryDetailsRole(handleCheckRole(roles.deleteItems,'remove sub categories'));
            }
            getCurrentUsersRoles();
        },[]);

    const navigate = useNavigate();
    const handleEdit = (row) => {
        navigate(`/subCategory/details/${row.id}`);
    };


    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const columns = [
        { id: 'name', label: 'Sub Category Name', minWidth: 170 },
        { id: 'category', label: 'Category Name', minWidth: 170 },
        { id: 'addedDate', label: 'Added Date', minWidth: 100 },
        showEditIcon && { id: 'edit', label: 'Edit', minWidth: 50, align: 'center' },
        deleteSubCategoryDetailsRole && { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    return (
        <div className="sub-category-datatable common-css">
            <span className='sub-category-datatable-title'>All Sub Categories</span>
            <StickyHeadTable columns={columns} rows={subCategories} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable