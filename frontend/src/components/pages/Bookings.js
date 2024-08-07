import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOnRounded';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/PhoneOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarTodayRounded';
import RoomIcon from '@mui/icons-material/RoomPreferencesOutlined';
import PriceCheckIcon from '@mui/icons-material/PaymentRounded';
import RequestQuoteIcon from '@mui/icons-material/DescriptionOutlined';
import BedIcon from '@mui/icons-material/BedRounded';
import HalfRating from '../HalfRating';
import ConfirmationAmenities from '../ConfirmationAmenities';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import DeleteConfirmationModal from '../DeleteConfirmationModal';


function Bookings() {
  const location = useLocation();
  const { bookingDetails, hotelData } = location.state || {};

  const [modalOpen, setModalOpen] = useState(false);

  const iconStyle = {
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'fff',
    backgroundColor: '#EAECFF',
    marginRight: 10,
  };

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleDelete = () => {
    console.log('Delete booking clicked');
  };


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
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography
              variant="h6"
              component="h2"
              style={{ padding: '1%', fontFamily: 'Inter', fontWeight: 'bold', marginBottom: '4px' }}
            >
              Thank you for booking with us!
            </Typography>
            <Button
              variant="outlined"
              style={{ alignSelf: 'center' }}
              onClick={() => setModalOpen(true)}
            >
              Delete Booking
            </Button>
          </Box>
          <Divider orientation="horizontal" style={{ marginLeft: '1%', width: '99%' }} />
          <Box display="flex" alignItems="center" justifyContent={'space-between'} mt={2} padding={'1%'}>
            <Box>
              <Typography variant="h4" style={{ fontFamily: 'Inter', fontWeight: 'bold' }}>
                Welcome, {toTitleCase(bookingDetails.personalInfo.salutation)} {toTitleCase(bookingDetails.personalInfo.firstName)}{' '}
                {toTitleCase(bookingDetails.personalInfo.lastName)}
              </Typography>
            </Box>
            <Typography variant="h6" style={{ fontFamily: 'Inter', fontWeight: 'bold' }}>
                Booking ID: {bookingDetails.bookingId}
            </Typography>
          </Box>
          <Box style={{ display: 'flex', padding: '1%' }} gap={4} >
              <Box>
                <Typography variant="h5" gutterBottom style={{ fontFamily: 'Inter', fontWeight: 'bold' }}>
                  Personal Information
                </Typography>
                <Box display="flex" alignItems="center" mb={2} >
                  <Box style={iconStyle}>
                    <PersonIcon />
                  </Box>
                  <Typography variant="body2" style={{ fontFamily: 'Inter' }}>
                    Name: {toTitleCase(bookingDetails.personalInfo.salutation)} {toTitleCase(bookingDetails.personalInfo.firstName)}{' '}
                    {toTitleCase(bookingDetails.personalInfo.lastName)}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box style={iconStyle}>
                    <EmailIcon />
                  </Box>
                  <Typography variant="body2" style={{ fontFamily: 'Inter' }}>
                    Email: {bookingDetails.personalInfo.emailAddress}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box style={iconStyle}>
                    <PhoneIcon />
                  </Box>
                  <Typography variant="body2" style={{ fontFamily: 'Inter' }}>
                    Phone: {bookingDetails.personalInfo.phoneNumber}
                  </Typography>
                </Box>
                {bookingDetails.personalInfo.specialRequests && (
                  <Box display="flex" alignItems="center" >
                    <Box style={iconStyle}>
                      <RequestQuoteIcon />
                    </Box>
                    <Typography variant="body2" style={{ fontFamily: 'Inter' }}>
                      Special Requests: {bookingDetails.personalInfo.specialRequests}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box>
                <Typography variant="h5" gutterBottom style={{ fontFamily: 'Inter', fontWeight: 'bold' }}>
                  Booking Information
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box style={iconStyle}>
                    <RoomIcon />
                  </Box>
                  <Typography variant="body2" style={{ fontFamily: 'Inter' }}>
                    Room Type: {bookingDetails.roomName}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box style={iconStyle}>
                    <CalendarTodayIcon />
                  </Box>
                  <Typography variant="body2" style={{ fontFamily: 'Inter' }}>
                    Check-in: {bookingDetails.checkIn.date} {bookingDetails.checkIn.time}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box style={iconStyle}>
                    <CalendarTodayIcon />
                  </Box>
                  <Typography variant="body2" style={{ fontFamily: 'Inter' }}>
                    Check-out: {bookingDetails.checkOut.date} {bookingDetails.checkOut.time}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box style={iconStyle}>
                    <BedIcon />
                  </Box>
                  <Typography variant="body2" style={{ fontFamily: 'Inter' }}>
                    Nights: {bookingDetails.nights}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Box style={iconStyle}>
                    <PriceCheckIcon />
                  </Box>
                  <Typography variant="body2" style={{ fontFamily: 'Inter' }}>
                    Total Price: ${bookingDetails.price}
                  </Typography>
                </Box>
              </Box>
              <Box flex={1} minWidth={200} height={'50%'} >
                <Box
                  component="img"
                  src={hotelData.heroImage}
                  alt="Hotel Image"
                  sx={{ width: '100%', height: '80%', objectFit: 'cover', borderRadius: 1 }}
                />
              </Box>
            </Box>
          <CardContent>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} >
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
                      <Box>
                        <LocationOnIcon color="#1A1E43" />
                      </Box>
                      <Typography variant="body2" color="textSecondary" ml={0.5} style={{ fontFamily: 'Inter' }}>
                        {hotelData.hotelAddress}
                      </Typography>
                    </Box>
                  </Box>
                  <Box >
                    <Typography variant="body" color="textPrimary" style={{ fontFamily: 'Inter' }}>
                      {bookingDetails.numberOfRooms} {bookingDetails.numberOfRooms === 1 ? 'room' : 'rooms'}{' '}
                      {bookingDetails.nights} {bookingDetails.nights === 1 ? 'night' : 'nights'}
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
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex" flexDirection="column" justifyContent="center">
                      <ConfirmationAmenities amenities={hotelData.hotelAmenities} />
                  </Box>
                  <Box display="flex" flexDirection="column" justifyContent='flex-end'>
                    <Typography variant="body" style={{ fontFamily: 'Inter', fontWeight: '500' }}>
                      {bookingDetails.roomName}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1">No booking details available.</Typography>
      )}
      <DeleteConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Bookings;