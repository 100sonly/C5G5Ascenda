import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOnRounded';
import HalfRating from '../HalfRating';
import Divider from '@mui/material/Divider';
import { Padding } from '@mui/icons-material';

function Bookings() {
  const location = useLocation();
  const { bookingDetails, hotelData } = location.state || {};

  return (
    <div style={{ paddingLeft: '8%', paddingRight: '8%', margin: '0 auto' }}>
      <Typography
        variant="h4"
        component="h1"
        style={{ fontFamily: 'Inter', fontWeight: 'bold', marginTop: '20px' }}
        gutterBottom
      >
        Booking Details
      </Typography>
      {bookingDetails && hotelData ? (
        <Card style={{ padding: '1%', marginBottom: '20px' }}>
          <CardContent>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={4}>
              <Box flex={1} minWidth={200} minHeight={250} mb={{ xs: 2, sm: 0 }} >
                <Box
                  component="img"
                  src={hotelData.heroImage}
                  alt="Hotel Image"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1 }}
                  
                />
              </Box>
              <Box flex={2} display="flex" flexDirection="column" justifyContent="space-between">
                <Box flex={2} display="flex" flexDirection="row" justifyContent="space-between">
                  <Box>
                    <Typography
                      variant="h5"
                      component="h2"
                      style={{ fontFamily: 'Inter', fontWeight: 'bold', marginBottom: '4px' }}
                    >
                      {hotelData.hotelName}
                    </Typography>
                    <Box style={{ marginBottom: '4px' }}>
                      <HalfRating rating={hotelData.hotelRating} />
                    </Box>
                    <Box display="flex" alignItems="center" mb={1}>
                      <LocationOnIcon color="#1A1E43" />
                      <Typography variant="body2" color="textSecondary" ml={0.5} style={{ fontFamily: 'Inter' }}>
                        {hotelData.hotelAddress}
                      </Typography>
                    </Box>
                  </Box>
                  <Box style={{marginTop: '4px'}}>
                    <Typography variant="body" color="textPrimary" style={{ fontFamily: 'Inter' }}>
                      {bookingDetails.numberOfRooms} {bookingDetails.numberOfRooms === 1 ? 'room' : 'rooms'} {bookingDetails.nights}{' '}
                      {bookingDetails.nights === 1 ? 'night' : 'nights'}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="#FEBB02"
                      textAlign={'right'}
                      style={{ fontFamily: 'Inter', fontWeight: 'bold' }}
                    >
                      ${bookingDetails.price}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={3} display="flex" justifyContent="space-between">
                  <Box mt={3} display="flex" gap={4}>
                    <Box>
                      <Typography variant="body2" component="p" style={{ fontFamily: 'Inter' }}>
                        Check-in
                      </Typography>
                      <Box>
                        <Typography variant="body" fontFamily={'Inter'} fontWeight={'bold'}>
                          {bookingDetails.checkIn.date}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Inter' }}>
                          {bookingDetails.checkIn.time}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Box>
                      <Typography variant="body2" component="p" style={{ fontFamily: 'Inter' }}>
                        Check-out
                      </Typography>
                      <Box>
                        <Typography variant="body" fontFamily={'Inter'} fontWeight={'bold'}>
                          {bookingDetails.checkOut.date}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Inter' }}>
                          {bookingDetails.checkOut.time}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="column" justifyContent="flex-end">
                    <Button variant="contained" color="primary" style={{ fontFamily: 'Inter' }}>
                      View Details
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1" color="textPrimary">
          Booking details or hotel data is missing.
        </Typography>
      )}
    </div>
  );
}

export default Bookings;
