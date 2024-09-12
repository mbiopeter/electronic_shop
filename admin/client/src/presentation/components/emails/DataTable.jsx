import React, { useEffect, useState } from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { emails } from '../../../data/emails/table_data';
const DataTable = ({
    handleViewEmail
}) => {


    const handleEdit = (row) => {
        handleViewEmail(row.id);
    };


    const columns = [
        { id: 'from', label: 'Sender Email', minWidth: 170 },
        { id: 'to', label: 'Receiver Email', minWidth: 100 },
        { id: 'date', label: 'Sent Date', minWidth: 100 },
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