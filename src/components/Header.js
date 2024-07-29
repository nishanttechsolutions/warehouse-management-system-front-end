import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Styled NavLink component to apply active class styles
const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  '&.active': {
    // fontWeight: 'bold',
    // color: theme.palette.primary.main,
  },
}));

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>WMS</Typography>
        <Button color="inherit" component={StyledNavLink} to="/dashboard" activeClassName="active">Dashboard</Button>
        <Button color="inherit" component={StyledNavLink} to="/inward" activeClassName="active">Inward</Button>
        <Button color="inherit" component={StyledNavLink} to="/parts" activeClassName="active">Parts</Button>
        <Button color="inherit" component={StyledNavLink} to="/locations" activeClassName="active">Locations</Button>
        <Button color="inherit" component={StyledNavLink} to="/putaway" activeClassName="active">Putaway</Button>
        <Button color="inherit" component={StyledNavLink} to="/picklist" activeClassName="active">Picklist</Button>
        <Button color="inherit" component={StyledNavLink} to="/pickings" activeClassName="active">Pickings</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
