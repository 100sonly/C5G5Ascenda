import React, { useState } from 'react';
import './Filters.css';

const PriceFilter = ({ onFilterChange }) => {
  const [selectedPrices, setSelectedPrices] = useState([]);

  const priceRanges = [
    { label: "$0 - $200", min: 0, max: 200, count: 200 },
    { label: "$200 - $500", min: 200, max: 500, count: 100 },
    { label: "$500 - $1,000", min: 500, max: 1000, count: 15 },
    { label: "$1,000 - $2,000", min: 1000, max: 2000, count: 12 },
    { label: "$2,000 - $5,000", min: 2000, max: 5000, count: 230 },
  ];

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const updatedPrices = selectedPrices.includes(value)
      ? selectedPrices.filter(price => price !== value)
      : [...selectedPrices, value];

    setSelectedPrices(updatedPrices);
    const selectedRanges = priceRanges.filter(option => updatedPrices.includes(option.label));
    onFilterChange({ priceRange: selectedRanges });
  };

  return (
    <div className="filter-section">
      <h3>Price Range</h3>
      <ul>
        {priceRanges.map((priceRange, index) => (
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