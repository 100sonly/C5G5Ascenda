import React from 'react';
import { Card, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RoomDetailsDialog from '../RoomDetailsDialog/index.js';
import './index.css';
import { amenityIcons } from '../RoomAmenityIcons/index.js';
import { Helmet } from "react-helmet"

const RoomCard = ({giveRoomName,givePrice, room }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);

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
      : "No Free Cancellation";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const displayedAmenities = room.amenities.slice(0, 5);
  const additionalAmenitiesCount = room.amenities.length - displayedAmenities.length;



  function sendUpdate(price,name){

    givePrice(price);
    giveRoomName(name);
  }

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
            height: '200px' 
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
          {displayedAmenities.map((amenity, index) => (
            <Box key={index} component="span" style={{ display: 'flex', alignItems: 'center', marginRight: '2%' }}>
              {amenityIcons[amenity] || <span>{amenity}</span>}
              <Typography variant="body2" color="textSecondary" style={{ marginLeft: '5px' }}>
                {amenity}
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
      <Box className="room-actions" component="div">

        <Button variant="contained" color="primary" className="room-select-button" onClick={() => sendUpdate(room.price,room.roomNormalizedDescription)} fontFamily={'Inter'}>
          Select
        </Button>
        <Box className="room-price" component="div">
          <Typography variant="body2" color="textSecondary" fontFamily={'Inter'}>
            1 Room | 2 Adults, 0 Children
          </Typography>
          <Typography variant="h6" component="div" color="#FEBB02" style={{ fontFamily: 'Inter', fontWeight: 'bold'}}>
            ${room.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" fontFamily={'Inter'}>
            Taxes incl.
          </Typography>
        </Box>
      </Box>
      <RoomDetailsDialog open={open} onClose={handleClose} room={room} />
    </Card>
  );
}

export default RoomCard;

