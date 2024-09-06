import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function ControlledSwitch() {
  const [checked, setChecked] = React.useState(true);

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
          color: 'purple', // Change the color of the switch when checked
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: 'purple', // Change the track color when checked
        },
        '& .MuiSwitch-track': {
          backgroundColor: 'lightgray', // Default track color
        },
      }}
    />
  );
}
