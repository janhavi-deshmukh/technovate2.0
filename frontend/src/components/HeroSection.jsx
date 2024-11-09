// HeroSection.js
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A5D6A7', // Lighter green background
        backgroundImage: 'url("https://your-image-url.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to EcoShop
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Discover sustainable and eco-friendly products for a greener lifestyle.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          sx={{ mt: 3 }}
        >
          Start Shopping
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;
