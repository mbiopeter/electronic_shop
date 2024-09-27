import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { posters } from '../../../data/posters/table_data';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
import { handleCheckRole } from '../../../logical/settings/Roles';
const DataTable = () => {
    const handleEdit = (row) => {
        console.log('Edit:', row);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
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
    const columns = [
        { id: 'name', label: 'Category Name', minWidth: 200 },
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