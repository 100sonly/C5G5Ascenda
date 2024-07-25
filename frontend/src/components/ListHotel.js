import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Rating } from '@mui/material';
import { AiFillEnvironment } from 'react-icons/ai';
import './ListHotel.css';

function ListHotel({ filter }) {
  const [filteredHotels, setFilteredHotels] = useState([]);

  const hotels = [
    {
      id: 1,
      name: 'The Fullerton Hotel Singapore',
      rating: 4.4,
      reviews: 543,
      price: 560,
      imageUrl: '/placeholder.jpg',
      location: 'Singapore',
      description: 'Descriptive details about the hotel may include the amenities.',
    },
    {
      id: 2,
      name: 'Marina Bay Sands',
      rating: 4.5,
      reviews: 543,
      price: 380,
      imageUrl: '/placeholder.jpg',
      location: 'Singapore',
      description: 'Descriptive details about the hotel may include the amenities.',
    },
    {
      id: 3,
      name: 'Hotel 81',
      rating: 3.5,
      reviews: 183,
      price: 85,
      imageUrl: '/placeholder.jpg',
      location: 'Singapore',
      description: 'Descriptive details about the hotel may include the amenities.',
    },
  ];

  useEffect(() => {
    if (!filter.priceRange.length && !filter.starRating.length) {
      setFilteredHotels(hotels);
    } else {
      const filtered = hotels.filter(hotel => {
        const matchesPrice = filter.priceRange.length
          ? filter.priceRange.some(range => hotel.price >= range.min && hotel.price <= range.max)
          : true;
        const matchesStar = filter.starRating.length
          ? filter.starRating.includes(Math.round(hotel.rating))
          : true;
        return matchesPrice && matchesStar;
      });
      setFilteredHotels(filtered);
    }
  }, [filter]);

  return (
    <div className="list-hotel-container">
      {filteredHotels.map((hotel) => (
        <Card key={hotel.id} className="hotel-card">
          <Box className="hotel-card-box">
            <Box className="hotel-image-box">
              <CardMedia
                component="img"
                image={hotel.imageUrl}
                alt={hotel.name}
                className="hotel-image"
              />
            </Box>
            <Box className="hotel-card-content">
              <Typography variant="h5" component="div" style={{ fontFamily: 'Inter', fontSize: '20px' }}>
                {hotel.name}
              </Typography>
              <Box className="hotel-rating">
                <Rating value={hotel.rating} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary" style={{ marginLeft: '8px', fontFamily: 'Inter' }}>
                  {hotel.rating} ({hotel.reviews} Reviews)
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Inter' }}>
                <AiFillEnvironment /> {hotel.location}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Inter' }}>
                {hotel.description}
              </Typography>
              <Box className="hotel-card-footer">
                <Button size="small" color="primary" variant="contained" style={{ fontWeight: 'bold', fontFamily: 'Inter' }}>
                  Select
                </Button>
                <Box className="hotel-price">
                  <Typography variant="body2" style={{ fontWeight: 'bold', fontFamily: 'Inter', color: '#FEBB02' }}>
                    {hotel.price} SGD
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Inter' }}>
                    Taxes incl.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
      ))}
    </div>
  );
}

export default ListHotel;