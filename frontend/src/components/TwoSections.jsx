import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';

// Example category data
const categories = [
  { name: 'Appliances', image: '/images/appliances.jpg' },
  { name: 'Electronics', image: '/images/electronics.jpg' },
  { name: 'Fashion', image: '/images/fashion.jpg' },
  { name: 'Household Supplies', image: '/images/household_supplies.jpg' },
  { name: 'Beauty', image: '/images/beauty.jpg' },
];

const TwoSections = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '50vh', // Adjust height as desired
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          width: '30%',
          backgroundColor: '#FFCC80', // Light orange for the left section
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Typography variant="h5">Left Section</Typography>
      </Box>

      {/* Right Section (Explore Categories) */}
      <Box
        sx={{
          width: '70%',
          backgroundColor: '#81C784', // Green background to match the theme
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          Explore Our Categories
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)', // Hover effect: card scales up
                  },
                  backgroundColor: '#ffffff', // White background for cards
                  boxShadow: 3, // Card shadow for a raised effect
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={category.image}
                  alt={category.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {category.name}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Shop {category.name}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TwoSections;
