import React, { useEffect, useState } from 'react'
import './SubCategory.css';
import '../../css/common.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/subCategory/DataTable';
import AddSubCategory from '../../components/popups/addSubCategory/AddSubCategory';
import { addSystemVariables, viewDetails } from '../../../data/roles/Roles';
import { handleCheckRole } from '../../../logical/settings/Roles';
const SubCategory = () => {
    const [showAddSubCategory, setShowAddSubCategory] = useState(false);

    //roles useState
    const[viewSubCategoryRole, setViewSubCategoryRole] = useState(false);
    const[addSubCategoryRole, setAddSubCategoryRole] = useState(false);

        //check and set user roles
    useEffect(() =>{
        setAddSubCategoryRole(handleCheckRole(addSystemVariables,'create sub category'));
        setViewSubCategoryRole(handleCheckRole(viewDetails,'all categories'));         
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
            />}
            <div className="SubCategory">
                <SubHeading
                    title='My Sub Categories'
                    handleAddNew = {handleAddNew}
                    assignedRole={addSubCategoryRole}
                />
                {viewSubCategoryRole &&
                    <div className="SubCategory-table">
                        <DataTable />
                    </div>     
                }
            </div>
        </>
    )
}

export default SubCategory