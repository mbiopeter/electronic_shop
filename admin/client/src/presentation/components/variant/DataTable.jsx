import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { varient } from '../../../data/varient/table_data';
import { useNavigate } from 'react-router-dom';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
const DataTable = () => {
    const navigate = useNavigate();
    const handleEdit = (row) => {
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const[deleteVariantDetailsRole, setDeleteVariantDetailsRole] = useState(false);

    useEffect(() => {
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();

            setDeleteVariantDetailsRole(handleCheckRole(roles.deleteItems,'remove variant'));
        }
        getCurrentUsersRoles();
    },[]);
    const columns = [
        { id: 'name', label: 'Variant', minWidth: 120 },
        { id: 'type', label: 'Variant Type', minWidth: 120 },
        { id: 'date', label: 'Added Date', minWidth: 120 },
        deleteVariantDetailsRole && { id: 'delete', label: 'Delete', minWidth: 120, align: 'center' },
    ];
    return (
        <div className="Variant-datatable common-css">
            <span className='Variant-datatable-title'>All Variant Type</span>
            <StickyHeadTable columns={columns} rows={varient} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable