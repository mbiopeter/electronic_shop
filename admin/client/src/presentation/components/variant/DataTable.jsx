import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { useNavigate } from 'react-router-dom';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
import { handleDeleteApi } from '../../../logical/consts/delete';
import { ToastContainer, toast } from 'react-toastify';
import { variantUrl } from '../../../logical/consts/apiUrl';
import { handleFetchAllVariant } from '../../../logical/variant/fetch';
const DataTable = (
    reload,
    setReload
) => {
    //const navigate = useNavigate();
    const handleEdit = (row) => {
    };

    const handleDelete =async (row) => {
        const variantId= row.id;
        try {
            const response =await handleDeleteApi(variantUrl,'remove',variantId);
            toast.success(`${response.message}`);
            setReload(!reload);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
                
            }
        }
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
    const[ variant,setVariant] = useState([]);
    useEffect(() => {
        const getAllVariants = async () => {
            try {
                const variantData = await handleFetchAllVariant(variantUrl,'all'); 
                setVariant(variantData); 
            } catch (error) {

            }
        }
        getAllVariants();
    },[reload]);
    const columns = [
        { id: 'name', label: 'Variant', minWidth: 120 },
        { id: 'variantType', label: 'Variant Type', minWidth: 120 },
        { id: 'addedDate', label: 'Added Date', minWidth: 120 },
        deleteVariantDetailsRole && { id: 'delete', label: 'Delete', minWidth: 120, align: 'center' },
    ];
    return (
        <>
            <ToastContainer />
            <div className="Variant-datatable common-css">
                <span className='Variant-datatable-title'>All Variant Type</span>
                <StickyHeadTable columns={columns} rows={variant} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </>
    )
}

export default DataTable