import React, { useState } from 'react';
import '../../App.css';
import ListHotel from "../ListHotel";
import PriceFilter from '../Filters/PriceFilter';
import StarFilter from '../Filters/StarFilter';
import './Hotel.css';
import SearchForm from '../SearchForm/index.js';

function Hotels() {
  const [filter, setFilter] = useState({ priceRange: [], starRating: [] });
  const [totalHotels, setTotalHotels] = useState(0);
  const [priceRangeCounts, setPriceRangeCounts] = useState([]);

  const handleFilterChange = (selectedFilters) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      ...selectedFilters,
    }));
  };

  const updateTotalHotels = (total) => {
    setTotalHotels(total);
  };

  const updatePriceRangeCounts = (counts) => {
    setPriceRangeCounts(counts);
  };

  return (
    <div className='hotel-page'>
      <SearchForm customClass={"search-form-hotel"} />
      <div className="content-container">
        <div className="filter-section">
          <PriceFilter onFilterChange={handleFilterChange} priceRangeCounts={priceRangeCounts} />
          <StarFilter onFilterChange={handleFilterChange} />
        </div>
        <div className="list-hotel-section">
          <div className="results-header">
            <h2>{totalHotels} results found</h2>
          </div>
          <ListHotel filter={filter} updateTotalHotels={updateTotalHotels} updatePriceRangeCounts={updatePriceRangeCounts} />
        </div>
      </div>
    </div>
  );
}

export default Hotels;