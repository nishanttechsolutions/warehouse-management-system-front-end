import React, { useContext } from 'react';
import { LocationContext } from '../context/LocationContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const LocationTable = () => {
  const { locations } = useContext(LocationContext);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locations.map((location, index) => (
            <TableRow key={index}>
              <TableCell>{location.name}</TableCell>
              <TableCell>{location.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LocationTable;
