import React, { useEffect, useState } from 'react'
import './Orders.css';
import '../../css/common.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/orders/DataTable';
import { orders } from '../../../data/orders/table_data';
import OrderDetails from '../../components/popups/orderDetails/OrderDetails';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
const Orders = () => {


    //roles useState
    const[viewOrderRole, setViewOrderRole] = useState(false);

        //check and set user roles
    useEffect(() =>{
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();
            setViewOrderRole(handleCheckRole(roles.viewDetails,'all orders'));   
        }
        getCurrentUsersRoles();
    },[])

    const [value, setValue] = useState('');
    const filteredOrders = [];
    const [finalData,setFinalData] = useState([]);
    const [showOderDetailsPopUp, setShowOderDetailsPopUp] = useState(false)
    let i = 0;
    useEffect(() => {
        for(i = 0; i < orders.length; i++){
            if(orders[i].status === value){
                filteredOrders.push(orders[i]);
            } 
        }
        if(value === ''){
            setFinalData(orders);
        }
        else{
            setFinalData(filteredOrders)
        }
        
    },[value]);
    const handleHidePopUp = () => {
        setShowOderDetailsPopUp(false);
    }
    const handleShowPopUp = (id) => {
        setShowOderDetailsPopUp(true);
    }
    return (
        <>
            <OrderDetails 
                handleHidePopUp={handleHidePopUp} 
                showOderDetailsPopUp={showOderDetailsPopUp} 
            />
            <div className="Orders">
                <SubHeading
                    value={value}
                    setValue={setValue}
                    title='My Orders'
                />
                {viewOrderRole &&<div className="Orders-table">
                    <DataTable 
                        handleShowPopUp={handleShowPopUp}
                        filteredOrders={finalData}
                    />
                </div>}     
            </div>
        </>
    )
}

export default Orders