import React, { useEffect, useState } from 'react'
import Roles from '../../components/roles/Roles'
import './Roles.css';
import SubHeading from '../../components/global/subheading/SubHeading';
import { useLocation } from 'react-router-dom';
import { usersUrl } from '../../../logical/consts/apiUrl';
import { handleFetchOneUser } from '../../../logical/consts/fetch';

const RolesPage = () => {
    const[user,setUser] = useState({});
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const PageName = pathSegments[3];
    const index = PageName;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await handleFetchOneUser(usersUrl,'one',index); 
                setUser(usersData); 
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="rolePage">
            <SubHeading
                title={`${user.secondName} ${user.firstName} Roles`}
            />
            <div className="rolePageRoles">
                <Roles />
            </div>
        </div>
    )
}

export default RolesPage