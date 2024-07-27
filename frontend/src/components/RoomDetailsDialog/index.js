import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/DoneRounded';
import { amenityIcons } from '../RoomAmenityIcons/index.js';
import './index.css';

const RoomDetailsDialog = ({ open, onClose, room }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : room.images.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < room.images.length - 1 ? prevIndex + 1 : 0));
    };

    const handlePreviewClick = (index) => {
        setCurrentIndex(index);
    };

    const renderMarketRates = () => {
        if (room.market_rates && room.market_rates.length > 0) {
            return room.market_rates.map((rate, index) => (
                <Typography key={index} variant="body2" style={{ fontFamily: 'Inter', fontWeight: 'bold', color: '#229935' }}>
                    ${rate.rate ? rate.rate.toFixed(2) : 'Currently unavailable'} (Supplier: {rate.supplier})
                </Typography>
            ));
        }
        return (
            <Typography variant="body2" style={{ fontFamily: 'Inter', color: '#FF0000' }}>
                Currently unavailable
            </Typography>
        );
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogContent dividers style={{ display: 'flex', flexDirection: 'row' }}>
                <Box style={{ marginRight: '20px', flex: '1 1 40%', display: 'flex', flexDirection: 'column' }}>
                    <Box className="image-container" style={{ position: 'relative', marginBottom: '10px' }}>
                        <img
                            src={room.images[currentIndex]?.high_resolution_url}
                            alt={`Room image ${currentIndex + 1}`}
                            style={{ borderRadius: '5px', width: '100%', height: 'auto' }}
                        />
                        <IconButton
                            onClick={handlePrevious}
                            className="prev-icon"
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
                            onClick={handleNext}
                            className="next-icon"
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
                    <Box style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
                        {room.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.high_resolution_url}
                                alt={`Preview ${index + 1}`}
                                onClick={() => handlePreviewClick(index)}
                                className={`preview-image ${currentIndex === index ? 'selected' : ''}`}
                            />
                        ))}
                    </Box>
                </Box>
                <Box style={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column' }}>
                    <DialogTitle style={{ fontFamily: 'Inter', fontWeight: 'bold', padding: '0' }}>
                        {room.roomNormalizedDescription}
                    </DialogTitle>
                    <Box className="room-amenities" style={{ color: '#229935', display: 'flex', flexWrap: 'wrap', margin: '10px 0' }}>
                        {room.amenities.slice(0, 5).map((amenity, index) => (
                            <Box key={index} component="span" style={{ fontFamily: 'Inter', display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                                {amenityIcons[amenity] || 'span'}
                                <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Inter', marginLeft: '5px' }}>
                                    {amenity}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box className="rates" style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                        <Box className="rates" style={{ display: 'flex'}}>
                        <Typography variant="body2" style={{ fontWeight: 'bold', fontFamily: 'Inter', marginRight: '5px' }}>
                            Price:
                        </Typography>
                        <Typography variant="body2" style={{ fontWeight: 'bold', fontFamily: 'Inter', color: '#FEBB02' }}>
                            ${room.price}
                        </Typography>
                        </Box>
                        <Box className="rates" style={{ display: 'flex'}}>
                        <Typography variant="body2" style={{ fontWeight: 'bold', fontFamily: 'Inter', marginRight: '5px' }}>
                           Available Market Rates:
                        </Typography>
                        {renderMarketRates()}
                        </Box>
                    </Box>
                    <Typography variant="body2" style={{ marginTop: '10px' }}>
                        <div dangerouslySetInnerHTML={{ __html: room.long_description }} />
                    </Typography>
                    <Box style={{ marginBottom: '20px', marginTop: '20px' }}>
                        <Typography variant="body2" style={{ fontFamily: 'Inter', fontWeight: 'bold' }}>
                            Room Facilities:
                        </Typography>
                        <Box style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '10px',
                            marginTop: '10px'
                        }}>
                            {room.amenities.map((amenity, index) => (
                                <Box key={index} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                                    <CheckCircleIcon color="#1A1E43" style={{ marginRight: '5px' }} />
                                    <Typography variant="body2" style={{ fontFamily: 'Inter' }}>
                                        {amenity}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" style={{ fontFamily: 'Inter', fontWeight: 'bold' }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RoomDetailsDialog;
