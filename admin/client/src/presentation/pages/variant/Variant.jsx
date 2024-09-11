import React, { useEffect, useState } from 'react'
import '../../css/common.css';
import './Variant.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/variant/DataTable';
import AddVariant from '../../components/popups/addVariant/AddVariant';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { addSystemVariables, viewDetails } from '../../../data/roles/Roles';
const Variant = () => {
    const [showAddVariant, setShowAddVariant] = useState(false);

    //roles useState
    const[viewVariantRole, setViewVariantRole] = useState(false);
    const[addVariantRole, setAddVariantRole] = useState(false);

        //check and set user roles
    useEffect(() =>{
        setAddVariantRole(handleCheckRole(addSystemVariables,'create variant'));
        setViewVariantRole(handleCheckRole(viewDetails,'all varients'));         
    },[])

    const handleAddNew = () => {
        setShowAddVariant(true);
    }

    const handleHidePopUp = () => {
        setShowAddVariant(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            <AddVariant
                handleHidePopUp={handleHidePopUp} 
                showAddVariant={showAddVariant} 
            />
            <div className="Variant">
                <SubHeading
                    title='My Variant'
                    handleAddNew = {handleAddNew}
                    assignedRole={addVariantRole}
                />
                {viewVariantRole && <div className="Variant-table">
                    <DataTable />
                </div>}
            </div>
        </>
    )
}

export default Variant