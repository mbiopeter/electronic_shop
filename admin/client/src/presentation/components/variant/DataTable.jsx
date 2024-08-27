import React from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { varient } from '../../../data/varient/table_data';
const DataTable = () => {
    const handleEdit = (row) => {
        console.log('Edit:', row);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const columns = [
        { id: 'name', label: 'Variant', minWidth: 120 },
        { id: 'type', label: 'Variant Type', minWidth: 120 },
        { id: 'date', label: 'Added Date', minWidth: 120 },
        { id: 'edit', label: 'Edit', minWidth: 120, align: 'center' },
        { id: 'delete', label: 'Delete', minWidth: 120, align: 'center' },
    ];
    return (
        <div className="Variant-datatable common-css">
            <span className='Variant-datatable-title'>All Variant Type</span>
            <StickyHeadTable columns={columns} rows={varient} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable