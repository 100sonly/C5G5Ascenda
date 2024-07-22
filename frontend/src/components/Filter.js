import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([]);
  const priceOptions = [
    { label: '$0 - $200', count: 200 },
    { label: '$200 - $500', count: 100 },
    { label: '$500 - $1,000', count: 15 },
    { label: '$1,000 - $2,000', count: 12 },
    { label: '$2,000 - $5,000', count: 230 },
  ];

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    setPriceRange((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
    onFilterChange({ priceRange });
  };

  return (
    <div className="filter-container">
      <div className="filter-section">
        <h4>Price Range</h4>
        <ul>
          {priceOptions.map((option, index) => (
            <li key={index}>
              <input type="checkbox" value={option.label} onChange={handlePriceRangeChange} />
              <label>{option.label}</label>
              <span className="count">{option.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;