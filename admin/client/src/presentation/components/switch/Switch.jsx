import * as React from 'react';
import Switch from '@mui/material/Switch';
import '../../css/variables.css';

export default function ControlledSwitch({
    checked,
    setChecked
}) {
    
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
            color:  'var(--primary-color)',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: 'var(--primary-color)',
            },
            '& .MuiSwitch-track': {
            backgroundColor: 'var(--text-color)',
            },
        }}
        />
    );
}
