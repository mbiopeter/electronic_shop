import React from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { useNavigate } from 'react-router-dom';
const DataTable = ({
    subTitle,
    products
}) => {
    const navigate = useNavigate();
    const handleEdit = (row) => {
        navigate(`/details/${row.id}`);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'Category', label: 'Category', minWidth: 100 },
        { id: 'Sub_category', label: 'Sub Category', minWidth: 100 },
        { id: 'price', label: 'Price', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
        { id: 'edit', label: 'Edit', minWidth: 50, align: 'center' },
        { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    return (
        <div className="dashboard-datatable common-css">
            <span className='dashboard-datatable-title'>{subTitle}</span>
            <StickyHeadTable columns={columns} rows={products} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable