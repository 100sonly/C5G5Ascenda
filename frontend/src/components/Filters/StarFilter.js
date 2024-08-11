import React, { useState } from 'react';
import { Rating } from '@mui/material';
import './Filters.css';

const StarFilter = ({ onFilterChange, starRatingCounts }) => {
  const [selectedStars, setSelectedStars] = useState([]);

  const handleStarChange = (e) => {
    const value = Number(e.target.value);
    const updatedStars = selectedStars.includes(value)
      ? selectedStars.filter(star => star !== value)
      : [...selectedStars, value];

    setSelectedStars(updatedStars);
    const selectedRanges = starRatingCounts.filter(option => updatedStars.includes(option.value));
    onFilterChange({ starRating: selectedRanges });
  };

  return (
    <div className="filter-section">
      <h3>Star Rating</h3>
      <ul>
        {starRatingCounts.map((starRating, index) => (
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