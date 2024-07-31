import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import HalfRating from '../HalfRating';

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
        <Typography fontFamily={'Inter'} fontWeight={'bold'} gutterBottom variant="h6" component="div">
          {hotelName}
        </Typography>
        <HalfRating rating={parseFloat(hotelRating)}/>
        <Typography fontFamily={'Inter'} variant="body2" color="text.secondary">
          Address: {hotelAddress}
        </Typography>
        <Typography fontFamily={'Inter'} variant="body2" color="text.secondary">
          Amenities: {hotelAmenities.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
}
