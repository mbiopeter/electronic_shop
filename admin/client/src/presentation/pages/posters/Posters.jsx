import React, { useEffect, useState } from 'react'
import '../../css/common.css';
import './Posters.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import DataTable from '../../components/posters/DataTable';
import AddPosters from '../../components/popups/addPosters/AddPosters';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { fetchCurrentUserRoles } from '../../../data/roles/Roles';
const Posters = () => {
    const [showAddPosters, setShowAddPosters] = useState(false);


    //roles useState
    const[viewPostersRole, setViewPostersRole] = useState(false);
    const[addPostersRole, setAddPostersRole] = useState(false);

    const [reload,setReload] = useState(false);

        //check and set user roles
    useEffect(() =>{
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();
            setAddPostersRole(handleCheckRole(roles.addSystemVariables,'create posters'));
            setViewPostersRole(handleCheckRole(roles.viewDetails,'all posters'));   
        }
        getCurrentUsersRoles();
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
                reload={reload}
                setReload={setReload}
            />} 
            <div className="Posters">
                <SubHeading
                    title='My Posters'
                    handleAddNew = {handleAddNew}
                    assignedRole={addPostersRole}
                />
                {viewPostersRole && <div className="Posters-table">
                    <DataTable 
                        reload={reload}
                        setReload={setReload}
                    />
                </div>}     
            </div>
        </>
    )
}

export default Posters