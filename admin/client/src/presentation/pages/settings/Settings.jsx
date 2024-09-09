import React, { useState } from 'react'
import './Settings.css'
import Appearance from '../../components/appearance/Appearance';
import Roles from '../../components/roles/Roles';
const Settings = ({
  activeMode,
  setActiveMode,
  setTransparentSideBar,
  sideBarChecked,
  setSideBarChecked
}) => {
  const[active,setActive] = useState('Appearance');
  const handleActive = (active) => {
    setActive(active);
  }
  return (
      <div className='settings'>
        <div className="settingsNavigation">
          <div onClick={() => handleActive('Appearance')} className={`settingsNavigationItems ${active === 'Appearance' ? 'active':null}`}>
            <span>Appearance</span>
          </div>
          <div onClick={() => handleActive('Basic')} className={`settingsNavigationItems ${active === 'Basic' ? 'active':null}`}>
            <span>Basic Info</span>
          </div>
          <div onClick={() => handleActive('Roles')} className={`settingsNavigationItems ${active === 'Roles' ? 'active':null}`}>
            <span>Roles</span>
          </div>
          <div onClick={() => handleActive('Notifications')} className={`settingsNavigationItems ${active === 'Notifications' ? 'active':null}`}>
            <span>Notifications</span>
          </div>
        </div>
        <div className="settingsNavigationHeader">
          {active === 'Appearance' &&<span>Appearance</span>}
          {active === 'Basic' &&<span>Basic</span>}
          {active === 'Roles' &&<span>Roles</span>}
          {active === 'Notifications' &&<span>Notifications</span>}
        </div>
        <hr />
        {active === 'Appearance' 
          && <Appearance 
            activeMode={activeMode}  
            setActiveMode={setActiveMode} 
            setTransparentSideBar={setTransparentSideBar}
            sideBarChecked={sideBarChecked}
            setSideBarChecked={setSideBarChecked}
          />
        }
        {active === 'Roles' && <Roles />}
      </div>
  )
}

export default Settings