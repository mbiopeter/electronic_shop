import React, { useEffect, useState } from 'react'
import './Category.css';
import '../../css/common.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/category/DataTable';
import AddCategory from '../../components/popups/addcategory/AddCategory';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
const Category = () => {
    const [showAddNewProduct, setShowAddNewProduct] = useState(false);

    //roles useState
    const[viewCategoryRole, setViewCategoryRole] = useState(false);
    const[addCategoryRole, setAddCategoryRole] = useState(false);

        //check and set user roles
    useEffect(() =>{
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();
            setAddCategoryRole(handleCheckRole(roles.addSystemVariables,'create category'));
            setViewCategoryRole(handleCheckRole(roles.viewDetails,'all categories'));   
        } 
        getCurrentUsersRoles();     
    },[])

    const handleAddNew = () => {
        setShowAddNewProduct(true);
    }

    const handleHidePopUp = () => {
        setShowAddNewProduct(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            {addCategoryRole &&<AddCategory 
                handleHidePopUp={handleHidePopUp} 
                showAddNewProduct={showAddNewProduct} 
            />}
            <div className="category">
                <SubHeading
                    title='My Categories'
                    handleAddNew = {handleAddNew}
                    assignedRole={addCategoryRole}
                />
                {viewCategoryRole && (
                    <div className="category-table">
                        <DataTable />
                    </div>   
                )}
            </div>
        </>
    )
}

export default Category