import React from 'react';
import { Container, Typography } from '@mui/material';
import InwardForm from './InwardForm';
import InwardList from './InwardList';

const Inward = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Inward</Typography>
      <InwardForm />
      <InwardList />
    </Container>
  );
};

export default Inward;
