import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import './TopRatedHotels.css'; 

function TopRatedHotels() {
  const topHotels = [
    { id: 1, name: 'Hotel A', rating: 4.5, price: 2024, imageUrl: '/hotel-a.jpg' },
    { id: 2, name: 'Hotel B', rating: 4.2, price: 2024, imageUrl: '/hotel-b.jpg' },
    { id: 3, name: 'Hotel C', rating: 4.8, price: 2024, imageUrl: '/hotel-c.jpg' },
  ];

  return (
    <div className="top-rated-hotels-container">
      <Typography variant="h5" component="h2" gutterBottom style={{ fontWeight: 'bold', fontFamily: 'Inter' }}>
        Top Rated Hotels
      </Typography>
      <div className="divider"></div>
      <div className="top-hotels-list">
        {topHotels.map(hotel => (
          <Card key={hotel.id} className="tophotel-card">
            <CardMedia
              component="img"
              height="200"
              image={hotel.imageUrl}
              alt={hotel.name}
            />
            <CardContent>
              <Typography variant="h5" component="div" style={{ fontWeight: 'bold', fontFamily: 'Inter' }}>
                {hotel.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Inter'}}>
                Rating: {hotel.rating}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bold', fontFamily: 'Inter', color: '#FEBB02'}}>
                Price: {hotel.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" style={{ fontWeight: 'bold', fontFamily: 'Inter' }}>
                Book Now
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TopRatedHotels;
