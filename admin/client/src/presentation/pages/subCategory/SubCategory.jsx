import React, { useState } from 'react'
import './SubCategory.css';
import '../../css/common.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/subCategory/DataTable';
import AddSubCategory from '../../components/popups/addSubCategory/AddSubCategory';
const SubCategory = () => {
    const [showAddSubCategory, setShowAddSubCategory] = useState(false);

    const handleAddNew = () => {
        setShowAddSubCategory(true);
    }

    const handleHidePopUp = () => {
        setShowAddSubCategory(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            <AddSubCategory 
                handleHidePopUp={handleHidePopUp} 
                showAddSubCategory={showAddSubCategory} 
            />
            <div className="SubCategory">
                <SubHeading
                    title='My Sub Categories'
                    handleAddNew = {handleAddNew}
                />
                <div className="SubCategory-table">
                    <DataTable />
                </div>     
            </div>
        </>
    )
}

export default SubCategory