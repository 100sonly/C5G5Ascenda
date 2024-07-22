import React from 'react';
import '../../App.css';
import {Card, CardContent, CardMedia, Typography, Button, Grid, Box, Rating} from '@mui/material';
import ListHotel from "../ListHotel";
import HeroSection from '../HeroSection';
import Filter from "../Filter";
import TopRatedHotels from '../TopRatedHotels';




function Hotels() {
    return (
      <>
        <HeroSection />
        {/* <Filter /> */}
        <ListHotel />
      </>
    );
  }
  
  export default Hotels;