import React, { useState } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';

// Sample product data
const product = {
  name: 'Product Name',
  description: 'This is a detailed description of the product. It provides insights into its features and specifications.',
  reviews: 'This product has been reviewed by many users and has received excellent feedback.',
  certificationDetails: 'This product has been certified by XYZ and meets international standards.',
};


const custom_buttons=[
  {
    name: 'Description',
    value: 'description',
    content: product.description
  },
  {
    name: 'Reviews',
    value: 'reviews',
    content: product.reviews
  },
  {
    name: 'Certification Details',
    value: 'certification',
    content: product.certificationDetails
  }
]
const Desc_Rev = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [currentContent, setCurrentContent] = useState(product.description);
  // Function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Button Row */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
        {custom_buttons.map((button, index) => (
          <Button
            key={index}
            variant={activeTab === button.value ? 'contained' : 'outlined'}
            onClick={() => handleTabChange(button.value)}
            sx={{ flex: 1 }}
          >
            {button.name}
          </Button>
        ))}
      </Box>

      {/* Sections based on active tab */}
      {activeTab === 'description' && (
        <Box>
          <Typography variant="body1">This is the description content.</Typography>
        </Box>
      )}

      {activeTab === 'reviews' && (
        <Box>
          <Typography variant="body1">This is the reviews content.</Typography>
        </Box>
      )}

      {activeTab === 'certification' && (
        <Box>
          <Typography variant="body1">This is the certification details content.</Typography>
        </Box>
      )}
    </Box>
     
  );
};

export default Desc_Rev;
