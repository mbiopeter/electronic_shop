import React, { useState } from 'react'
import '../../css/common.css';
import './VariantType.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/variantType/DataTable';
import AddVariantType from '../../components/popups/addVariantType/AddVariantType';
const VariantType = () => {
    const [showAddVariantType, setShowAddVariantType] = useState(false);

    const handleAddNew = () => {
        setShowAddVariantType(true);
    }

    const handleHidePopUp = () => {
        setShowAddVariantType(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            <AddVariantType
                handleHidePopUp={handleHidePopUp} 
                showAddVariantType={showAddVariantType} 
            /> 
            <div className="VariantType">
                <SubHeading
                    title='My VariantType'
                    handleAddNew = {handleAddNew}
                />
                <div className="VariantType-table">
                    <DataTable />
                </div>     
            </div>
        </>
    )
}

export default VariantType