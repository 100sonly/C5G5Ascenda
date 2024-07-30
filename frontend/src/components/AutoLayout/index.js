import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',  
    borderRadius: '5px', 
    ...theme.typography.body2,
    padding: '23px 31px',
    textAlign: 'center',
    color: 'black',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',  
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,  
    fontSize: '16px', 
    minWidth: '120px',  
    maxWidth: '200px',
    transition: 'transform 0.5s, box-shadow 0.5s', 
  '&:hover': {
    transform: 'scale(1.01)', 
    boxShadow: '12px 12px 12px rgba(0, 0, 0, 0.1), -10px -10px 10px white' 
  },
  }));

function camelCaseToSpaced(string) {
  let outString = "";
  let character = string.charAt(0);
  outString = outString + character.toUpperCase();
  for (let i = 1; i < string.length; i++) {
    character = string.charAt(i);
    if (!isNaN(character * 1)) {
      outString = outString + character;
    } else {
      if (character === character.toUpperCase()) {
        outString = outString + " " + character;
      }
      if (character === character.toLowerCase()) {
        outString = outString + character;
      }
    }
  }
  return outString;
}

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

const AutoGrid = ({ amenities }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        {amenities.map((amenity, index) => (
          <Grid item key={index}>
            <Item>
              <img
                src={`/AmenityIcons/${amenityIcons[amenity]}`}
                alt={camelCaseToSpaced(amenity)}
                style={{ width: '24px', height: '24px', marginRight: '12px' }}
              />
              {camelCaseToSpaced(amenity)}
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AutoGrid;
