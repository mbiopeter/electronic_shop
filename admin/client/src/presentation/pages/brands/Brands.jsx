import React, { useEffect, useState } from 'react'
import './Brands.css';
import '../../css/common.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/brands/DataTable';
import AddBrands from '../../components/popups/addBrands/AddBrands';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
const Brands = () => {
    const [showAddBrands, setShowAddBrands] = useState(false);


    //roles useState
    const[viewBrandRole, setViewBrandRole] = useState(false);
    const[addBrandRole, setAddBrandRole] = useState(false);

        //check and set user roles
    useEffect(() =>{
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();
            setAddBrandRole(handleCheckRole(roles.addSystemVariables,'create brands'));
            setViewBrandRole(handleCheckRole(roles.viewDetails,'all brands'));      
        }
        getCurrentUsersRoles();
    },[])


    const handleAddNew = () => {
        setShowAddBrands(true);
    }

    const handleHidePopUp = () => {
        setShowAddBrands(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            {addBrandRole &&<AddBrands 
                handleHidePopUp={handleHidePopUp} 
                showAddBrands={showAddBrands} 
            />}
            <div className="Brands">
                <SubHeading
                    title='My Brands'
                    handleAddNew = {handleAddNew}
                    assignedRole={addBrandRole}
                />
                {viewBrandRole &&<div className="Brands-table">
                    <DataTable />
                </div>}         
            </div>
        </>
    )
}

export default Brands