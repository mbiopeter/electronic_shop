import React, { useState } from 'react';
import './SubHeading.css';
import { Add, Reload } from '../../../../logical/consts/icons';
import '../../../css/common.css';
import DropdownDemo from '../select/Select';
import { orderStatus } from '../../../../data/orders/table_data';
const SubHeading = ({
    title,
    handleAddNew,
    value,
    setValue
}) => {
    const handleReload = () => {
        window.location.reload();
    }
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
                        allItems = {orderStatus}
                        placeholder={'Filter Orders By Status'}
                        value={value}
                        setValue={setValue}
                        items={items}
                        setItems={setItems}
                    />
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