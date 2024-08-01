import React, { useState } from 'react';
import './PriceFilter.css';

const PriceFilter = ({ onFilterChange }) => {
  const [selectedPrices, setSelectedPrices] = useState([]);

  const priceRanges = [
    { label: "$0 - $200", value: { min: 0, max: 200 }, count: 200 },
    { label: "$200 - $500", value: { min: 200, max: 500 }, count: 100 },
    { label: "$500 - $1,000", value: { min: 500, max: 1000 }, count: 15 },
    { label: "$1,000 - $2,000", value: { min: 1000, max: 2000 }, count: 12 },
    { label: "$2,000 - $5,000", value: { min: 2000, max: 5000 }, count: 230 },
  ];

  const handlePriceChange = (value) => {
    let updatedPrices;
    if (selectedPrices.includes(value)) {
      updatedPrices = selectedPrices.filter(price => price !== value);
    } else {
      updatedPrices = [...selectedPrices, value];
    }
    setSelectedPrices(updatedPrices);
    onFilterChange({ priceRange: updatedPrices });
  };

  return (
    <div className="filter-section">
      <h3>Price Range</h3>
      <ul>
        {priceRanges.map((priceRange, index) => (
          <li key={index}>
            <input 
              type="checkbox" 
              id={`price${index}`} 
              onChange={() => handlePriceChange(priceRange.value)} 
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