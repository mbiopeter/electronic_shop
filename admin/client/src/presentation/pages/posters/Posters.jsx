import React, { useState } from 'react'
import '../../css/common.css';
import './Posters.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/posters/DataTable';
import AddPosters from '../../components/popups/addPosters/AddPosters';
const Posters = () => {
    const [showAddPosters, setShowAddPosters] = useState(false);

    const handleAddNew = () => {
        setShowAddPosters(true);
    }

    const handleHidePopUp = () => {
        setShowAddPosters(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            <AddPosters
                handleHidePopUp={handleHidePopUp} 
                showAddPosters={showAddPosters} 
            /> 
            <div className="Posters">
                <SubHeading
                    title='My Posters'
                    handleAddNew = {handleAddNew}
                />
                <div className="Posters-table">
                    <DataTable />
                </div>     
            </div>
        </>
    )
}

export default Posters