import React, { useState } from 'react';
import '../../App.css';
import ListHotel from "../ListHotel";
import HeroSection from '../HeroSection';
import PriceFilter from '../Filters/PriceFilter';
import StarFilter from '../Filters/StarFilter';
import './Hotel.css';
import SearchForm from '../SearchForm/index.js';

function Hotels() {
  const [filter, setFilter] = useState({ priceRange: [], starRating: [] });

  const handleFilterChange = (selectedFilters) => {
    setFilter(selectedFilters);
  };

  return (
    <div className='hotel-page'>
      <SearchForm customClass={"search-form-hotel"} />
      <div className="content-container">
        <div className="filter-section">
          <PriceFilter onFilterChange={handleFilterChange} />
          <StarFilter onFilterChange={handleFilterChange} />
        </div>
        <div className="list-hotel-section">
          <ListHotel filter={filter} />
        </div>
      </div>
    </div>
  );
}

export default Hotels;