import React, { useEffect, useState } from 'react'
import '../../css/common.css';
import './Posters.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/posters/DataTable';
import AddPosters from '../../components/popups/addPosters/AddPosters';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { addSystemVariables, viewDetails } from '../../../data/roles/Roles';
const Posters = () => {
    const [showAddPosters, setShowAddPosters] = useState(false);


    //roles useState
    const[viewPostersRole, setViewPostersRole] = useState(false);
    const[addPostersRole, setAddPostersRole] = useState(false);

        //check and set user roles
    useEffect(() =>{
        setAddPostersRole(handleCheckRole(addSystemVariables,'create posters'));
        setViewPostersRole(handleCheckRole(viewDetails,'all posters'));         
    },[])


    const handleAddNew = () => {
        setShowAddPosters(true);
    }

    const handleHidePopUp = () => {
        setShowAddPosters(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            {addPostersRole && <AddPosters
                handleHidePopUp={handleHidePopUp} 
                showAddPosters={showAddPosters} 
            />} 
            <div className="Posters">
                <SubHeading
                    title='My Posters'
                    handleAddNew = {handleAddNew}
                    assignedRole={addPostersRole}
                />
                {viewPostersRole && <div className="Posters-table">
                    <DataTable />
                </div>}     
            </div>
        </>
    )
}

export default Posters