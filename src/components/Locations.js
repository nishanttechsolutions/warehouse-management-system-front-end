import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import LocationTable from './LocationTable';
import AddLocationPopup from './AddLocationPopup';

const Locations = () => {
  const [showAddLocationPopup, setShowAddLocationPopup] = useState(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Locations
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddLocationPopup(true)}
      >
        Add Location
      </Button>
      <LocationTable />
      {showAddLocationPopup && (
        <AddLocationPopup closePopup={() => setShowAddLocationPopup(false)} />
      )}
    </Container>
  );
};

export default Locations;
