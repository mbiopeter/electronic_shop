import React from 'react';
import './DataTable.css';
import '../../css/common.css';
import StickyHeadTable from '../global/Table';
import { subCategories } from '../../../data/subCategory/table_data';
import { useNavigate } from 'react-router-dom';
const DataTable = () => {
    const navigate = useNavigate();
    const handleEdit = (row) => {
        navigate(`/subCategory/details/${row.id}`);
    };


    const handleDelete = (row) => {
        console.log('Delete:', row);
    };
    const columns = [
        { id: 'name', label: 'Sub Category Name', minWidth: 170 },
        { id: 'category', label: 'Category Name', minWidth: 170 },
        { id: 'addedDate', label: 'Added Date', minWidth: 100 },
        { id: 'edit', label: 'Edit', minWidth: 50, align: 'center' },
        { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' },
    ];
    return (
        <div className="sub-category-datatable common-css">
            <span className='sub-category-datatable-title'>All Sub Categories</span>
            <StickyHeadTable columns={columns} rows={subCategories} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}

export default DataTable