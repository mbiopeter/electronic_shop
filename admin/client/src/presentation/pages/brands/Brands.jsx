import React, { useEffect, useState } from 'react'
import './Brands.css';
import '../../css/common.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/brands/DataTable';
import AddBrands from '../../components/popups/addBrands/AddBrands';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { addSystemVariables, viewDetails } from '../../../data/roles/Roles';
const Brands = () => {
    const [showAddBrands, setShowAddBrands] = useState(false);


    //roles useState
    const[viewBrandRole, setViewBrandRole] = useState(false);
    const[addBrandRole, setAddBrandRole] = useState(false);

        //check and set user roles
    useEffect(() =>{
        setAddBrandRole(handleCheckRole(addSystemVariables,'create brands'));
        setViewBrandRole(handleCheckRole(viewDetails,'all brands'));         
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