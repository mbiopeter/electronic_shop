import React, { useState } from 'react'
import './Category.css';
import '../../css/common.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/category/DataTable';
import AddCategory from '../../components/popups/addcategory/AddCategory';
const Category = () => {
    const [showAddNewProduct, setShowAddNewProduct] = useState(false);

    const handleAddNew = () => {
        setShowAddNewProduct(true);
    }

    const handleHidePopUp = () => {
        setShowAddNewProduct(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            <AddCategory 
                handleHidePopUp={handleHidePopUp} 
                showAddNewProduct={showAddNewProduct} 
            />
            <div className="category">
                <SubHeading
                    title='My Categories'
                    handleAddNew = {handleAddNew}
                />
                <div className="category-table">
                    <DataTable />
                </div>     
            </div>
        </>
    )
}

export default Category