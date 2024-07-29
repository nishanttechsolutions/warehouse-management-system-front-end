import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import PartTable from './PartTable';
import AddPartPopup from './AddPartPopup';

const Parts = () => {
  const [showAddPartPopup, setShowAddPartPopup] = useState(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Parts</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddPartPopup(true)}
      >
        Add Part
      </Button>
      <PartTable />
      {showAddPartPopup && (
        <AddPartPopup closePopup={() => setShowAddPartPopup(false)} />
      )}
    </Container>
  );
};

export default Parts;
