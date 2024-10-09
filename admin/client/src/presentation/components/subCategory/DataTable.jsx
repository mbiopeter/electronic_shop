import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { useNavigate } from 'react-router-dom';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
import { subCategoriesUrl } from '../../../logical/consts/apiUrl';
import { handleFetchAllSubCategories } from '../../../logical/subCategory/fetch';
import { handleDeleteApi } from '../../../logical/consts/delete';
import { ToastContainer, toast } from 'react-toastify';
const DataTable = ({
    reload,
    setReload
}) => {

        //get user roles
        const[editSubCategoryRole,setEditSubCategoryRole] = useState(false);
        const[viewSubCategoryDetailsRole, setViewSubCategoryDetailsRole] = useState(false);
        const[deleteSubCategoryDetailsRole, setDeleteSubCategoryDetailsRole] = useState(false);
    
        const showEditIcon = editSubCategoryRole || viewSubCategoryDetailsRole ? true : false;

        const [subCategories,setSubCategories] = useState([]);
    
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
    useEffect(() => {
        //get categories data
        const getAllSubCategories = async () => {
            try {
                const usersData = await handleFetchAllSubCategories(subCategoriesUrl,'all'); 
                setSubCategories(usersData); 
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        getAllSubCategories();
    },[ reload ])


    const handleDelete = (row) => {
        const userId= row.id;
        try {
            const response = handleDeleteApi(subCategoriesUrl,'remove',userId);
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