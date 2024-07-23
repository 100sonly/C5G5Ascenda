import React, { useState } from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import './Filter.css';

const Filter = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([]);
  const [starRating, setStarRating] = useState([]);

  const priceOptions = [
    { label: '$0 - $200', min: 0, max: 200, count: 200 },
    { label: '$200 - $500', min: 200, max: 500, count: 100 },
    { label: '$500 - $1,000', min: 500, max: 1000, count: 15 },
    { label: '$1,000 - $2,000', min: 1000, max: 2000, count: 12 },
    { label: '$2,000 - $5,000', min: 2000, max: 5000, count: 230 },
  ];

  const starOptions = [
    { label: 5, count: 83 },
    { label: 4, count: 24 },
    { label: 3, count: 10 },
    { label: 2, count: 26 },
    { label: 1, count: 34 },
  ];

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    const updatedPriceRange = priceRange.includes(value)
      ? priceRange.filter((item) => item !== value)
      : [...priceRange, value];

    setPriceRange(updatedPriceRange);
    const selectedRanges = priceOptions.filter(option => updatedPriceRange.includes(option.label));
    onFilterChange({ priceRange: selectedRanges, starRating });
  };

  const handleStarRatingChange = (e) => {
    const value = parseInt(e.target.value);
    const updatedStarRating = starRating.includes(value)
      ? starRating.filter((item) => item !== value)
      : [...starRating, value];

    setStarRating(updatedStarRating);
    onFilterChange({ priceRange, starRating: updatedStarRating });
  };

  return (
    <Card className="filter-container">
      <CardContent>
        <Typography variant="h6" className="filter-title">
          Price Range
        </Typography>
        <FormGroup>
          {priceOptions.map((option, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  value={option.label}
                  onChange={handlePriceRangeChange}
                  checked={priceRange.includes(option.label)}
                  className="filter-checkbox"
                />
              }
              label={
                <div className="filter-option">
                  <span>{option.label}</span>
                  <span className="count">{option.count}</span>
                </div>
              }
              className="filter-label"
            />
          ))}
        </FormGroup>
        <Typography variant="h6" className="filter-title" style={{ marginTop: '1rem' }}>
          Star Rating
        </Typography>
        <FormGroup>
          {starOptions.map((option, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  value={option.label}
                  onChange={handleStarRatingChange}
                  checked={starRating.includes(option.label)}
                  className="filter-checkbox"
                />
              }
              label={
                <div className="filter-option">
                  {[...Array(option.label)].map((_, i) => (
                    <span key={i} className="star-filled">★</span>
                  ))}
                  {[...Array(5 - option.label)].map((_, i) => (
                    <span key={i} className="star-empty">★</span>
                  ))}
                  <span className="count">{option.count}</span>
                </div>
              }
              className="filter-label"
            />
          ))}
        </FormGroup>
      </CardContent>
    </Card>
  );
};

export default Filter;