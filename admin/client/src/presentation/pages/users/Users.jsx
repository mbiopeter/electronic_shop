import React, { useEffect, useState } from 'react'
import './Users.css';
import '../../css/common.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import { handleCheckRole } from '../../../logical/settings/Roles';
import DataTable from '../../components/users/DataTable';
import AddUsers from '../../components/popups/addUsers/AddUsers';
import {fetchCurrentUserRoles } from '../../../data/roles/Roles';
const Users = () => {
    const [showAddUsers, setShowAddUsers] = useState(false);

    const [reload, setReload] = useState(false);
    //roles useState
    const[viewUsersRole, setViewUserRole] = useState(false);
    const[addUsersRole, setAddUsersRole] = useState(false);

        //check and set user roles
    useEffect(() =>{
        const getCurrentUsersRoles = async () => {
            //get all the current user Roles
            const roles = await fetchCurrentUserRoles();
            setAddUsersRole(handleCheckRole(roles.addSystemVariables,'create users'));
            setViewUserRole(handleCheckRole(roles.viewDetails,'all users'));
        }
        getCurrentUsersRoles();
    },[])

    const handleAddNew = () => {
        setShowAddUsers(true);
    }

    const handleHidePopUp = () => {
        setShowAddUsers(false);
    }

    return (
        <>
            {/* Add new product pop up */}
            {addUsersRole &&<AddUsers 
                reload={reload}
                setReload={setReload}
                handleHidePopUp={handleHidePopUp} 
                showAddUsers={showAddUsers} 
            />} 
            <div className="Users">
                <SubHeading
                    title='Users'
                    handleAddNew = {handleAddNew}
                    assignedRole={addUsersRole}
                />
                {viewUsersRole && (
                    <div className="Users-table">
                        <DataTable reload={reload} setReload={setReload}/>
                    </div>   
                )}
            </div>
        </>
    )
}

export default Users