import React, { useEffect, useState } from 'react';
import './Roles.css';
import ControlledSwitch from '../switch/Switch';
import { addSystemVariables, editSystemVariables, settings, viewDetails } from '../../../data/roles/Roles';
import { handleRoleChange } from '../../../logical/settings/Roles';

const Roles = () => {
    // State to manage all switch states
    const [switchStates, setSwitchStates] = useState({});

    useEffect(() => {
        // Function to initialize switch states from API data
        const initializeSwitchStates = (...dataSets) => {
            const initialStates = {};
            dataSets.forEach(data => {
                data.forEach(item => {
                    initialStates[item.id] = item.allowed;
                });
            });
            setSwitchStates(initialStates);
        };

        // Initialize the switch states with data from all sections
        initializeSwitchStates(addSystemVariables, editSystemVariables, viewDetails, settings);
    }, []);

    // Function to handle switch state changes
    const handleSwitchChange = (key, value) => {
        setSwitchStates(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    //Function to handle switch status change API
    useEffect(() => {
        handleRoleChange(switchStates);
    },[switchStates]);

    // Function to render switch items for a section
    const renderSwitchItems = (data) => {
        return data.map((role) => {
            const key = role.id
            //.replace(/ /g, '');
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

    return (
        <div className='Roles'>
            <div className="RolesHeading">
                <span>Add System Variables</span>
            </div>
            <div className="RolesContainer">
                {renderSwitchItems(addSystemVariables)}
            </div>
            <hr />

            <div className="RolesHeading">
                <span>Edit System Variables</span>
            </div>
            <div className="RolesContainer">
                {renderSwitchItems(editSystemVariables)}
            </div>
            <hr />

            <div className="RolesHeading">
                <span>View Details</span>
            </div>
            <div className="RolesContainer">
                {renderSwitchItems(viewDetails)}
            </div>
            <hr />

            <div className="RolesHeading">
                <span>Settings</span>
            </div>
            <div className="RolesContainer">
                {renderSwitchItems(settings)}
            </div>
        </div>
    );
};

export default Roles;
