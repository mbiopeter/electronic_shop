import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { brands } from '../../../data/brands/table_data';
import { useNavigate } from 'react-router-dom';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
const DataTable = () => {

            //get user roles
            const[editBrandRole,setEditBrandRole] = useState(false);
            const[viewBrandDetailsRole, setViewBrandDetailsRole] = useState(false);
            const[deleteBrandDetailsRole, setDeleteBrandDetailsRole] = useState(false);
        
            const showEditIcon = editBrandRole || viewBrandDetailsRole ? true : false;
        
            useEffect(() => {
                const getCurrentUsersRoles = async () => {
                    //get all the current user Roles
                    const roles = await fetchCurrentUserRoles();
                    //barnds 
                    setEditBrandRole(handleCheckRole(roles.editSystemVariables,'edit brands'));
                    setViewBrandDetailsRole(handleCheckRole(roles.viewDetails,'brand details'));
                    setDeleteBrandDetailsRole(handleCheckRole(roles.deleteItems,'remove brands'));
                }
                getCurrentUsersRoles();
            },[]);


    const navigate = useNavigate();
    const handleEdit = (row) => {
        navigate(`/brands/details/${row.id}`);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const columns = [
        { id: 'name', label: 'Brand Name', minWidth: 170 },
        { id: 'subCategory', label: 'Sub Category', minWidth: 170 },
        { id: 'addedDate', label: 'Added Date', minWidth: 100 },
        showEditIcon && { id: 'edit', label: 'Edit', minWidth: 50, align: 'center' },
        deleteBrandDetailsRole && { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    return (
        <div className="sub-category-datatable common-css">
            <span className='sub-category-datatable-title'>All Brands</span>
            <StickyHeadTable columns={columns} rows={brands} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable