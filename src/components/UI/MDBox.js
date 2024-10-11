// src/components/UI/MDBox.js

import React from 'react';
import { Box } from '@mui/material';

const MDBox = React.forwardRef(({ zIndex, ...props }, ref) => {
    return (
        <Box
            ref={ref}
            sx={{ zIndex }} 
            {...props} 
        >
            {props.children}
        </Box>
    );
});
export default MDBox;
