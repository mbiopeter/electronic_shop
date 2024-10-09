import React, { useEffect, useState } from 'react'
import './SubCategory.css';
import '../../css/common.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/subCategory/DataTable';
import AddSubCategory from '../../components/popups/addSubCategory/AddSubCategory';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
const SubCategory = () => {
    const [showAddSubCategory, setShowAddSubCategory] = useState(false);

    //roles useState
    const[viewSubCategoryRole, setViewSubCategoryRole] = useState(false);
    const[addSubCategoryRole, setAddSubCategoryRole] = useState(false);

    const [reload,setReload] = useState(false);

        //check and set user roles
    useEffect(() =>{
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();
            setAddSubCategoryRole(handleCheckRole(roles.addSystemVariables,'create sub category'));
            setViewSubCategoryRole(handleCheckRole(roles.viewDetails,'all categories'));    
        } 
        getCurrentUsersRoles()    
    },[])

    const handleAddNew = () => {
        setShowAddSubCategory(true);
    }

    const handleHidePopUp = () => {
        setShowAddSubCategory(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            {addSubCategoryRole &&<AddSubCategory 
                handleHidePopUp={handleHidePopUp} 
                showAddSubCategory={showAddSubCategory} 
                reload={reload}
                setReload={setReload}
            />}
            <div className="SubCategory">
                <SubHeading
                    title='My Sub Categories'
                    handleAddNew = {handleAddNew}
                    assignedRole={addSubCategoryRole}
                />
                {viewSubCategoryRole &&
                    <div className="SubCategory-table">
                        <DataTable 
                            reload={reload}
                            setReload={setReload}
                        />
                    </div>     
                }
            </div>
        </>
    )
}

export default SubCategory