import React, { useState, useContext } from 'react';
import { InwardContext } from '../context/InwardContext';
import { PartContext } from '../context/PartContext';
import { LocationContext } from '../context/LocationContext';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Container, Typography } from '@mui/material';
import axios from 'axios';

const Putaway = () => {
  const [selectedPart, setSelectedPart] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(null);
  const { parts } = useContext(PartContext);
  const { locations } = useContext(LocationContext);
  const { inwardItems } = useContext(InwardContext);
  const { authToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inwardItem = inwardItems.find(item => item.part === selectedPart);
    if (inwardItem && inwardItem.quantity >= quantity) {
      try {
        const response = await axios.post('http://localhost:5000/api/putaway', {
          part: selectedPart,
          location: selectedLocation,
          quantity: parseInt(quantity, 10)
        }, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log(response.data);
        // Optionally update state or context here
        setSelectedPart('');
        setSelectedLocation('');
        setQuantity('');
        setError(null);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error putting away part');
      }
    } else {
      alert('Insufficient quantity in inward items');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Putaway</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Part</InputLabel>
          <Select
            value={selectedPart}
            onChange={(e) => setSelectedPart(e.target.value)}
            required
          >
            {parts.map((part, index) => (
              <MenuItem key={index} value={part.partNumber}>
                {part.partNumber}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Location</InputLabel>
          <Select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            required
          >
            {locations.map((location, index) => (
              <MenuItem key={index} value={location.name}>
                {location.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary">Putaway</Button>
      </form>
    </Container>
  );
};

export default Putaway;
