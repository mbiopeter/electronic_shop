import React from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { orders } from '../../../data/orders/table_data';
const DataTable = () => {
    const handleEdit = (row) => {
        console.log('Edit:', row);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const columns = [
        { id: 'name', label: 'Customer Name', minWidth: 170 },
        { id: 'amount', label: 'Order Amount', minWidth: 170 },
        { id: 'payment', label: 'Payment', minWidth: 170 },
        { id: 'status', label: 'Status', minWidth: 170 },
        { id: 'date', label: 'Date', minWidth: 100 },
        { id: 'edit', label: 'Edit', minWidth: 50, align: 'center' },
        { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    return (
        <div className="sub-category-datatable common-css">
            <span className='sub-category-datatable-title'>All Orders</span>
            <StickyHeadTable columns={columns} rows={orders} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable