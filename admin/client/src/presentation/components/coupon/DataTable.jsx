import React from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { couponCodes } from '../../../data/coupon/table_data';
const DataTable = () => {
    const handleEdit = (row) => {
        console.log('Edit:', row);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const columns = [
        { id: 'name', label: 'Coupon Name', minWidth: 170 },
        { id: 'status', label: 'Status', minWidth: 100 },
        { id: 'type', label: 'Type', minWidth: 100 },
        { id: 'amount', label: 'Amount', minWidth: 100 },
        { id: 'edit', label: 'Edit', minWidth: 50, align: 'center' },
        { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    return (
        <div className="category-datatable common-css">
            <span className='category-datatable-title'>All Coupon Codes</span>
            <StickyHeadTable columns={columns} rows={couponCodes} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable