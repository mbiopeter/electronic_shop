import React from 'react'
import './UpBar.css';
import { Search,Down } from '../../../logical/consts/icons';
import { profile } from '../../../logical/consts/images';
import { useLocation } from 'react-router-dom';
import  {useState,useEffect} from 'react'
const UpBar = () => {
    const [title, setTitle]  = useState();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const PageName = pathSegments[1];
    useEffect(() => {
        if(PageName === ''){
            setTitle('Dashboard')
        }
        else if(PageName === 'category'){
            setTitle('Category')
        }
        else if(PageName === 'subCategory'){
            setTitle('Sub Category')
        }
        else if(PageName === 'brands'){
            setTitle('Brands')
        }
        else if(PageName === 'orders'){
            setTitle('Orders')
        }
        else if(PageName === 'coupon'){
            setTitle('Coupon Code')
        }
        else if(PageName === 'notification'){
            setTitle('Notifications')
        }
        else if(PageName === 'posters'){
            setTitle('Posters')
        }
        else if(PageName === 'variantType'){
            setTitle('Variant Type')
        }
        else if(PageName === 'variant'){
            setTitle('Variant')
        }
    },[PageName])


    return (
        <div className="UpBar">
            <span className='UpBar-title'>
                {title}
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