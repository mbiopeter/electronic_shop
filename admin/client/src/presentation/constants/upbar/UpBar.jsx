import React from 'react'
import './UpBar.css';
import { Search,Down, MenuIcon } from '../../../logical/consts/icons';
import { profile } from '../../../logical/consts/images';
import { Link, useLocation } from 'react-router-dom';
import  {useState,useEffect} from 'react'
const UpBar = ({
    setCloseMobile
}) => {
    const [homeTitle, setHomeTitle]  = useState();
    const[homeRoute,setHomeRoute] = useState();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const PageName = pathSegments[1];
    const homeTitlesList = ['Dashboard','Category','Sub Category','Brands','Orders','Coupon','Notifications','Posters','Variant Type','Variant','Details','Settings','Users','Emails','Profile'];
    const homeRoutesList = ['dashboard','category','subCategory','brands','orders','coupon','notification','posters','variantType','variant','details','settings','users','email','profile'];
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

    const handleOpenMobile = () => {
        setCloseMobile(false);
    }

    return (
        <div className="UpBar">
            <span className='upbar-title-links'>
                <MenuIcon className='mobileOpenIcon' onClick={handleOpenMobile}/>
                <Link className='UpBar-title' style={{textDecoration:'none'}} to={`${homeRoute}`}>{homeTitle}</Link>
            </span>
            <div className="UpBar-right">
                <div className="UpBar-search">
                    <input placeholder="Search" className="UpBar-search-input" type="text" />
                    <div className="search-btn">
                        <Search className='Search-icon'/>
                    </div>
                </div>
                <Link to='/profile' style={{textDecoration:'none'}}>
                    <div className="UpBar-profile">
                        <img  src={profile}/>
                        <span>Mbio Peter</span>
                        <Down/>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default UpBar