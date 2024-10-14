import React, { useEffect, useState } from 'react'
import '../../css/common.css';
import './Variant.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/variant/DataTable';
import AddVariant from '../../components/popups/addVariant/AddVariant';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
const Variant = () => {
    const [showAddVariant, setShowAddVariant] = useState(false);

    //roles useState
    const[viewVariantRole, setViewVariantRole] = useState(false);
    const[addVariantRole, setAddVariantRole] = useState(false);

    const [reload,setReload] = useState(false);

        //check and set user roles
    useEffect(() =>{
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();
            setAddVariantRole(handleCheckRole(roles.addSystemVariables,'create variant'));
            setViewVariantRole(handleCheckRole(roles.viewDetails,'all variants')); 
        }
        getCurrentUsersRoles();
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
                reload={reload}
                setReload={setReload}
            />
            <div className="Variant">
                <SubHeading
                    title='My Variant'
                    handleAddNew = {handleAddNew}
                    assignedRole={addVariantRole}
                />
                {viewVariantRole && <div className="Variant-table">
                    <DataTable 
                        reload={reload}
                        setReload={setReload}
                    />
                </div>}
            </div>
        </>
    )
}

export default Variant