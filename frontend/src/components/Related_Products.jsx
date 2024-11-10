import React from 'react'
import { Grid,Box, Typography } from '@mui/material'
const Related_Products = ({relatedProducts}) => {
  return (
    <div>
    <Grid item xs={12} md={4} lg={3} sx={{padding:4}}>
    <Typography variant="h5" fontWeight="bold">Related Products</Typography>
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>

      {/* Display related products */}
      {relatedProducts.map((relatedProduct, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 2}}>
          <Box
            component="img"
            src={relatedProduct.image}
            alt={relatedProduct.name}
            sx={{
              width: 80,
              height: 80,
              borderRadius: 1,
              boxShadow: 1,
              objectFit: 'cover',
            }}
          />
          <Box>
            <Typography variant="body2">{relatedProduct.name}</Typography>
            <Typography variant="body2" color="text.secondary">${relatedProduct.discount_price}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Grid>
    </div>
  )
}

export default Related_Products
