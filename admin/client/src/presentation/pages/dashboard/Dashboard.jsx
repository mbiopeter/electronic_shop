import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import '../../css/common.css'; 
import '../../css/variables.css';
import Desc from '../../components/dashboard/Desc';
import { description_data } from '../../../data/dashboard/desc';
import DataTable from '../../components/dashboard/DataTable';
import GaugeChart from 'react-gauge-chart';
import Order_details from '../../components/dashboard/Order_details';
import { order_details_data } from '../../../data/dashboard/order_details';
import SubHeading from '../../components/global/subheading/SubHeading';
import AddNewProduct from '../../components/popups/addnewproduct/AddNewProduct';
import {all_products, out_of_stock_products, limited_stock_product, other_stock_product} from '../../../data/dashboard/table_data';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
import { useLocation } from 'react-router-dom';


const Dashboard = ({
    products,
    setProducts
}) => {

    const [showAddNewProduct, setShowAddNewProduct] = useState(false);
    const [subTitle, setSubTitle] = useState('All Product');


    const itemCount = [
        all_products.length,
        out_of_stock_products.length,
        limited_stock_product.length,
        other_stock_product.length,
    ];


    //Roles Use States
    const[createProductsRole,setCreateProductsRole] = useState(false);
    const[viewAllProductsRole,setViewAllProductsRole] = useState(false);
    const[outOfStockRole,setOutOfStockRole] = useState(false);
    const[limitedStockRole,setLimitedStockRole] = useState(false);
    const[otherStockRole,setOtherStockRole] = useState(false);
    const stockDetailsArray = [
        viewAllProductsRole,
        outOfStockRole,
        limitedStockRole,
        otherStockRole
    ];
    const[orderPercentangeRole,setOrderPercentangeRole] = useState(false);
    const[allOrdersRole,setAllOrdersRole] = useState(false);
    const[pendingOrdersRole,setPendingOrdersRole] = useState(false);
    const[processedOrdersRole,setProcessedOrdersRole] = useState(false);
    const[cancelledOrdersRole,setCancelledOrdersRole] = useState(false);
    const[shippedOrdersRole,setShippedOrdersRole] = useState(false);
    const[returnedOrdersRole,setReturnedOrdersRole] = useState(false);
    const orderDetailsArray = [
        allOrdersRole,
        pendingOrdersRole,
        processedOrdersRole,
        cancelledOrdersRole,
        shippedOrdersRole,
        returnedOrdersRole
    ]



    const handleAddNew = () => {
        setShowAddNewProduct(true);
    }

    const handleHidePopUp = () => {
        setShowAddNewProduct(false);
    }
    const handleDescChange = (id) => {
        if(id === 1){
            setProducts(all_products);
            setSubTitle('All Product');
        }
        if (id === 2){
            setProducts(out_of_stock_products);
            setSubTitle('Out of Stock');
        }
        if (id === 3){
            setProducts(limited_stock_product);
            setSubTitle('Limited Stock');
        }
        if (id === 4){
            setProducts(other_stock_product);
            setSubTitle('Other Stock');
        }
    }



    //check and set user roles
    useEffect(() =>{
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();
        
            //set user roles states
            setCreateProductsRole(handleCheckRole(roles.addSystemVariables,'create products'));
            setViewAllProductsRole(handleCheckRole(roles.viewDetails,'all products'));        
            setOutOfStockRole(handleCheckRole(roles.viewDetails,'out of stock'));        
            setLimitedStockRole(handleCheckRole(roles.viewDetails,'limited stock'));        
            setOtherStockRole(handleCheckRole(roles.viewDetails,'other stock'));      

            setOrderPercentangeRole(handleCheckRole(roles.viewDetails,'order percentage'));        
            setAllOrdersRole(handleCheckRole(roles.viewDetails,'all orders'));        
            setPendingOrdersRole(handleCheckRole(roles.viewDetails,'pending orders'));        
            setProcessedOrdersRole(handleCheckRole(roles.viewDetails,'processed orders'));        
            setCancelledOrdersRole(handleCheckRole(roles.viewDetails,'cancelled orders'));        
            setShippedOrdersRole(handleCheckRole(roles.viewDetails,'shipped orders'));        
            setReturnedOrdersRole(handleCheckRole(roles.viewDetails,'returned orders'));    
        }
        

        getCurrentUsersRoles(); 
    },[])
    return (
        <>
            {/* Add new product pop up */}
            
            {createProductsRole && <AddNewProduct 
                handleHidePopUp={handleHidePopUp} 
                showAddNewProduct={showAddNewProduct} 
            />}
            

            <div className="dashboard">
                <div className="dashboard-left">
                    <SubHeading 
                        title='My Products'
                        handleAddNew={handleAddNew}
                        assignedRole={createProductsRole}
                    />
                    {/* description container */}
                    <div className="dashboard-left-desc">
                        {description_data.map((descriptions) => (
                            <>
                                {stockDetailsArray[descriptions.id -1] &&(
                                    <Desc
                                        key={descriptions.id}
                                        id = {descriptions.id}
                                        title={descriptions.title}
                                        percentage={itemCount[descriptions.id - 1] / itemCount[0] * 100 + '%'}
                                        count={itemCount[descriptions.id - 1]}
                                        background={descriptions.background}
                                        progress={descriptions.progress}
                                        handleDescChange={handleDescChange}
                                    />
                                )}
                            </>
                        ))}
                    </div>
                    {
                    viewAllProductsRole
                    || outOfStockRole
                    || limitedStockRole
                    || otherStockRole 
                    ? <div className="dashboard-left-table-container">
                            <DataTable 
                                subTitle = {subTitle}
                                products = {products}
                            />
                        </div>
                    :<></>}
                </div>
                {
                    orderPercentangeRole
                    || allOrdersRole
                    || pendingOrdersRole
                    || processedOrdersRole
                    || cancelledOrdersRole
                    || shippedOrdersRole
                    || returnedOrdersRole
                    ? <div className="dashboard-right common-css">
                        <span className='dashboard-right-title'>Orders Details</span>
                        {orderPercentangeRole && (
                            <GaugeChart
                                id="gauge-chart3"
                                nrOfLevels={4}
                                colors={["#4caf50", "#ff9800", "#f44336", "#00ff00"]} // Colors for the gauge
                                arcWidth={0.3}
                                percent={0.25}
                                textColor={'var(--text-color)'} 
                            />
                        )}
                        <div className="dashboard-right-details">
                            {order_details_data.map((data) => (
                                orderDetailsArray[data.id -1] &&( 
                                    <Order_details
                                        key={data.id}
                                        color={data.color}
                                        main_title={data.main_title}
                                        count={data.count}
                                    />
                                )
                            ))}
                        </div>
                        </div>
                    :<></>}
            </div>
        </>
    )
}

export default Dashboard;
