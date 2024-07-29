import React, { useContext } from 'react';
import { InwardContext } from '../context/InwardContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const InwardList = () => {
  const { inwardItems } = useContext(InwardContext);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Part</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inwardItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.part}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InwardList;
