import React, { useEffect, useState } from 'react';
import './SideBar.css';
import '../../css/common.css';
import '../../css/scrollBar.css';
import '../../css/variables.css';
import { Link } from 'react-router-dom';
import { nav_links } from '../../../data/sidebar/SideBar';
import { logo } from '../../../logical/consts/images';
import {CloseIcon} from '../../../logical/consts/icons';


const SideBar = ({
    expand, 
    setExpand,
    transparentSideBar,
    roles,
    appWidth,
    closeMobile,
    setCloseMobile
}) => {


    const rolesArray = [
        roles.dashboard,
        roles.category,
        roles.subCategory,
        roles.brand,
        roles.variantType,
        roles.variant,
        roles.orders,
        roles.coupon,
        roles.poster,
        roles.notification,
        true,
        roles.users,
        roles.emails
    ]
    const handleMouseEnter = () => {
        if (!expand && appWidth >= 992) {
            setExpand(true);
        }
    };
    
    const handleMouseLeave = () => {
        if (expand  && appWidth >= 992) {
            setExpand(false);
        }
    };

    const handleCloseMobile = () => {
        setCloseMobile(true);
    }

    return (
        <div 
            className={` SideBar ${transparentSideBar === false && 'nonTransparentSideBar'} ${closeMobile === true && 'CloseMobileSideBar'}`}
            style={expand === false ? { width: 'var(--larger-width)',cursor:'pointer',transition:'var(--transition-duration) linear' ,overflow: 'hidden'} : null}
            onMouseEnter={ handleMouseEnter}
            onMouseLeave={ handleMouseLeave}
        >
            <div className="mobileClose" onClick={handleCloseMobile}>
                <CloseIcon style={{color: 'var(--error-color)', fontWeight: 'bold'}}/>
            </div>        
            <div className="SideBar-logo" style={ expand === false ? {height:'10%',display:'flex',alignItems:'center',paddingTop:'var(--container-padding)'}:null}>
                <img className='logo' src={logo} style={ expand === false ? {height:'30px',transition:'var(--transition-duration) linear'} : null} />
                <span style={ expand === false ? {opacity:0,transition:'var(--transition-duration) linear'}:null} className='logo-title'>Shoppers.</span>
                <span style={ expand === false ? {opacity:0,transition:'var(--transition-duration) linear'}:null} className='logo-slogan'>elevating your world!</span>
            </div>
            <hr />
            {nav_links.map((link) => (
                rolesArray[link.id - 1] &&
                <div className="SideBar-nav" key={link.id}>
                    {link.icon}
                    <Link className="link" style={ expand === false ? {opacity:0,transition:'var(--transition-duration) linear'}:null} to={link.path}>{link.name}</Link>
                </div>
            ))}
        </div>
    );
}

export default SideBar;
