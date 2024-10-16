import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { handleDeleteApi } from '../../../logical/consts/delete';
import { posterUrl } from '../../../logical/consts/apiUrl';
import { ToastContainer, toast } from 'react-toastify';
import { handleFetchAllCategories } from '../../../logical/category/fetch';
import { handleFetchAllPosters } from '../../../logical/posters/fetch';
const DataTable = ({
    reload,
    setReload
}) => {
    const handleEdit = (row) => {
        console.log('Edit:', row);
    };

    const handleDelete = (row) => {
        const userId= row.id;
        try {
            const response = handleDeleteApi(posterUrl,'remove',userId);
            setReload(!reload)
            toast.success(`${row.name} category sucessfully removed`);
        } catch (err) {
            console.log(err)
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            }
        }
    };
    const[deletePosterDetailsRole, setDeletePosterDetailsRole] = useState(false);

    useEffect(() => {
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();

            setDeletePosterDetailsRole(handleCheckRole(roles.deleteItems,'remove poster'));
        }
        getCurrentUsersRoles();
    },[]);


    const[posters, setPosters] = useState([]);
    useEffect(() => {
        //get categories data
        const getAllPosters = async () => {
            try {
                const usersData = await handleFetchAllPosters(posterUrl,'all'); 
                setPosters(usersData); 
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        getAllPosters();
    },[reload])
    const columns = [
        { id: 'name', label: 'Category Name', minWidth: 200 },
        { id: 'addedDate', label: 'created Date', minWidth: 200 },
        deletePosterDetailsRole && { id: 'delete', label: 'Delete', minWidth: 120, align: 'center' },
    ];
    return (
        <div className="Posters-datatable common-css">
            <span className='Posters-datatable-title'>All Posters</span>
            <StickyHeadTable columns={columns} rows={posters} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable