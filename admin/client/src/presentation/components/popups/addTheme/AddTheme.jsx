import React, { useState } from 'react';
import './AddTheme.css';
import '../../../css/common.css';
import '../../../css/variables.css';
import Layer from '../Layer';
import ColorInput from '../../colorPicker/ColorPicker';

const AddTheme = ({
    showAddTheme, 
    handleHidePopUp,
    themeName,
    setThemeName
    }) => {
    const customeColors = [
        { id: 1, name: 'Background', var: '--background-color' },
        { id: 2, name: 'Secondary Background', var: '--secondary-background-color' },
        { id: 3, name: 'Primary Color', var: '--primary-color' },
        { id: 4, name: 'Secondary Color', var: '--secondary-color' },
        { id: 5, name: 'Grey Color', var: '--grey-color' },
        { id: 6, name: 'Text Color', var: '--text-color' },
        { id: 7, name: 'Heading Color', var: '--heading-color' },
        { id: 8, name: 'Border Color', var: '--border-color' },
        { id: 9, name: 'Input Background', var: '--input-background-color' },
        { id: 10, name: 'Input Text', var: '--input-text-color' },
        { id: 11, name: 'Box Shadow', var: '--box-shadow' },
        { id: 12, name: 'Input Shadow', var: '--input-shadow' },

    ];

    const [theme, setTheme] = useState({});

    const handleChange = (varName, value) => {
        const updatedTheme = { ...theme, [varName]: value };
        setTheme(updatedTheme);
    };

    const handleSubmit = () => {
        if (themeName.trim() === '') {
            alert('Please provide a name for the theme.');
            return;
        }
        const savedThemes = JSON.parse(localStorage.getItem('themes')) || {};
        savedThemes[themeName] = theme;
        localStorage.setItem('themes', JSON.stringify(savedThemes));
        alert(` "${themeName}" Theme saved!`);
        setThemeName('');
        setTheme({});
    };

    return (
        <>
            {showAddTheme && <Layer handleHidePopUp={handleHidePopUp} />}
            <div className={`AddThemePopUp popup-css ${showAddTheme ? 'show-AddThemePopUp' : 'hide'}`}>
                <div className="AddThemePopUp-title">
                    <span>CREATE A THEME</span>
                </div>
                <div className="AddThemePopUp-container">
                    <input
                        type="text"
                        value={themeName}
                        onChange={(e) => setThemeName(e.target.value)}
                        placeholder="Enter theme name"
                        className="themeNameInput input-css"
                    />
                    <div className="AddThemePopUpGrid">
                        {customeColors.map((color) => (
                            <div className="AddThemePopUpGridControl" key={color.id}>
                                <span className='AddThemePopUpGridControlSpan'>{color.name}</span>
                                <ColorInput
                                    value={theme[color.var] || ''}
                                    onChange={(e) => handleChange(color.var, e.value)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="AddThemePopUp-form-btn">
                        <button className="AddThemePopUp-form-btn-item cancel">Cancel</button>
                        <button onClick={handleSubmit} className="AddThemePopUp-form-btn-item submit">Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTheme;
