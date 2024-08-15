import React from 'react';
import './SubHeading.css';
import { Add, Reload } from '../../../../logical/consts/icons';
import '../../../css/common.css';
const SubHeading = ({
    title,
    handleAddNew
}) => {
    const handleReload = () => {
        window.location.reload();
    }
    return (
        
        <div className="subheading-left-title">
            <span className="subheading-left-title-name">
                {title}
            </span>
            <div className="subheading-left-title-right">
                {title === 'My Orders' ? (
                    <select className='input-css' style={{width:'200px'}}>
                        <option value="" selected>Filter by Status</option>
                        <option value="all">All Orders</option>
                        <option value="processed">processed Orders</option>
                        <option value="pedding">Pending Orders</option>
                        <option value="shipped">Shipped Orders</option>
                        <option value="cancelled">Cancelled Orders</option>
                        <option value="returned">Returned Orders</option>
                    </select>
                ):(
                    <button className='subheading-left-title-right-btn' onClick={handleAddNew}>
                        <Add />    
                        <span >Add New</span>
                        
                    </button>
                    )}
                <Reload onClick={handleReload} className='Reload-icon' />
            </div>
        </div>
    )
}

export default SubHeading