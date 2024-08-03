import React, { useState } from 'react';
import { Rating } from '@mui/material';
import './Filters.css';

const StarFilter = ({ onFilterChange }) => {
  const [selectedStars, setSelectedStars] = useState([]);

  const starRatings = [
    { value: 5, count: 83 },
    { value: 4, count: 24 },
    { value: 3, count: 10 },
    { value: 2, count: 26 },
    { value: 1, count: 34 },
  ];

  const handleStarChange = (e) => {
    const value = Number(e.target.value);
    const updatedStars = selectedStars.includes(value)
      ? selectedStars.filter(star => star !== value)
      : [...selectedStars, value];

    setSelectedStars(updatedStars);
    onFilterChange({ starRating: updatedStars });
  };

  return (
    <div className="filter-section">
      <h3>Star Rating</h3>
      <ul>
        {starRatings.map((starRating, index) => (
          <li key={index}>
            <input 
              type="checkbox" 
              value={starRating.value} 
              onChange={handleStarChange} 
              checked={selectedStars.includes(starRating.value)}
            />
            <label htmlFor={`star${index}`}>
              <div className="star-rating">
                <Rating value={starRating.value} readOnly />
                <span>{starRating.count}</span>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StarFilter;