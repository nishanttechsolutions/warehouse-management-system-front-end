import React, { useState, useContext } from 'react';
import { PartContext } from '../context/PartContext';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const AddPartPopup = ({ closePopup }) => {
  const { addPart } = useContext(PartContext);
  const [newPart, setNewPart] = useState({ partNumber: '', description: '', matrixCode: '' });

  const handleAddClick = () => {
    addPart(newPart);
    closePopup();
  };

  return (
    <Dialog open onClose={closePopup}>
      <DialogTitle>Add Part</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Part Number"
          type="text"
          fullWidth
          value={newPart.partNumber}
          onChange={(e) => setNewPart({ ...newPart, partNumber: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          value={newPart.description}
          onChange={(e) => setNewPart({ ...newPart, description: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Matrix Code"
          type="text"
          fullWidth
          value={newPart.matrixCode}
          onChange={(e) => setNewPart({ ...newPart, matrixCode: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closePopup} color="secondary">Cancel</Button>
        <Button onClick={handleAddClick} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPartPopup;
