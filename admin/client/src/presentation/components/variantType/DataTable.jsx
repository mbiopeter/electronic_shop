import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { variantType } from '../../../data/variantType/table_data';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
import { handleCheckRole } from '../../../logical/settings/Roles';
const DataTable = () => {
    const handleEdit = (row) => {
        console.log('Edit:', row);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const[deleteVariantTypeDetailsRole, setDeleteVariantTypeDetailsRole] = useState(false);

    useEffect(() => {
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();

            setDeleteVariantTypeDetailsRole(handleCheckRole(roles.deleteItems,'remove variant type'));
        }
        getCurrentUsersRoles();
    },[]);
    const columns = [
        { id: 'type', label: 'Variant Type', minWidth: 120 },
        { id: 'date', label: 'Added Date', minWidth: 120 },
        deleteVariantTypeDetailsRole && { id: 'delete', label: 'Delete', minWidth: 120, align: 'center' },
    ];
    return (
        <div className="VariantType-datatable common-css">
            <span className='VariantType-datatable-title'>All Variant Type</span>
            <StickyHeadTable columns={columns} rows={variantType} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable