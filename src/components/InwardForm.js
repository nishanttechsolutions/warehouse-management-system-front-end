import React, { useState, useContext } from 'react';
import { InwardContext } from '../context/InwardContext';
import { PartContext } from '../context/PartContext';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Container } from '@mui/material';

const InwardForm = () => {
  const [selectedPart, setSelectedPart] = useState('');
  const [quantity, setQuantity] = useState('');
  const { addInwardItem } = useContext(InwardContext);
  const { parts } = useContext(PartContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addInwardItem({ part: selectedPart, quantity, date: Date.now() });
    setSelectedPart('');
    setQuantity('');
  };

  return (
    <Container>
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
        <TextField
          fullWidth
          margin="normal"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
        />
        <Button type="submit" variant="contained" color="primary">Add Inward Item</Button>
      </form>
    </Container>
  );
};

export default InwardForm;
