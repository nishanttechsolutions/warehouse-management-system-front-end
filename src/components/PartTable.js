import React, { useContext, useState } from 'react';
import { PartContext } from '../context/PartContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Container } from '@mui/material';
import AddPartPopup from './AddPartPopup';

const PartTable = () => {
  const { parts, updatePart } = useContext(PartContext);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedPart, setEditedPart] = useState({});
  const [showAddPartPopup, setShowAddPartPopup] = useState(false);

  const handleEdit = (index, part) => {
    setEditIndex(index);
    setEditedPart({ ...part });
  };

  const handleSave = (index) => {
    updatePart(index, editedPart);
    setEditIndex(-1);
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Part Number</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Matrix Code</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parts.map((part, index) => (
              <TableRow key={index}>
                <TableCell>{part.partNumber}</TableCell>
                <TableCell>
                  {editIndex === index ? (
                    <TextField
                      value={editedPart.description}
                      onChange={(e) =>
                        setEditedPart({ ...editedPart, description: e.target.value })
                      }
                      fullWidth
                    />
                  ) : (
                    part.description
                  )}
                </TableCell>
                <TableCell>
                  {editIndex === index ? (
                    <TextField
                      value={editedPart.matrixCode}
                      onChange={(e) =>
                        setEditedPart({ ...editedPart, matrixCode: e.target.value })
                      }
                      fullWidth
                    />
                  ) : (
                    part.matrixCode
                  )}
                </TableCell>
                <TableCell>
                  {editIndex === index ? (
                    <Button
                      onClick={() => handleSave(index)}
                      color="primary"
                      variant="contained"
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleEdit(index, part)}
                      color="primary"
                      variant="contained"
                    >
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddPartPopup(true)}
        style={{ marginTop: '16px' }}
      >
        Add Part
      </Button>
      {showAddPartPopup && (
        <AddPartPopup closePopup={() => setShowAddPartPopup(false)} />
      )} */}
    </Container>
  );
};

export default PartTable;
