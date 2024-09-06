import React from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { notifications } from '../../../data/notification/table_data';
const DataTable = () => {
    const handleEdit = (row) => {
        console.log('Edit:', row);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const columns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'desc', label: 'Description', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 100 }, 
        { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    return (
        <div className="category-datatable common-css">
            <span className='category-datatable-title'>All Coupon Codes</span>
            <StickyHeadTable columns={columns} rows={notifications} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable