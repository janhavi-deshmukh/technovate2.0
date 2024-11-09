// NavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// import zzz

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2E7D32' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EcoShop
        </Typography>
        
        <Button color="inherit">Home</Button>
        <Button color="inherit">Products</Button>
        <Button color="inherit">About Us</Button>
        <Button color="inherit">Contact</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
