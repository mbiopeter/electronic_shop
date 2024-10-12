import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { variantType } from '../../../data/variantType/table_data';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { ToastContainer, toast } from 'react-toastify';
import { handleDeleteApi } from '../../../logical/consts/delete';
import { handleFetchAllVariantTypes } from '../../../logical/variantType/fetch';
import { variantTypeUrl } from '../../../logical/consts/apiUrl';
const DataTable = ({
    reload,
    setReload
}) => {
    const handleEdit = (row) => {
        console.log('Edit:', row);
    };

    const handleDelete = (row) => {
        const variantTypeId= row.id;
        try {
            const response = handleDeleteApi(variantTypeUrl,'remove',variantTypeId);
            setReload(!reload)
            toast.success(`${row.name} variant type sucessfully removed`);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            }
        }
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

    const[ variantType,setVariantType] = useState([]);
    useEffect(() => {
        //get categories data
        const getAllVariantTypes = async () => {
            try {
                const variantData = await handleFetchAllVariantTypes(variantTypeUrl,'all'); 
                setVariantType(variantData); 
            } catch (error) {

            }
        }
        getAllVariantTypes();
    },[reload]);
    const columns = [
        { id: 'name', label: 'Variant Type', minWidth: 120 },
        { id: 'addedDate', label: 'Added Date', minWidth: 120 },
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