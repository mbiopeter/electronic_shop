import React, { useEffect, useState } from 'react'
import './Users.css';
import '../../css/common.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import { handleCheckRole } from '../../../logical/settings/Roles';
import { addSystemVariables, viewDetails } from '../../../data/roles/Roles';
import DataTable from '../../components/users/DataTable';
import AddUsers from '../../components/popups/addUsers/AddUsers';
const Users = () => {
    const [showAddUsers, setShowAddUsers] = useState(false);

    const [reload, setReload] = useState(false);
    //roles useState
    const[viewUsersRole, setViewUsersRole] = useState(false);
    const[addUsersRole, setAddUsersRole] = useState(false);

        //check and set user roles
    useEffect(() =>{
        setAddUsersRole(handleCheckRole(addSystemVariables,'create users'));
        setViewUsersRole(handleCheckRole(viewDetails,'all users'));         
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
                        <DataTable reload={reload}/>
                    </div>   
                )}
            </div>
        </>
    )
}

export default Users