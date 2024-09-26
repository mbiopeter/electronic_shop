import React, { useEffect, useState } from 'react';
import './Roles.css';
import ControlledSwitch from '../switch/Switch';
import { fetchUserRoles } from '../../../data/roles/Roles';
import { useLocation } from 'react-router-dom';
import Loader from '../loading/Loading';
import { handleApiSwitchChange } from '../../../logical/users/Users';

const Roles = () => {
    const [switchStates, setSwitchStates] = useState({});
    const [userRoles, setUserRoles] = useState(null);

    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const userId = pathSegments[3];  // Extract userId from the URL

    useEffect(() => {
        const getUserRoles = async () => {
            try {
                // Fetch roles from the server
                const allRoles = await fetchUserRoles(userId);
                setUserRoles(allRoles); 

                // Initialize switch states with data from the server
                initializeSwitchStates(allRoles);
            } catch (err) {
                console.log(err);
            }
        };
        getUserRoles();
    }, [userId]);

    // Function to initialize switch states from API data
    const initializeSwitchStates = (data) => {
        const initialStates = {};
        for (const category in data) {
            data[category].forEach(item => {
                initialStates[item.id] = item.allowed;
            });
        }
        setSwitchStates(initialStates);
    };

    // Function to handle switch state changes
    const handleSwitchChange = (key, value) => {
        setSwitchStates(prevState => ({
            ...prevState,
            [key]: value,
        }));
        handleApiSwitchChange(key, value, userId);
    };

    // Function to render switch items for a section
    const renderSwitchItems = (data) => {
        return data.map((role) => {
            const key = role.id;
            return (
                <div className="RolesContainerItem" key={role.id}>
                    <span>{role.name}</span>
                    <ControlledSwitch
                        checked={switchStates[key]} 
                        setChecked={(value) => handleSwitchChange(key, value)}
                    />
                </div>
            );
        });
    };

    // Show loading state while waiting for data from the server
    if (!userRoles) {
        return <Loader />;  
    }

    // Render UI using the fetched userRoles data
    return (
        <div className='Roles'>
            <div className="RolesHeading">
                <span>Add System Variables</span>
            </div>
            <div className="RolesContainer">
                {renderSwitchItems(userRoles.addSystemVariables)}
            </div>
            <hr />

            <div className="RolesHeading">
                <span>Edit System Variables</span>
            </div>
            <div className="RolesContainer">
                {renderSwitchItems(userRoles.editSystemVariables)}
            </div>
            <hr />

            <div className="RolesHeading">
                <span>View Details</span>
            </div>
            <div className="RolesContainer">
                {renderSwitchItems(userRoles.viewDetails)}
            </div>
            <hr />

            <div className="RolesHeading">
                <span>Settings</span>
            </div>
            <div className="RolesContainer">
                {renderSwitchItems(userRoles.settings)}
            </div>
        </div>
    );
};

export default Roles;
