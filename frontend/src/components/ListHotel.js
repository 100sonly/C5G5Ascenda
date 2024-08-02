import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Rating } from '@mui/material';
import { AiFillEnvironment } from 'react-icons/ai';
import './ListHotel.css';

function ListHotel({ filter }) {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  async function processHotels(hotels, all_hotels) {
    for (const item of hotels) {
      var result = all_hotels.find(hotel => hotel.id === item.hotel_id);
      item.details = result;
    }
  }

  // Function to fetch hotel data from the backend
  const fetchHotels = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const destinationId = urlParams.get('destination_id');
    const checkin = urlParams.get('checkin');
    const checkout = urlParams.get('checkout');
    const guests = urlParams.get('guests');

    try {
      const response = await fetch(`http://localhost:3000/prices/destination/${destinationId}/${checkin}/${checkout}/en_US/SGD/${guests}`);
      const data = await response.json();

      const all_hotels = await fetch(`http://localhost:3000/hotels/destination/${destinationId}`);
      const hotel_info = await all_hotels.json();

      await processHotels(data, hotel_info);

      // Hotel details are now under each entry's "details" attribute after processHotels
      setHotels(data);
      setFilteredHotels(data);  // Set the initial filteredHotels to all fetched hotels
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch hotel data when component mounts
  useEffect(() => {
    fetchHotels();
  }, []);

  // Filter hotels based on price range and star rating
  useEffect(() => {
    if (!filter.priceRange.length && !filter.starRating.length) {
      setFilteredHotels(hotels);
    } else {
      const filtered = hotels.filter(hotel => {
        const matchesPrice = filter.priceRange.length
          ? filter.priceRange.some(range => hotel.price >= range.min && hotel.price <= range.max)
          : true;
        const matchesStar = filter.starRating.length
          ? filter.starRating.includes(Math.round(hotel.details.rating))
          : true;
        return matchesPrice && matchesStar;
      });
      setFilteredHotels(filtered);
    }
  }, [filter, hotels]);

  return (
    <div className="list-hotel-container">
      {filteredHotels.map((hotel) => (
        <Card key={hotel.hotel_id} className="hotel-card">
          <Box className="hotel-card-box">
            <Box className="hotel-image-box">
              <CardMedia
                component="img"
                image={hotel.details ? hotel.details.imageUrl : '/placeholder.jpg'}
                alt={hotel.details ? hotel.details.name : 'Hotel Image'}
                className="hotel-image"
              />
            </Box>
            <Box className="hotel-card-content">
              <Typography variant="h5" component="div" style={{ fontFamily: 'Inter', fontSize: '20px' }}>
                {hotel.details ? hotel.details.name : 'Hotel Name'}
              </Typography>
              <Box className="hotel-rating">
                <Rating value={hotel.details ? hotel.details.rating : 0} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary" style={{ marginLeft: '8px', fontFamily: 'Inter' }}>
                  {hotel.details ? hotel.details.rating : '0'} ({hotel.details ? hotel.details.reviews : '0'} Reviews)
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Inter' }}>
                <AiFillEnvironment /> {hotel.details ? hotel.details.location : 'Location'}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Inter' }}>
                {hotel.details ? hotel.details.description : 'Description'}
              </Typography>
              <Box className="hotel-card-footer">
                <Button className="select-button" size="small" color="primary" variant="contained" style={{ fontWeight: 'bold', fontFamily: 'Inter', backgroundColor: '#1A1A48',}}>
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