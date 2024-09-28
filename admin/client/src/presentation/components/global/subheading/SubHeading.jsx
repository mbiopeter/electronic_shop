import React, { useEffect, useState } from 'react';
import './SubHeading.css';
import { Add, Reload } from '../../../../logical/consts/icons';
import '../../../css/common.css';
import DropdownDemo from '../select/Select';
import { orderStatus } from '../../../../data/orders/table_data';
import { useLocation } from 'react-router-dom';

const SubHeading = ({
    title,
    handleAddNew,
    value,
    setValue,
    assignedRole,
}) => {
    const [currentPage, setCurrentPage] = useState();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');

    

    useEffect(() => {
        if (pathSegments[1] === 'details') {
            setCurrentPage(pathSegments[1]);
        } else if (pathSegments[1] === 'category' && pathSegments[2] === 'details') {
            setCurrentPage(pathSegments[1]);
        } else if (pathSegments[1] === 'subCategory' && pathSegments[2] === 'details') {
            setCurrentPage(pathSegments[1]);
        }
    }, [pathSegments]);

    const handleReload = () => {
        window.location.reload();
    };

    const [items, setItems] = useState([]);

    return (
        <div className="subheading-left-title">
            <span className="subheading-left-title-name">
                {title}
            </span>
            <div className="subheading-left-title-right">
                {title === 'My Orders' ? (
                    <DropdownDemo
                        width={'300px'}
                        allItems={orderStatus}
                        placeholder={'Filter Orders By Status'}
                        value={value}
                        setValue={setValue}
                        items={items}
                        setItems={setItems}
                    />
                ) : assignedRole === true ? (
                    <button className='subheading-left-title-right-btn' onClick={handleAddNew}>
                        <Add className='subheading-icons'/>
                        <span>
                            {currentPage === 'details'
                                ? 'Edit Product'
                                : currentPage === 'category'
                                ? 'Edit Category'
                                : currentPage === 'subCategory'
                                ? 'Edit Sub Category'
                                : 'Add New'}
                        </span>
                    </button>
                ) : null}
                <Reload onClick={handleReload} className='Reload-icon subheading-icons' />
            </div>
        </div>
    );
};

export default SubHeading;
