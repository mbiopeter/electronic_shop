import React, { useEffect, useState } from 'react'
import './Emails.css';
import '../../css/common.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { addSystemVariables, viewDetails } from '../../../data/roles/Roles';
import DataTable from '../../components/emails/DataTable';
import SendEmail from '../../components/popups/addEmails/SendEmail';
import ViewEmail from '../../components/popups/viewEmail/ViewEmail';
const Emails = () => {
    const [showSendEmail, setShowSendEmail] = useState(false);

    //roles useState
    const[viewEmailsRole, setViewEmailsRole] = useState(false);
    const[addEmailsRole, setAddEmailsRole] = useState(false);

        //check and set user roles
    useEffect(() =>{
        setAddEmailsRole(handleCheckRole(addSystemVariables,'send emails'));
        setViewEmailsRole(handleCheckRole(viewDetails,'all emails'));         
    },[])

    const handleAddNew = () => {
        setShowSendEmail(true);
    }

    const handleHidePopUp = () => {
        setShowSendEmail(false);
    }

    const[viewEmail,setViewEmail] = useState(false);
    const[emailId,setEmailId] = useState();
    
    const handleViewEmail = (id) => {
        setViewEmail(true);
        setEmailId(id);
    }
    const handleHideViewEmail = () => {
        setViewEmail(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            {addEmailsRole &&<SendEmail 
                handleHidePopUp={handleHidePopUp} 
                showSendEmail={showSendEmail} 
            />}
            <ViewEmail 
                handleHidePopUp={handleHideViewEmail} 
                showViewEmail={viewEmail} 
                emailId={emailId}
            />
            <div className="Emails">
                <SubHeading
                    title='Sent Emails'
                    handleAddNew = {handleAddNew}
                    assignedRole={addEmailsRole}
                />
                {viewEmailsRole && (
                    <div className="Emails-table">
                        <DataTable 
                            handleViewEmail={handleViewEmail}
                        />
                    </div>   
                )}
            </div>
        </>
    )
}

export default Emails