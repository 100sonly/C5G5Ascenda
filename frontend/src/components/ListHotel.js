import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Skeleton } from '@mui/material';
import { AiFillEnvironment } from "react-icons/ai";
import './ListHotel.css';

const ListHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    const hardcodedHotels = [
      { id: 1, name: 'Fullerton Hotel', rating: 4.5, price: 2024, imageUrl: '/hotel-a.jpg', location: 'Location A', description: 'Descriptive details about Hotel A including amenities.' },
      { id: 2, name: 'Hotel B', rating: 4.2, price: 2024, imageUrl: '/hotel-b.jpg', location: 'Location B', description: 'Descriptive details about Hotel B including amenities.' },
      { id: 3, name: 'Hotel C', rating: 4.8, price: 2024, imageUrl: '/hotel-c.jpg', location: 'Location C', description: 'Descriptive details about Hotel C including amenities.' }
    ];

    setHotels(hardcodedHotels);
    setFilteredHotels(hardcodedHotels);
    setLoading(false);
  }, []);

  return (
    <div className="list-hotel-container">
      {loading ? (
        <>
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton variant="rectangular" width="100%" height={200} />
        </>
      ) : (
        filteredHotels.map(hotel => (
          <Card key={hotel.id} className="hotel-card">
            <Grid container>
              <Grid item xs={10}>
                <CardContent className="hotel-card-content">
                  <Typography variant="h5" component="div" style={{ fontWeight: 'bold', fontFamily: 'Inter' }}>
                    {hotel.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Inter'}}>
                    <AiFillEnvironment /> {hotel.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Inter'}}>
                    {hotel.description}
                  </Typography>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bold', fontFamily: 'Inter', color: '#FEBB02'}}>
                      {hotel.price} SGD
                    </Typography>
                    <Button size="small" color="primary" variant="contained" style={{ fontWeight: 'bold', fontFamily: 'Inter' }}>
                      Select
                    </Button>
                  </Grid>
                </CardContent>
              </Grid>
              <Grid item xs={10}>
                <CardMedia
                  component="img"
                  height="200"
                  image={hotel.imageUrl || '/placeholder.jpg'}
                  alt={hotel.name}
                />
              </Grid>
            </Grid>
          </Card>
        ))
      )}
    </div>
  );
}

export default ListHotel;