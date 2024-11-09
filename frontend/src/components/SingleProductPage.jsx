import React from 'react';
import { Grid, Box, Typography, Button, Rating } from '@mui/material';
import Related_Products from './Related_Products';
import Desc_Rev from './Desc_Rev';
// Sample product data
const product = {
  name: 'Product Name',
  image: 'https://via.placeholder.com/300',
  main_category: 'Electronics',
  sub_category: 'Mobile',
  ratings: 4.5,
  no_of_ratings: 1000,
  discount_price: '199.99',
  actual_price: '249.99',
  link: '#',
  description: 'This is a detailed description of the product. It provides insights into its features and specifications.',
  reviews: 'This product has been reviewed by many users and has received excellent feedback.',
  certificationDetails: 'This product has been certified by XYZ and meets international standards.',
};


const relatedProducts = [
  {
    name: 'Related Product 1',
    image: 'https://via.placeholder.com/100',
    discount_price: 179.99,
  },
  {
    name: 'Related Product 2',
    image: 'https://via.placeholder.com/100',
    discount_price: 149.99,
  },
  {
    name: 'Related Product 3',
    image: 'https://via.placeholder.com/100',
    discount_price: 159.99,
  },
];

const SingleProductPage = () => {
  return (
    <Grid container spacing={4} sx={{ padding: 4 }}>
      {/* Column 1: Product Image and Product Details */}
      <Grid item xs={12} md={8} lg={10} sx={{display:'flex',flexDirection:'row'}}>
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={10} md={5} lg={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically
                height: '100%',
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: '80%', // Adjust image size as needed
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              />
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={7} lg={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h4" fontWeight="bold">
                {product.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {product.main_category} - {product.sub_category}
              </Typography>

              <Box display="flex" alignItems="center">
                <Rating value={product.ratings} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({product.no_of_ratings} reviews)
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  ${product.discount_price}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  ${product.actual_price}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                href={product.link}
                target="_blank"
                sx={{ width: 'fit-content' }}
              >
                Buy Now
              </Button>
            </Box>
          </Grid>

          

        </Grid>
        <Grid>
          <Desc_Rev product={product}/>
        </Grid>
      </Grid>

      {/* Column 2: Related Products */}
    <Related_Products relatedProducts={relatedProducts} />
    </Grid>
  );
};

export default SingleProductPage;
