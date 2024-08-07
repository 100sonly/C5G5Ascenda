import React, {useEffect, useState} from 'react';
import '../../App.css';
import ListHotel from "../ListHotel";
import PriceFilter from '../Filters/PriceFilter';
import StarFilter from '../Filters/StarFilter';
import './Hotel.css';
import SearchForm from '../SearchForm/index.js';
import {useLocation} from "react-router-dom";

function Hotels() {
  const [filter, setFilter] = useState({ priceRange: [], starRating: [] });
  const [totalHotels, setTotalHotels] = useState(0);
  const [priceRangeCounts, setPriceRangeCounts] = useState([]);
  const [starRatingCounts, setStarRatingCounts] = useState([]);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const destinationId = urlParams.get('destination_id');
  const destinationName = urlParams.get('destination_name');
  const checkin = urlParams.get('checkin');
  const checkout = urlParams.get('checkout');
  const guests = urlParams.get('guests');
  const adultchildren = urlParams.get('adultchildren'); // # of adults and children
  var regex = /[|]/g;
  const rooms=guests.match(regex);
  const countrooms=rooms ? rooms.length+1 : 1;
  const params=[countrooms,adultchildren];




  useEffect(() => {
    const destination=document.getElementById("destination_id");
    destination.setAttribute("desid",destinationId);
    destination.value=destinationName;
    const startdate=document.getElementById("checkin");
    const enddate=document.getElementById("checkout");
    startdate.value=checkin;
    enddate.value=checkout;


  }, [])
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

  const updateStarRatingCounts = (counts) => {
    setStarRatingCounts(counts);
  };

  return (
    <div style={{paddingTop: '2%'}}className='hotel-page'>
      <SearchForm customClass={"search-form-hotel"} params={params} />
      <div style={{paddingTop: '1%'}} className="content-container">
        <div className="filter-section">
          <PriceFilter onFilterChange={handleFilterChange} priceRangeCounts={priceRangeCounts} />
          <StarFilter onFilterChange={handleFilterChange} starRatingCounts={starRatingCounts} />
        </div>
        <div className="list-hotel-section">
          <div className="results-header">
            <h2>{destinationName}: {totalHotels} results found </h2>
          </div>
          <ListHotel filter={filter} updateTotalHotels={updateTotalHotels} 
          updatePriceRangeCounts={updatePriceRangeCounts}
          updateStarRatingCounts={updateStarRatingCounts} />
        </div>
      </div>
    </div>
  );
}


export default Hotels;