import React, { useState } from 'react';
import './Filters.css';

const PriceFilter = ({ onFilterChange, priceRangeCounts }) => {
  const [selectedPrices, setSelectedPrices] = useState([]);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const updatedPrices = selectedPrices.includes(value)
      ? selectedPrices.filter(price => price !== value)
      : [...selectedPrices, value];

    setSelectedPrices(updatedPrices);
    const selectedRanges = priceRangeCounts.filter(option => updatedPrices.includes(option.label));
    onFilterChange({ priceRange: selectedRanges });
  };

  return (
    <div className="filter-section">
      <h3>Price Range</h3>
      <ul>
        {priceRangeCounts.map((priceRange, index) => (
          <li key={index}>
            <input 
              type="checkbox" 
              value={priceRange.label} 
              onChange={handlePriceChange} 
              checked={selectedPrices.includes(priceRange.label)}
            />
            <label htmlFor={`price${index}`}>{priceRange.label}</label>
            <span>{priceRange.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceFilter;