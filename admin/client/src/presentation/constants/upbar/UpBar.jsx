import React from 'react'
import './UpBar.css';
import { Search,LogoutIcon, MenuIcon } from '../../../logical/consts/icons';
import { profile } from '../../../logical/consts/images';
import { Link, useLocation } from 'react-router-dom';
import  {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 
const UpBar = ({
    setCloseMobile,
    appWidth
}) => {
    const [homeTitle, setHomeTitle]  = useState();
    const[homeRoute,setHomeRoute] = useState();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const PageName = pathSegments[1];
    const homeTitlesList = ['Dashboard','Category','Sub Category','Brands','Orders','Coupon','Notifications','Posters','Variant Type','Variant','Details','Settings','Users','Emails','Profile'];
    const homeRoutesList = ['dashboard','category','subCategory','brands','orders','coupon','notification','posters','variantType','variant','details','settings','users','email','profile'];
    const[user,setUser] = useState();
    useEffect(() => {
        for(var i = 0; i < homeTitlesList.length; i++){
            if(i === 0){
                setHomeTitle(homeTitlesList[i]);
                setHomeRoute(homeRoutesList[i]);
            }
            if(PageName === homeRoutesList[i]){
                setHomeTitle(homeTitlesList[i]);
                setHomeRoute(homeRoutesList[i]);
            }
        }
    },[PageName])
    const navigate = useNavigate(); 
    const handleLogOut = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('rememberMe');
        navigate('/login');
    }

    const handleOpenMobile = () => {
        setCloseMobile(false);
    }
    useEffect(() => {
        setUser(localStorage.getItem('username'));
    },[]);

    return (
        <div className="UpBar">
            <span className='upbar-title-links'>
                {appWidth <= 992 &&<MenuIcon className='mobileOpenIcon' onClick={handleOpenMobile}/>}
                <Link className='UpBar-title' style={{textDecoration:'none'}} to={`${homeRoute}`}>{homeTitle}</Link>
            </span>
            <div className="UpBar-right">
                <div className="UpBar-search">
                    <input placeholder="Search" className="UpBar-search-input" type="text" />
                    <div className="search-btn">
                        <Search className='Search-icon'/>
                    </div>
                </div>
                
                    <div className="UpBar-profile">
                        <img  src={profile}/>
                        <span>{user}</span>
                        <LogoutIcon onClick={handleLogOut}/>
                    </div>
                
            </div>
        </div>
    )
}

export default UpBar