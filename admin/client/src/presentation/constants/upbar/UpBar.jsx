import React from 'react'
import './UpBar.css';
import { Search,Down } from '../../../logical/consts/icons';
import { profile } from '../../../logical/consts/images';
import { Link, useLocation } from 'react-router-dom';
import  {useState,useEffect} from 'react'
const UpBar = () => {
    const [homeTitle, setHomeTitle]  = useState();
    const[homeRoute,setHomeRoute] = useState();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const PageName = pathSegments[1];
    const homeTitlesList = ['Dashboard','Category','Sub Category','Brands','Orders','Coupon','Notifications','Posters','Variant Type','Variant','Details','Settings'];
    const homeRoutesList = ['dashboard','category','subCategory','brands','orders','coupon','notifications','posters','variantType','variant','details','settings'];
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


    return (
        <div className="UpBar">
            <span className='upbar-title-links'>
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
                    <img style={{height:'40px'}} src={profile}/>
                    <span>Mbio Peter</span>
                    <Down/>
                </div>
            </div>
        </div>
    )
}

export default UpBar