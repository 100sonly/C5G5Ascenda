import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import './TopRatedHotels.css'; 

function TopRatedHotels() {
  const topHotels = [
    { id: 1, name: 'Four Seasons Villa', rating: 5, price: 2643.32, address: 'Jimbaran Bay Jimbaran Denpasar 80361', imageUrl: "https://d2ey9sqrvkqdfs.cloudfront.net/epfM/4.jpg" },
    { id: 2, name: 'The Fullerton Hotel Singapore', rating: 5, price: 1187.42, address: '1 Fullerton Square', imageUrl: "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/0.jpg" },
    { id: 3, name: 'Park Hyatt New York', rating: 5, price: 3145.83, address: '153 West 57Th Street', imageUrl: 'https://d2ey9sqrvkqdfs.cloudfront.net/V0RQ/8.jpg' },
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
              <div className="card-media-wrapper">
                <CardMedia
                  component="img"
                  image={hotel.imageUrl}
                  alt={hotel.name}
                  style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }}
                />
              </div>
            <CardContent>
              <Typography variant="h5" component="div" style={{ fontWeight: 'bold', fontFamily: 'Inter' }}>
                {hotel.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bold', fontFamily: 'Inter'}}>
                Rating: {hotel.rating}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bold', fontFamily: 'Inter'}}>
                {hotel.address}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bold', fontFamily: 'Inter', color: '#FEBB02'}}>
                ${hotel.price}/night
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
