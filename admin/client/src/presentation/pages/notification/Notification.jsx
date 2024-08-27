import React, { useState } from 'react'
import '../../css/common.css';
import './Notification.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/notification/DataTable';
import AddNotification from '../../components/popups/addNotification/AddNotification';
const Notification = () => {
    const [showAddNotification, setShowAddNotification] = useState(false);

    const handleAddNew = () => {
        setShowAddNotification(true);
    }

    const handleHidePopUp = () => {
        setShowAddNotification(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            <AddNotification
                handleHidePopUp={handleHidePopUp} 
                showAddNotification={showAddNotification} 
            />  
            <div className="Notification">
                <SubHeading
                    title='My Notification'
                    handleAddNew = {handleAddNew}
                />
                <div className="Notification-table">
                    <DataTable />
                </div>     
            </div>
        </>
    )
}

export default Notification