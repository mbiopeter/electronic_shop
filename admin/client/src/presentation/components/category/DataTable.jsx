import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { useNavigate } from 'react-router-dom';
import {fetchCurrentUserRoles } from '../../../data/roles/Roles';
import { ToastContainer, toast } from 'react-toastify';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { handleFetchAllCategories } from '../../../logical/category/fetch';
import { categoriesUrl } from '../../../logical/consts/apiUrl';
import { handleDeleteApi } from '../../../logical/consts/delete';
const DataTable = ({
    reload,
    setReload
}) => {

        //get user roles
        const[editCategoryRole,setEditCategoryRole] = useState(false);
        const[viewCategoryDetailsRole, setViewCategoryDetailsRole] = useState(false);
        const[deleteCategoryDetailsRole, setDeleteCategoryDetailsRole] = useState(false);
    
        const showEditIcon = editCategoryRole || viewCategoryDetailsRole ? true : false;

        const[categories,setCategories] = useState([]);
    
        useEffect(() => {
            //get all the current user Roles
            const getCurrentUsersRoles = async () => {
                const roles = await fetchCurrentUserRoles();
                setEditCategoryRole(handleCheckRole(roles.editSystemVariables,'edit category'));
                setViewCategoryDetailsRole(handleCheckRole(roles.viewDetails,'category details'));
                setDeleteCategoryDetailsRole(handleCheckRole(roles.deleteItems,'remove categories'));
            }
            getCurrentUsersRoles();
        },[]);

        useEffect(() => {
            //get categories data
            const getAllCategories = async () => {
                try {
                    const usersData = await handleFetchAllCategories(categoriesUrl,'all'); 
                    setCategories(usersData); 
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            }
            getAllCategories();
        },[reload])


    const navigate = useNavigate();
    const handleEdit = (row) => {
        navigate(`/category/details/${row.id}`);
    };

    const handleDelete = (row) => {
        const userId= row.id;
        try {
            const response = handleDeleteApi(categoriesUrl,'remove',userId);
            setReload(!reload)
            toast.success(`${row.name} category sucessfully removed`);
        } catch (err) {
            console.log(err)
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            }
        }
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