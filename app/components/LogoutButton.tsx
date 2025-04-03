"use client"
import React from 'react';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from '../hooks/useLogout';

export default function LogoutButton() {
  // Retrieve the logout function from the custom hook
  const logout = useLogout();

  return (
    <>
      {/* Logout button with icon */}
      <Button 
        variant="contained" 
        color="secondary"
        startIcon={<LogoutIcon />}
        sx={{ 
            mt: 2,
            borderRadius: '20px',
            height: '50px',
            py: 2,
        }}
        onClick={logout}
      >
        Logout
      </Button>
    </>
  );
}
