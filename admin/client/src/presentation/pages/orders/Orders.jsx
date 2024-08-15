import React, { useState } from 'react'
import './Orders.css';
import '../../css/common.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/orders/DataTable';
/* import AddOrders from '../../components/popups/addOrders/AddOrders'; */
const Orders = () => {
    const [showAddOrders, setShowAddOrders] = useState(false);

    const handleAddNew = () => {
        setShowAddOrders(true);
    }

    const handleHidePopUp = () => {
        setShowAddOrders(false);
    }

    return (
        <>
            {/* Add new product pop up */}
{/*             <AddOrders 
                handleHidePopUp={handleHidePopUp} 
                showAddOrders={showAddOrders} 
            /> */}
            <div className="Orders">
                <SubHeading
                    title='My Orders'
                    handleAddNew = {handleAddNew}
                />
                <div className="Orders-table">
                    <DataTable />
                </div>     
            </div>
        </>
    )
}

export default Orders