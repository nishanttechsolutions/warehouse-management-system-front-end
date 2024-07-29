import React, { useState, useContext } from 'react';
import { LocationContext } from '../context/LocationContext';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const AddLocationPopup = ({ closePopup }) => {
  const { addLocation } = useContext(LocationContext);
  const [newLocation, setNewLocation] = useState({ name: '', description: '' });

  const handleAddClick = () => {
    addLocation(newLocation);
    closePopup();
  };

  return (
    <Dialog open onClose={closePopup}>
      <DialogTitle>Add Location</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={newLocation.name}
          onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          value={newLocation.description}
          onChange={(e) => setNewLocation({ ...newLocation, description: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closePopup} color="secondary">Cancel</Button>
        <Button onClick={handleAddClick} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLocationPopup;
