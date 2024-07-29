// components/PicklistForm.js
import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';
import PickListRow from './PickListRow';
import { AuthContext } from '../context/AuthContext';

const generatePicklistName = () => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
  return `picklist-${dateStr}-${timeStr}`;
};

const defaultRow={ part: '', location: '', quantity: '', id: Date.now() }
const PicklistForm = () => {
  const [picklistName, setPicklistName] = useState(generatePicklistName());
  const [parts, setParts] = useState([defaultRow]);
  const [availableParts, setAvailableParts] = useState([]);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchPartsAndLocations = async () => {
      try {
        const partsResponse = await axios.get('http://localhost:5000/api/parts', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setAvailableParts(partsResponse.data);
      } catch (error) {
        console.error('Error fetching parts and locations:', error);
      }
    };

    fetchPartsAndLocations();
  }, [authToken]);

  const handleAddPart = () => {
    setParts([...parts, { part: '', location: '', quantity: '', id: Date.now() }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/picklist', { name: picklistName, parts }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setParts([defaultRow])
    } catch (error) {
      console.error('Error creating picklist:', error.response ? error.response.data : error.message);
    }
  };

  const handlePartUpdate = (updatedPart, index) => {
    const updatedParts = [...parts].map((part, mapIndex) => {
      if (mapIndex === index) {
        return updatedPart;
      }
      return part;
    });
    setParts(updatedParts);
  };

  const handlePartRemove = (index) => {
    const newParts = [...parts];
    newParts.splice(index, 1);
    setParts(newParts);
  };

  return (
    <Paper style={{ padding: 16 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              label="Picklist Name"
              name="picklistName"
              value={picklistName}
              onChange={(e) => setPicklistName(e.target.value)}
              fullWidth
              required
              disabled
            />
          </Grid>
          {parts.map((part, index) => (
            <PickListRow
              setParts={setParts}
              onUpdatePartRow={(updatedPart) => handlePartUpdate(updatedPart, index)}
              availableParts={availableParts}
              part={part}
              onRemovePart={() => handlePartRemove(index)}
              key={part.id}
            />
          ))}
          <Grid item xs={12}>
            <Button onClick={handleAddPart} startIcon={<AddIcon />} variant="contained">
              Add Part
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Picklist
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default PicklistForm;
