import React, { useEffect, useState } from 'react';
import './Appearance.css';
import '../../css/variables.css';
import ControlledSwitch from '../switch/Switch';
import { Add, CloseIcon } from '../../../logical/consts/icons';
import AddTheme from '../popups/addTheme/AddTheme';

const Appearance = ({
    setTransparentSideBar,
    sideBarChecked,
    setSideBarChecked
}) => {

    const [themeName, setThemeName] = useState('');

    const [showAddTheme, setShowAddTheme] = useState(false);
    const [themes, setThemes] = useState({});
    const [activeTheme, setActiveTheme] = useState(null);


    const handleAddNew = () => {
        setShowAddTheme(true);
    };

    const handleHidePopUp = () => {
        setShowAddTheme(false);
    };

    //
    useEffect(() => {
        const savedThemes = JSON.parse(localStorage.getItem('themes')) || {};
        setThemes(savedThemes);

        const savedTheme = localStorage.getItem('activeTheme');
        if (savedTheme) {
            setActiveTheme(savedTheme);
            applyTheme(savedTheme, savedThemes);
        }
    }, [activeTheme, themeName]);

    const handleDeleteTheme = (themeName) => {
        const updatedThemes = { ...themes };
        delete updatedThemes[themeName];
        setThemes(updatedThemes);
        localStorage.setItem('themes', JSON.stringify(updatedThemes));

        if (themeName === activeTheme) {
            // Revert to Light mode after deletion if the active theme was deleted
            setActiveTheme('Light')
            applyTheme('Light',{})
        }
    };

    const applyTheme = (themeName, allThemes) => {
        const root = document.documentElement;

        // Reset any previous custom theme
        Object.keys(allThemes).forEach((theme) => {
            Object.keys(allThemes[theme]).forEach((variable) => {
                root.style.removeProperty(variable);
            });
        });

        if (themeName === 'Dark') {
            root.classList.remove('light-mode');
            localStorage.setItem('activeTheme', 'Dark');
            localStorage.setItem('theme', 'Dark');
        } else if (themeName === 'Light') {
            root.classList.add('light-mode');
            localStorage.setItem('activeTheme', 'Light');
            localStorage.setItem('theme', 'Light');
        } else {
            const selectedTheme = allThemes[themeName];
            Object.keys(selectedTheme).forEach(variable => {
                const value = selectedTheme[variable];
                root.style.setProperty(variable, `#${value}`);
            });
            root.classList.remove('light-mode');
            localStorage.setItem('activeTheme', themeName);
            localStorage.setItem('theme', themeName);
        }
    };

    const handleSetTheme = (themeName) => {
        setActiveTheme(themeName);
        applyTheme(themeName, themes);
    };

    useEffect(() => {
        if (sideBarChecked === true) {
            setTransparentSideBar(true);
            localStorage.setItem('transparentSideBar', true);
            setSideBarChecked(true);
        } else {
            setTransparentSideBar(false);
            localStorage.setItem('transparentSideBar', false);
            setSideBarChecked(false);
        }
    }, [sideBarChecked]);

    return (
        <div>
            <AddTheme
                handleHidePopUp={handleHidePopUp}
                showAddTheme={showAddTheme}
                themeName={themeName}
                setThemeName = {setThemeName}
            />
            <div className="settingsColorMode">
                <div className="appearanceHeading">
                    <span>Color Mode</span>
                </div>
                <div className="appearanceSubHeading">
                    <span>Select your default theme</span>
                </div>

                <div className="coloreModesContainer">
                    <div onClick={() => handleSetTheme('Dark')} className="ThemeContainer">
                        <div className={`darkThemeSkeleton ${activeTheme === 'Dark' ? 'active' : null}`}>
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
                        <span className={`colorModeColor ${activeTheme === 'Dark' ? 'colorModeActiveText' : null}`}>
                            Dark Mode
                        </span>
                    </div>

                    <div onClick={() => handleSetTheme('Light')} className="ThemeContainer">
                        <div className={`lightThemeSkeleton ${activeTheme === 'Light' ? 'active' : null}`}>
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
                        <span className={`colorModeColor ${activeTheme === 'Light' ? 'colorModeActiveText' : null}`}>
                            Light Mode
                        </span>
                    </div>
                </div>

                <hr />

                <div className="appearanceHeading">
                    <span>Color Mode</span>
                    <button className='subheading-left-title-right-btn' onClick={handleAddNew}>
                        <Add />
                        <span>Create New</span>
                    </button>
                </div>
                <div className="appearanceSubHeading">
                    {Object.keys(themes).length > 0 && (
                        <span>Choose a theme from your theme library</span>
                    )}
                </div>

                <div className="themePackLibraryContainer">
                    {Object.keys(themes).length === 0 ? (
                    <></>
                    ) : (
                        Object.keys(themes).map((themeName) => (
                            <div
                                className={`themeContainer ${activeTheme === themeName  && 'activeTheme'}`}
                                key={themeName}
                                onClick={() => handleSetTheme(themeName)}
                            >
                                <div className="themeContainerInner">
                                    <div
                                        className="themeLeading"
                                        style={{ background: `linear-gradient(50deg, #${themes[themeName]['--background-color']}, red)` }}
                                    ></div>
                                    <span>{themeName}</span>
                                </div>
                                <CloseIcon className='deleteTheme' onClick={(e) => {
                                    e.stopPropagation(); // Prevents theme selection on delete
                                    handleDeleteTheme(themeName);
                                }} />
                            </div>
                        ))
                    )}
                </div>

                <hr />

                <div className="appearanceHeading">
                    <span>Transparent Sidebar</span>
                </div>
                <div className="appearanceSubHeading">
                    <span>Make the system sidebar transparent</span>
                </div>

                <div className="transparentSidebarContainer">
                    <ControlledSwitch checked={sideBarChecked} setChecked={setSideBarChecked} />
                    <span className="transparentToggleName">Transparent sidebar</span>
                </div>
            </div>
        </div>
    );
};

export default Appearance;
