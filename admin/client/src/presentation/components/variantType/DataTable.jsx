import React from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { variantType } from '../../../data/variantType/table_data';
const DataTable = () => {
    const handleEdit = (row) => {
        console.log('Edit:', row);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const columns = [
        { id: 'type', label: 'Variant Type', minWidth: 120 },
        { id: 'date', label: 'Added Date', minWidth: 120 },
        { id: 'edit', label: 'Edit', minWidth: 120, align: 'center' },
        { id: 'delete', label: 'Delete', minWidth: 120, align: 'center' },
    ];
    return (
        <div className="VariantType-datatable common-css">
            <span className='VariantType-datatable-title'>All Variant Type</span>
            <StickyHeadTable columns={columns} rows={variantType} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable