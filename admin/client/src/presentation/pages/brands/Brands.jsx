import React, { useState } from 'react'
import './Brands.css';
import '../../css/common.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/brands/DataTable';
import AddBrands from '../../components/popups/addBrands/AddBrands';
const Brands = () => {
    const [showAddBrands, setShowAddBrands] = useState(false);

    const handleAddNew = () => {
        setShowAddBrands(true);
    }

    const handleHidePopUp = () => {
        setShowAddBrands(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            <AddBrands 
                handleHidePopUp={handleHidePopUp} 
                showAddBrands={showAddBrands} 
            />
            <div className="Brands">
                <SubHeading
                    title='My Brands'
                    handleAddNew = {handleAddNew}
                />
                <div className="Brands-table">
                    <DataTable />
                </div>     
            </div>
        </>
    )
}

export default Brands