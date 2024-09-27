import React, { useEffect, useState } from 'react'
import '../../css/common.css';
import './VariantType.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/variantType/DataTable';
import AddVariantType from '../../components/popups/addVariantType/AddVariantType';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
const VariantType = () => {
    const [showAddVariantType, setShowAddVariantType] = useState(false);

    //roles useState
    const[viewVariantTypeRole, setViewVariantTypeRole] = useState(false);
    const[addVariantTypeRole, setAddVariantTypeRole] = useState(false);

        //check and set user roles
    useEffect(() =>{
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();
            setAddVariantTypeRole(handleCheckRole(roles.addSystemVariables,'create variant type'));
            setViewVariantTypeRole(handleCheckRole(roles.viewDetails,'all variant types'));  
            console.log(roles);
        }
        getCurrentUsersRoles();
        
        
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