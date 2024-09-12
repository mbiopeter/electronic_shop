import React from 'react'
import Roles from '../../components/roles/Roles'
import './Roles.css';
import { users } from '../../../data/users/table_data';
import SubHeading from '../../components/global/subheading/SubHeading';
import { useLocation } from 'react-router-dom';

const RolesPage = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const PageName = pathSegments[3];
    const index = PageName - 1;
    const firstName = users[index].firstName;
    const secondName = users[index].secondName;
    return (
        <div className="rolePage">
            <SubHeading
                title={`${firstName} ${secondName} Roles`}
            />
            <div className="rolePageRoles">
                <Roles />
            </div>
        </div>
    )
}

export default RolesPage