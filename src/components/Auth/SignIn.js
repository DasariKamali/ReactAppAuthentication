// src/components/Auth/SignIn.js

import React from 'react';
import { useMsal } from '@azure/msal-react';
import MDBox from '../UI/MDBox'; 
import { Button, TextField } from '@mui/material';

const SignIn = () => {
    const { instance } = useMsal();
    const handleLogout = () => {
        instance.logout();
    };
    const handleSignIn = (event) => {
        event.preventDefault();
        instance.loginPopup().catch((error) => {
            console.error("Login failed: ", error);
        });
    };
    return (
        <MDBox>
            <form onSubmit={handleSignIn}>
                <Button type="submit" variant="contained" color="primary">
                    Sign In
                </Button>
                <Button onClick={handleLogout} variant="outlined" color="secondary">
                    Logout
                </Button>
            </form>
        </MDBox>
    );
};
export default SignIn;
