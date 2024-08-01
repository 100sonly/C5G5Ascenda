import React, { useState } from 'react';
import './StarFilter.css';

const StarFilter = ({ onFilterChange }) => {
  const [selectedStars, setSelectedStars] = useState([]);

  const starRatings = [
    { label: "⭐⭐⭐⭐⭐", value: 5, count: 83 },
    { label: "⭐⭐⭐⭐", value: 4, count: 24 },
    { label: "⭐⭐⭐", value: 3, count: 10 },
    { label: "⭐⭐", value: 2, count: 26 },
    { label: "⭐", value: 1, count: 34 },
  ];

  const handleStarChange = (value) => {
    let updatedStars;
    if (selectedStars.includes(value)) {
      updatedStars = selectedStars.filter(star => star !== value);
    } else {
      updatedStars = [...selectedStars, value];
    }
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
              id={`star${index}`} 
              onChange={() => handleStarChange(starRating.value)} 
            />
            <label htmlFor={`star${index}`}>
              <div className="star-rating">
                <span>{starRating.label}</span>
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