import React, { useState } from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import './Filter.css';

const Filter = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([]);

  const priceOptions = [
    { label: '$0 - $200', min: 0, max: 200, count: 200 },
    { label: '$200 - $500', min: 200, max: 500, count: 100 },
    { label: '$500 - $1,000', min: 500, max: 1000, count: 15 },
    { label: '$1,000 - $2,000', min: 1000, max: 2000, count: 12 },
    { label: '$2,000 - $5,000', min: 2000, max: 5000, count: 230 },
  ];

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    const updatedPriceRange = priceRange.includes(value)
      ? priceRange.filter((item) => item !== value)
      : [...priceRange, value];

    setPriceRange(updatedPriceRange);
    const selectedRanges = priceOptions.filter(option => updatedPriceRange.includes(option.label));
    onFilterChange(selectedRanges);
  };

  return (
    <Card className="filter-container">
      <CardContent>
        <Typography variant="h6" component="div" style={{ fontWeight: 'bold', fontFamily: 'Inter' }}>
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
                />
              }
              label={
                <div className="filter-option">
                  <span>{option.label}</span>
                  <span className="count">{option.count}</span>
                </div>
              }
            />
          ))}
        </FormGroup>
      </CardContent>
    </Card>
  );
};

export default Filter;