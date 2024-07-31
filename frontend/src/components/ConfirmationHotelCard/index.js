import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import HalfRating from '../HalfRating';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import ConfirmationAmenities from '../ConfirmationAmenities'; 
import LocationOnRounded from '@mui/icons-material/LocationOnRounded';

export default function ConfirmationHotelCard({
  heroImage,
  hotelName,
  hotelRating,
  hotelAddress,
  hotelAmenities 
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={heroImage}
        title={hotelName}
      />
      <CardContent>
        <Typography fontFamily={'Inter'} fontWeight={'bold'} variant="h6" component="div">
          {hotelName}
        </Typography>
        <HalfRating rating={parseFloat(hotelRating)}/>
        <Box paddingTop={'2%'} display="flex" alignItems="center" gap={0.2}>
          <Icon 
            component={LocationOnRounded} 
            sx={{ width: 20, height: 20, color: '#1A1E43', borderRadius: '50%', backgroundColor: 'background.paper', padding: '1px' }} 
          />
          <Typography fontFamily={'Inter'} variant="body2" color="text.secondary">
            {hotelAddress}
          </Typography>
        </Box>
        <ConfirmationAmenities amenities={hotelAmenities} /> 
      </CardContent>
    </Card>
  );
}
