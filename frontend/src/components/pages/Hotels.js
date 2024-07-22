import React from 'react';
import '../../App.css';
import {Card, CardContent, CardMedia, Typography, Button, Grid, Box, Rating} from '@mui/material';
import ListHotel from "../ListHotel";
import HeroSection from '../HeroSection';
import Filter from "../Filter";
import TopRatedHotels from '../TopRatedHotels';
import './Hotel.css'

function Hotels() {
  return (
    <div>
      <HeroSection />
      <div className="container">
        <div className="left">
          <Filter />
        </div>
        <div className="right">
          <ListHotel />
        </div>
      </div>
    </div>
  );
}

export default Hotels;