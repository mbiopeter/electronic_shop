import React, { useEffect, useState } from 'react'
import './Appearance.css';
import '../../css/variables.css';
import ControlledSwitch from '../switch/Switch';
const Appearance = ({
    activeMode,
    setActiveMode
}) => {
    const[transparentSideBar,setTransparentSideBar] = useState(false)


    useEffect(() => {
        const root = document.documentElement;
        if(activeMode === 'Dark'){
            root.classList.remove('light-mode');
            localStorage.setItem('theme', activeMode); 
        }
        if(activeMode === 'Light'){
            root.classList.add('light-mode');
            localStorage.setItem('theme', activeMode); 
        }
    },[activeMode]);

    const themes = [
        {
            id:1,
            name:'Green Theme',
            gradient:[
                ' rgb(8, 115, 92)',
                'red'
            ]
        },
        {
            id:2,
            name:'Blue Theme',
            gradient:[
                'blue',
                'red'
            ]
        },
        {
            id:3,
            name:'Yellow Theme',
            gradient:[
                'gold',
                'red'
            ]
        },
        {
            id:3,
            name:'Pink Theme',
            gradient:[
                '#ff00ff',
                'red'
            ]
        },
    ]
    return (
        <div>
            <div className="settingsColorMode">
                <div  className="appearanceHeading">
                    <span>Color Mode</span>
                </div>
                <div  className="appearanceSubHeading">
                    <span>Select your default theme</span>
                </div>

                <div  className="coloreModesContainer">
                    <div onClick={() => setActiveMode('Dark')} className="ThemeContainer" >
                        <div className={`darkThemeSkeleton ${activeMode === 'Dark' ? 'active':null}`}>
                            <div className="darkThemeSkeletonRow">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="darkThemeSkeletonRow flex">
                                <span></span>
                                <div className="flexRight">
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div className="darkThemeSkeletonRow">
                                <div className="darkThemeSkeletonRowLeft"></div>
                                <div className="darkThemeSkeletonRowRight"></div>
                            </div>
                        </div>
                        <span className={`colorModeColor ${activeMode === 'Dark' ? 'colorModeActiveText':null}`}>
                            Dark Mode
                        </span>
                    </div>

                    <div onClick={() => setActiveMode('Light')} className="ThemeContainer">
                        <div className={`lightThemeSkeleton ${activeMode === 'Light' ? 'active':null}`}>
                            <div className="lightThemeSkeletonRow">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="lightThemeSkeletonRow flex">
                                <span></span>
                                <div className="flexRight">
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div className="lightThemeSkeletonRow">
                                <div className="lightThemeSkeletonRowLeft"></div>
                                <div className="lightThemeSkeletonRowRight"></div>
                            </div>
                        </div>
                        <span className={`colorModeColor ${activeMode === 'Light' ? 'colorModeActiveText':null}`}>
                            Light Mode
                        </span>
                    </div>


                </div>

                <hr />

                <div  className="appearanceHeading">
                    <span>Color Mode</span>
                </div>
                <div  className="appearanceSubHeading">
                    <span>Choose a theme from our theme library</span>
                </div>

                <div className="themePackLibraryContainer">
                    {themes.map((theme) => (
                        <div className="themeContainer" key={theme.id}>
                            <div className="themeLeading" style={{background:`linear-gradient(50deg, ${theme.gradient[0]},  ${theme.gradient[1]})`}}></div>
                            <span>{theme.name}</span>
                        </div>                        
                    ))}

                    

                </div>

                <hr />

                <div  className="appearanceHeading">
                    <span>Transparent Sidebar</span>
                </div>
                <div  className="appearanceSubHeading">
                    <span>Make the system sidebar transparent</span>
                </div>

                <div className="transparentSidebarContainer">
                    <ControlledSwitch />
                    <span className="transparentToggleName">Transparent sidebar sidebarn</span>
                </div>

            </div>
        </div>
    )
}

export default Appearance