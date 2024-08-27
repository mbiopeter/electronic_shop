import React from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { posters } from '../../../data/posters/table_data';
const DataTable = () => {
    const handleEdit = (row) => {
        console.log('Edit:', row);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const columns = [
        { id: 'name', label: 'Category Name', minWidth: 120 },
        { id: 'edit', label: 'Edit', minWidth: 120, align: 'center' },
        { id: 'delete', label: 'Delete', minWidth: 120, align: 'center' },
    ];
    return (
        <div className="Posters-datatable common-css">
            <span className='Posters-datatable-title'>All Posters</span>
            <StickyHeadTable columns={columns} rows={posters} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable