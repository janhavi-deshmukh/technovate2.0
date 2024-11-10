// HeroSection.js
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: '70vh',  // Reduced height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A5D6A7',
        backgroundImage: 'url("/herosection.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        marginTop: 0,
        position: 'relative',
        overflow: 'hidden', // Ensure children are clipped if they go out of bounds
      }}
    >
      {/* Adding a blur overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/herosection.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)', // Blurred effect
          zIndex: 1,
          opacity: 0.7 // Slight opacity for a subtle blur effect
        }}
      />
      <Container
        maxWidth="md"
        sx={{ 
          position: 'relative', 
          zIndex: 2 // Ensures the text is above the blurred background 
        }}
      >
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
