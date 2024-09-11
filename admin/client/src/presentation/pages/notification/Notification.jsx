import React, { useEffect, useState } from 'react'
import '../../css/common.css';
import './Notification.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/notification/DataTable';
import AddNotification from '../../components/popups/addNotification/AddNotification';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { addSystemVariables, viewDetails } from '../../../data/roles/Roles';
const Notification = () => {
    const [showAddNotification, setShowAddNotification] = useState(false);


    //roles useState
    const[viewNotificationRole, setViewNotificationRole] = useState(false);
    const[addNotificationRole, setAddNotificationRole] = useState(false);

        //check and set user roles
    useEffect(() =>{
        setAddNotificationRole(handleCheckRole(addSystemVariables,'send notifications'));
        setViewNotificationRole(handleCheckRole(viewDetails,'all notifications'));         
    },[])

    const handleAddNew = () => {
        setShowAddNotification(true);
    }

    const handleHidePopUp = () => {
        setShowAddNotification(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            {addNotificationRole && <AddNotification
                handleHidePopUp={handleHidePopUp} 
                showAddNotification={showAddNotification} 
            /> } 
            <div className="Notification">
                <SubHeading
                    title='My Notification'
                    handleAddNew = {handleAddNew}
                    assignedRole={addNotificationRole}
                />
                {viewNotificationRole && <div className="Notification-table">
                    <DataTable />
                </div>}     
            </div>
        </>
    )
}

export default Notification