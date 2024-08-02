import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Icon } from '@mui/material';

const amenityIcons = {
    airConditioning: 'airConditioning.svg',
    businessCenter: 'businessCenter.svg',
    clothingIron: 'clothingIron.svg',
    dataPorts: 'dataPorts.svg',
    dryCleaning: 'dryCleaning.svg',
    hairDryer: 'hairDryer.svg',
    meetingRooms: 'meetingRooms.svg',
    outdoorPool: 'outdoorPool.svg',
    parkingGarage: 'parkingGarage.svg',
    roomService: 'roomService.svg',
    safe: 'safe.svg',
    tVInRoom: 'tVInRoom.svg',
    voiceMail: 'voiceMail.svg',
    carRentDesk: 'carRentDesk.svg',
    childrenAllowed: 'childrenAllowed.svg',
    coffeeTeaMaker: 'coffeeTeaMaker.svg',
    continentalBreakfast: 'continentalBreakfast.svg',
    exteriorRoomEntrance: 'exteriorRoomEntrance.svg',
    fitnessFacility: 'fitnessFacility.svg',
    gameRoom: 'gameRoom.svg',
    golfCourse: 'golfCourse.svg',
    handicapAccessible: 'handicapAccessible.svg',
    inHouseBar: 'inHouseBar.svg',
    inHouseDining: 'inHouseDining.svg',
    indoorPool: 'indoorPool.svg',
    interiorRoomEntrance: 'interiorRoomEntrance.svg',
    kitchen: 'kitchen.svg',
    miniBarInRoom: 'miniBarInRoom.svg',
    nonSmokingRooms: 'nonSmokingRooms.svg',
    petsAllowed: 'petsAllowed.svg',
    restrictedAccess: 'restrictedAccess.svg',
    sauna: 'sauna.svg',
    tennisCourt: 'tennisCourt.svg',
    valetParking: 'valetParking.svg',
    videoCheckOut: 'videoCheckOut.svg',
    wakeUpService: 'wakeUpService.svg'
};


const camelCaseToText = (str) => {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .split(' ') 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join(' ');
};

const ConfirmationAmenities = ({ amenities }) => {
    const theme = useTheme();

    return (
        <Box paddingTop={'10%'} margin={0}>
            <Box
                display="flex"
                flexWrap="wrap" 
                gap={1} 
                sx={{ 
                    alignItems: 'center',
                    bgcolor: theme.palette.background.paper,
                }}
            >
                {Object.entries(amenities).map(([amenityName, isAvailable]) => (
                    isAvailable && (
                        <Box 
                            key={amenityName}
                            display="flex"
                            alignItems="center"
                            sx={{ 
                                padding: 0.5,
                                boxSizing: 'border-box',
                            }}
                        >
                            <Icon 
                                component="img" 
                                src={`/AmenityIcons/${amenityIcons[amenityName]}`}
                                alt={amenityName} 
                                sx={{ width: 18, height: 18, marginRight: 1.5 }} 
                            />
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    fontSize: '0.75rem', 
                                    whiteSpace: 'nowrap', 
                                    overflow: 'hidden', 
                                    textOverflow: 'ellipsis',
                                    fontFamily: 'Inter',
                                    fontWeight: '500'
                                }}
                            > 
                                {camelCaseToText(amenityName)}
                            </Typography>
                        </Box>
                    )
                ))}
            </Box>
        </Box>
    );
};

export default ConfirmationAmenities;
