import React, { useEffect, useState } from 'react'
import '../../css/common.css';
import './VariantType.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/variantType/DataTable';
import AddVariantType from '../../components/popups/addVariantType/AddVariantType';
import { addSystemVariables, viewDetails } from '../../../data/roles/Roles';
import { handleCheckRole } from '../../../logical/settings/Roles';
const VariantType = () => {
    const [showAddVariantType, setShowAddVariantType] = useState(false);

    //roles useState
    const[viewVariantTypeRole, setViewVariantTypeRole] = useState(false);
    const[addVariantTypeRole, setAddVariantTypeRole] = useState(false);

        //check and set user roles
    useEffect(() =>{
        setAddVariantTypeRole(handleCheckRole(addSystemVariables,'create variant type'));
        setViewVariantTypeRole(handleCheckRole(viewDetails,'all varient types'));         
    },[])

    const handleAddNew = () => {
        setShowAddVariantType(true);
    }

    const handleHidePopUp = () => {
        setShowAddVariantType(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            {addVariantTypeRole && <AddVariantType
                handleHidePopUp={handleHidePopUp} 
                showAddVariantType={showAddVariantType} 
            /> }
            <div className="VariantType">
                <SubHeading
                    title='My VariantType'
                    handleAddNew = {handleAddNew}
                    assignedRole={addVariantTypeRole}
                />
                {viewVariantTypeRole &&<div className="VariantType-table">
                    <DataTable />
                </div>}     
            </div>
        </>
    )
}

export default VariantType