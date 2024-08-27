import React, { useState } from 'react'
import '../../css/common.css';
import './Variant.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/variant/DataTable';
import AddVariant from '../../components/popups/addVariant/AddVariant';
const Variant = () => {
    const [showAddVariant, setShowAddVariant] = useState(false);

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
                />
                <div className="Variant-table">
                    <DataTable />
                </div>     
            </div>
        </>
    )
}

export default Variant