import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import InwardList from './InwardList';
import PartTable from './PartTable';
import LocationTable from './LocationTable';

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Inward Items</Typography>
          <InwardList />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Parts</Typography>
          <PartTable />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Locations</Typography>
          <LocationTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
