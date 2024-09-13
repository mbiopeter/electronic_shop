import React from 'react';
import './Profile.css';
import '../../css/common.css'
import { Dashboard, Mode } from '../../../logical/consts/icons';

const Profile = () => {
    return (
        <div className='Profile'>
            <div className="ProfileHeader">
                <button>
                    <Dashboard />
                    <span>Reports</span>
                </button>
            </div>
            <div className="ProfileBody">
                <div className="ProfileLeft">
                    <div className="ProfileLeftHeader">
                        <span>General Information</span>
                        <button>
                            <Mode />
                            <span>Update Details</span>
                        </button>
                    </div>
                    <div className="ProfileLeftInputsContainer">
                        <div className="ProfileLeftInputsControl">
                            <span>First Name</span>
                            <input type="text" className="input-css" placeholder='Enter your first name'/>
                        </div>
                        <div className="ProfileLeftInputsControl">
                            <span>Second Name</span>
                            <input type="text" className="input-css" placeholder='Enter your second name'/>
                        </div>
                    </div>
                    <div className="ProfileLeftInputsContainer">
                        <div className="ProfileLeftInputsControl">
                            <span>ID Number</span>
                            <input type="text" className="input-css" placeholder='Enter your ID No'/>
                        </div>
                        <div className="ProfileLeftInputsControl">
                            <span>PhoneNumber</span>
                            <input type="text" className="input-css" placeholder='Enter your phone number'/>
                        </div>
                    </div>
                    <div className="ProfileLeftInputsControl ProfileLeftInputsControlFull">
                            <span>Username</span>
                            <input type="text" className="input-css" placeholder='Enter your username'/>
                        </div>
                </div>
                <div className="ProfileRight">
                    <div className="ProfileRightUpper">
                        <div className="ProfileRightBanner">
                            <div className="ProfileRightImgContainer">
                                <img src="https://images.pexels.com/photos/632125/pexels-photo-632125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                        </div>
                        <div className="ProfileRightUpperDetails">
                            <span>Senior Sofware Engineer</span>
                            <span>Supply Managements</span>
                        </div>
                        
                    </div>
                    <div className="ProfileRightLower"></div>
                </div>            
            </div>
        </div>
    )
}

export default Profile