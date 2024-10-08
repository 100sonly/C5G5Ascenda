import React from 'react';
import { Card, CardContent, Typography, Button, Box, IconButton, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RoomDetailsDialog from '../RoomDetailsDialog/index.js';
import './index.css';
import { amenityIcons } from '../RoomAmenityIcons/index.js';
import { Link } from "react-router-dom";
import Slide from '@mui/material/Slide';
import UnknownIcon from '@mui/icons-material/CheckCircleOutlineRounded.js'; 

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const RoomCard = ({ giveRoomName, givePrice, room, params }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedRooms, setSelectedRooms] = React.useState(0);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const currentImage = room.images[currentIndex]?.high_resolution_url || 
                        room.images[currentIndex]?.url || 
                        '';

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : room.images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < room.images.length - 1 ? prevIndex + 1 : 0));
  };

  const cancellationText = room.free_cancellation 
      ? "Free Cancellation" 
      : "Cancellation Fee Applies";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRoomChange = (event) => {
    const numberOfRooms = event.target.value;
    setSelectedRooms(numberOfRooms);
    givePrice(room.price * numberOfRooms);
  };

  const handleBookClick = () => {
    if (selectedRooms === 0) {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const getAmenitiesWithWeights = (amenities) => {
    const withIcons = [];
    const withoutIcons = [];
    
    amenities.forEach((amenity, index) => {
      if (amenityIcons.hasOwnProperty(amenity)) {
        withIcons.push({
          amenity,
          icon: amenityIcons[amenity]
        });
      } else {
        withoutIcons.push({
          amenity,
          icon: <UnknownIcon key={index} />
        });
      }
    });

    return withIcons.concat(withoutIcons);
  };

  const allAmenities = getAmenitiesWithWeights(room.amenities);
  const displayedAmenities = allAmenities.slice(0, 5);
  const additionalAmenitiesCount = room.amenities.length - displayedAmenities.length;

  function sendUpdate(price, name) {
    givePrice(price);
    giveRoomName(name);
  }

  const formatPrice = (price) => price.toFixed(2);

  const totalPrice = formatPrice(room.price * selectedRooms);
  const roomPrice = formatPrice(room.price);

  return (
    <Card className="room-card">
      <Box className="room-image-wrapper" style={{ position: 'relative' }}>
        <Box 
          className="room-image" 
          component="div" 
          style={{ 
            backgroundImage: `url(${currentImage})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            borderRadius: '5px',
            height: '220px' 
          }} 
        />
        <IconButton 
          className="nav-button prev-button" 
          onClick={handlePrevious} 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '10px', 
            transform: 'translateY(-50%)', 
            backgroundColor: '#fff' 
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton 
          className="nav-button next-button" 
          onClick={handleNext} 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            right: '10px', 
            transform: 'translateY(-50%)', 
            backgroundColor: '#fff' 
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
      <CardContent className="room-content">
        <Typography 
          variant="h6" 
          component="div" 
          className="room-title"
          style={{ fontFamily: 'Inter', cursor: 'pointer', textDecoration: 'underline' }} 
          onClick={handleClickOpen}
        >
          {room.roomNormalizedDescription}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="room-cancellation" fontFamily={'Inter'}>
          {cancellationText}
        </Typography>
        <Box className="room-amenities" style={{ color: '#229935', display: 'flex', flexWrap: 'wrap', paddingTop: '12%' }}>
          {displayedAmenities.map((item, index) => (
            <Box key={index} component="span" style={{ display: 'flex', alignItems: 'center', marginRight: '2%' }}>
              {item.icon}
              <Typography variant="body2" color="textSecondary" style={{ marginLeft: '5px' }}>
                {item.amenity}
              </Typography>
            </Box>
          ))}
          {additionalAmenitiesCount > 0 && (
            <Typography variant="body2" color="textSecondary" fontFamily={'Inter'}>
              +{additionalAmenitiesCount} other amenities
            </Typography>
          )}
        </Box>
      </CardContent>
      <Box className="room-actions" component="div" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <FormControl variant="outlined" size="small">
            <InputLabel id="room-select-label">Rooms</InputLabel>
            <Select
              labelId="room-select-label"
              value={selectedRooms}
              onChange={handleRoomChange}
              label="Rooms"
              style={{ marginRight: '16px' }}
            >
              {[0, 1, 2, 3, 4, 5].map((number) => (
                <MenuItem key={number} value={number}>
                  {number}
                  {number > 0 && ` $${formatPrice(room.price * number)}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedRooms > 0 ? (
            <Link to={`../checkout?price=${totalPrice}&roomName=${room.roomNormalizedDescription}&roomNum=${selectedRooms}`} state={{ params: { params } }}>
              <Button 
                variant="contained" 
                color="primary" 
                className="room-book-button" 
                fontFamily={'Inter'}
                onClick={handleBookClick}
              >
                Book
              </Button>
            </Link>
          ) : (
            <Button 
              variant="contained" 
              color="primary" 
              className="room-book-button" 
              fontFamily={'Inter'}
              onClick={handleBookClick}
            >
              Book
            </Button>
          )}
        </Box>
        <Box className="room-price" component="div">
          <Typography variant="body2" color="textSecondary" fontFamily={'Inter'}>
            1 Room | 2 Adults, 0 Children
          </Typography>
          <Typography variant="h6" component="div" color="#FEBB02" style={{ fontFamily: 'Inter', fontWeight: 'bold' }}>
            ${selectedRooms > 0 ? totalPrice : roomPrice}
          </Typography>
          <Typography variant="body2" color="textSecondary" fontFamily={'Inter'}>
            Taxes incl.
          </Typography>
        </Box>
      </Box>
      <RoomDetailsDialog open={open} onClose={handleClose} room={room} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={SlideTransition} 
      >
        <Alert onClose={handleSnackbarClose} severity="warning" style={{ backgroundColor: '#1a1e43', color: '#fff' }}>
          Please specify the number of rooms.
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default RoomCard;
