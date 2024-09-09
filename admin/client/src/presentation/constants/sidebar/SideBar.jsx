import React from 'react';
import './SideBar.css';
import '../../css/common.css';
import '../../css/scrollBar.css';
import '../../css/variables.css';
import { Link } from 'react-router-dom';
import { nav_links } from '../../../data/sidebar/SideBar';
import { logo } from '../../../logical/consts/images';


const SideBar = ({
    expand, 
    setExpand,
    transparentSideBar
}) => {
    
    const handleMouseEnter = () => {
        if (!expand) {
            setExpand(true);
        }
    };
    
    const handleMouseLeave = () => {
        if (expand) {
            setExpand(false);
        }
    };

    return (
        <div 
            className={` SideBar ${transparentSideBar === false && 'nonTransparentSideBar'}`}
            style={expand === false ? { width: 'var(--larger-width)',cursor:'pointer',transition:'var(--transition-duration) linear' ,overflow: 'hidden'} : null}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="SideBar-logo" style={expand === false ? {height:'10%',display:'flex',alignItems:'center',paddingTop:'var(--container-padding)'}:null}>
                <img className='logo' src={logo} style={expand === false ? {height:'30px',transition:'var(--transition-duration) linear'} : null} />
                <span style={expand === false ? {opacity:0,transition:'var(--transition-duration) linear'}:null} className='logo-title'>Shoppers.</span>
                <span style={expand === false ? {opacity:0,transition:'var(--transition-duration) linear'}:null} className='logo-slogan'>elevating your world!</span>
            </div>
            <hr />
            {nav_links.map((link) => (
                <div className="SideBar-nav" key={link.id}>
                    {link.icon}
                    <Link className="link" style={expand === false ? {opacity:0,transition:'var(--transition-duration) linear'}:null} to={link.path}>{link.name}</Link>
                </div>
            ))}
        </div>
    );
}

export default SideBar;
