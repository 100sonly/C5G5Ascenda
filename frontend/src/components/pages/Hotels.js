import React, { useState } from 'react';
import '../../App.css';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box, Rating } from '@mui/material';
import ListHotel from "../ListHotel";
import HeroSection from '../HeroSection';
import Filter from "../Filter";
import TopRatedHotels from '../TopRatedHotels';
import './Hotel.css';

function Hotels() {
  const [filter, setFilter] = useState({ priceRange: [], starRating: [] });

  const handleFilterChange = (selectedFilters) => {
    setFilter(selectedFilters);
  };

  return (
    <div>
      <HeroSection />
      <div className="container">
        <div className="left">
          <Filter onFilterChange={handleFilterChange} />
        </div>
        <div className="right">
          <ListHotel filter={filter} />
        </div>
      </div>
    </div>
  );
}

export default Hotels;