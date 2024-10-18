import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
import { handleFetchAllNotifications } from '../../../logical/notification/fetch';
import { notificationUrl } from '../../../logical/consts/apiUrl';
import { ToastContainer, toast } from 'react-toastify';
import { handleDeleteApi } from '../../../logical/consts/delete';
const DataTable = ({
    setReload,
    reload
}) => {
    const handleEdit = (row) => {
        console.log('Edit:', row);
    };

    const handleDelete = (row) => {
    const userId= row.id;
        try {
            const response = handleDeleteApi(notificationUrl,'remove',userId);
            setReload(!reload)
            toast.success(`${row.name} sucessfully removed`);
        } catch (err) {
            console.log(err)
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            }
        }
    };
    const[deleteNotificationDetailsRole, setDeleteNotificationDetailsRole] = useState(false);

    useEffect(() => {
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();

            setDeleteNotificationDetailsRole(handleCheckRole(roles.deleteItems,'remove notification'));
        }
        getCurrentUsersRoles();
    },[]);

    const[notifications, setNotifications] = useState([]);
    useEffect(() => {
        //get categories data
        const getAllNotifications = async () => {
            try {
                const notificationData = await handleFetchAllNotifications(notificationUrl,'all'); 
                setNotifications(notificationData); 
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        }
        getAllNotifications();
    },[reload])
    const columns = [
        { id: 'name', label: 'Title', minWidth: 170 },
        { id: 'description', label: 'Description', minWidth: 100 },
        { id: 'addedDate', label: 'Date', minWidth: 100 }, 
        deleteNotificationDetailsRole && { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    return (
        <div className="category-datatable common-css">
            <span className='category-datatable-title'>All Coupon Codes</span>
            <StickyHeadTable columns={columns} rows={notifications} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable