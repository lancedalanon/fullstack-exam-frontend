"use client"
import * as React from 'react';
import { useAuthProtection } from './hooks/useAuthProtection';
import CenteredTable from './components/CenteredTable';
import LogoutButton from './components/LogoutButton';
import {
  Box,
} from '@mui/material';
import CreateItemButton from "./components/CreateItemButton";
import { Typography } from '@mui/material';

export default function Home() {
  // Protect the page using client-side authentication
  useAuthProtection();

  return (
    <div>
      {/* Top-right Logout button */}
      <Box display="flex" justifyContent="flex-end" p={2}>
        <LogoutButton />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        {/* Header with title and button */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} sx={{ width: "80%" }}>
          <Typography variant="h5" fontWeight="bold">Items</Typography>
          <CreateItemButton />
        </Box>
        {/* Centered table with dummy data and pagination */}
        <CenteredTable />
      </Box>
    </div>
  );
}
