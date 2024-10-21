import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { emailUrl } from '../../../logical/consts/apiUrl';
import { handleFetchAllEmails } from '../../../logical/email/fetch';
const DataTable = ({
    handleViewEmail,
    reload
}) => {


    const handleEdit = (row) => {
        handleViewEmail(row.id);
    };
    const [emails,setEmails] = useState([]);
    useEffect(() => {
        //get categories data
        const getAllPosters = async () => {
            try {
                const emailData = await handleFetchAllEmails(emailUrl,'all'); 
                setEmails(emailData); 
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        getAllPosters();
    },[reload])

    const columns = [
        { id: 'from', label: 'Sender Email', minWidth: 170 },
        { id: 'to', label: 'Receiver Email', minWidth: 100 },
        { id: 'addedDate', label: 'Sent Date', minWidth: 100 },
        {id: 'edit', label: 'View Email', minWidth: 50, align: 'center' }
    ];
    return (
        <div className="Emails-datatable common-css">
            <span className='Emails-datatable-title'>All Sent Emails</span>
            <StickyHeadTable columns={columns} rows={emails} onEdit={handleEdit}/>
        </div>
    )
}

export default DataTable