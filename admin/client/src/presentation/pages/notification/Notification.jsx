import React, { useEffect, useState } from 'react'
import '../../css/common.css';
import './Notification.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/notification/DataTable';
import AddNotification from '../../components/popups/addNotification/AddNotification';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
const Notification = () => {
    const [showAddNotification, setShowAddNotification] = useState(false);


    //roles useState
    const[viewNotificationRole, setViewNotificationRole] = useState(false);
    const[addNotificationRole, setAddNotificationRole] = useState(false);

    const[reload,setReload] = useState(false);

        //check and set user roles
    useEffect(() =>{
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();
            setAddNotificationRole(handleCheckRole(roles.addSystemVariables,'send notifications'));
            setViewNotificationRole(handleCheckRole(roles.viewDetails,'all notifications'));  
        }
        getCurrentUsersRoles();
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
                setReload={setReload}
                reload={reload}
            /> } 
            <div className="Notification">
                <SubHeading
                    title='My Notification'
                    handleAddNew = {handleAddNew}
                    assignedRole={addNotificationRole}
                />
                {viewNotificationRole && <div className="Notification-table">
                    <DataTable 
                        setReload={setReload}
                        reload={reload}
                    />
                </div>}     
            </div>
        </>
    )
}

export default Notification