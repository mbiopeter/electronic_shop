import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './Loading.css';

export default function Loader() {
    return (
        <Box className="loading">
            <LinearProgress />
        </Box>
    );
}