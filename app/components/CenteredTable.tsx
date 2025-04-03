"use client";
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
  Skeleton,
  Typography
} from '@mui/material';
import { useFetchItems } from '../hooks/items/useFetchItems';
import ViewItemButton from './ViewItemButton';

export default function CenteredTable() {
  const { items, loading, error, totalPages, page, setPage } = useFetchItems();

  // Update the page number when pagination changes
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      {/* Table container with fetched data */}
      <TableContainer component={Paper} sx={{ maxWidth: '80%', borderRadius: '16px', p: 2 }}>
        <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '20%', whiteSpace: 'normal', wordBreak: 'break-word' }}><strong>ID</strong></TableCell>
              <TableCell sx={{ width: '20%', whiteSpace: 'normal', wordBreak: 'break-word' }}><strong>Name</strong></TableCell>
              <TableCell sx={{ width: '20%', whiteSpace: 'normal', wordBreak: 'break-word' }}><strong>Description</strong></TableCell>
              <TableCell sx={{ width: '20%', whiteSpace: 'normal', wordBreak: 'break-word' }}><strong>Price</strong></TableCell>
              <TableCell sx={{ width: '20%', whiteSpace: 'normal', wordBreak: 'break-word' }}><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Error State */}
            {error && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="error">{error}</Typography>
                </TableCell>
              </TableRow>
            )}

            {/* Loading State */}
            {loading ? (
              Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ width: '20%', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>
                  <TableCell sx={{ width: '20%', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>
                  <TableCell sx={{ width: '20%', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>
                  <TableCell sx={{ width: '20%', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>
                  <TableCell sx={{ width: '20%', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                    <Skeleton variant="circular" width={40} height={40} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Display actual data if not loading or in error state
              items.length > 0 ? (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ width: '20%', fontSize: '16px', whiteSpace: 'normal', wordBreak: 'break-word' }}>{item.id}</TableCell>
                    <TableCell sx={{ width: '20%', fontSize: '16px', whiteSpace: 'normal', wordBreak: 'break-word' }}>{item.name}</TableCell>
                    <TableCell sx={{ width: '20%', fontSize: '16px', whiteSpace: 'normal', wordBreak: 'break-word' }}>{item.description}</TableCell>
                    <TableCell sx={{ width: '20%', fontSize: '16px', whiteSpace: 'normal', wordBreak: 'break-word' }}>{item.price}</TableCell>
                    <TableCell sx={{ width: '20%', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                      <ViewItemButton id={item.id} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">No items available</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Pagination control */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination count={totalPages} page={page} onChange={handleChangePage} />
      </Box>
    </>
  );
}
