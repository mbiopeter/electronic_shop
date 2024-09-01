import React from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { brands } from '../../../data/brands/table_data';
import { useNavigate } from 'react-router-dom';
const DataTable = () => {
    const navigate = useNavigate();
    const handleEdit = (row) => {
        navigate(`/brands/details/${row.id}`);
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const columns = [
        { id: 'name', label: 'Brand Name', minWidth: 170 },
        { id: 'subCategory', label: 'Sub Category', minWidth: 170 },
        { id: 'addedDate', label: 'Added Date', minWidth: 100 },
        { id: 'edit', label: 'Edit', minWidth: 50, align: 'center' },
        { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    return (
        <div className="sub-category-datatable common-css">
            <span className='sub-category-datatable-title'>All Brands</span>
            <StickyHeadTable columns={columns} rows={brands} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable