import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Rating, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import './ListHotel.css';

function ListHotel({ filter = { priceRange: [], starRating: [] }, updateTotalHotels, updatePriceRangeCounts, updateStarRatingCounts}) {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(20);
  const navigate = useNavigate();
  const [expandedHotelId, setExpandedHotelId] = useState(null);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const destinationId = urlParams.get('destination_id');
  const checkin = urlParams.get('checkin');
  const checkout = urlParams.get('checkout');
  const guests = urlParams.get('guests');
  const adultchildren = urlParams.get('adultchildren'); // # of adults and children

  const priceRanges = [
    { label: "$0 - $200", min: 0, max: 200 },
    { label: "$200 - $500", min: 200, max: 500 },
    { label: "$500 - $1,000", min: 500, max: 1000 },
    { label: "$1,000 - $2,000", min: 1000, max: 2000 },
    { label: "$2,000 - $5,000", min: 2000, max: 5000 },
  ];

  const starRatings = [
    { label: "5 stars", value: 5, min: 4.5, max: 5.0 },
    { label: "4 stars", value: 4, min: 3.5, max: 4.49 },
    { label: "3 stars", value: 3, min: 2.5, max: 3.49 },
    { label: "2 stars", value: 2, min: 1.5, max: 2.49 },
    { label: "1 star", value: 1, min: 0.5, max: 1.49 },
  ];

  async function processHotels(hotels, all_hotels) {
    for (const item of hotels) {
      var result = all_hotels.find(hotel => hotel.id === item.hotel_id);
      item.details = result;
    }
  }

  // Navigate to URL when 'SELECT' is clicked
  const handleSelect = (hotel) => {
    navigate(`/hotelinformation`, { state: { hotel, destinationId, checkin, checkout, guests, adultchildren } });
  };

  // Function to fetch hotel data from the backend
  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/prices/destination/${destinationId}/${checkin}/${checkout}/en_US/SGD/${guests}`);
      const data = await response.json();

      const all_hotels = await fetch(`http://localhost:3000/hotels/destination/${destinationId}`);
      const hotel_info = await all_hotels.json();

      await processHotels(data, hotel_info);

      // Calculate price range counts
      const priceRangeCounts = priceRanges.map(range => {
        return {
          ...range,
          count: data.filter(hotel => hotel.price >= range.min && hotel.price <= range.max).length
        };
      });

      // Calculate star rating counts
      const starRatingCounts = starRatings.map(rating => {
        return {
          ...rating,
          count: data.filter(hotel => hotel.details && hotel.details.trustyou?.score?.kaligo_overall >= rating.min && hotel.details.trustyou?.score?.kaligo_overall <= rating.max).length
        };
      });

      // Update state and counts
      setHotels(data);
      setFilteredHotels(data);
      setLoading(false);
      updateTotalHotels(data.length); // Update total number of hotels
      updatePriceRangeCounts(priceRangeCounts); // Update price range counts
      updateStarRatingCounts(starRatingCounts); // Update star rating counts
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Fetch hotel data when component mounts
  useEffect(() => {
    fetchHotels();
  }, []);

  // Filter hotels based on price range and star rating
  useEffect(() => {
    if (!filter.priceRange.length && !filter.starRating.length) {
      setFilteredHotels(hotels);
    } else {
      const filtered = hotels.filter(hotel => {
        const matchesPrice = filter.priceRange.length
          ? filter.priceRange.some(range => hotel.price >= range.min && hotel.price <= range.max)
          : true;
          const starRating = hotel.details?.trustyou?.score?.kaligo_overall || 0;
          const matchesStar = filter.starRating.length
            ? filter.starRating.some(range => starRating >= range.min && starRating <= range.max)
            : true;
          return matchesPrice && matchesStar;
      });
      setFilteredHotels(filtered);
    }
  }, [filter, hotels]);

  // Function to parse and render the description
  const parseDescription = (description) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(description, 'text/html');
    return Array.from(doc.body.childNodes).map((node, index) => {
      if (node.nodeName === 'P') {
        return <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Inter' }} key={index}>{node.textContent}</Typography>;
      }
      if (node.nodeName === 'B') {
        return <b key={index}>{node.textContent}</b>;
      }
      // Handle other tags if needed
      return node.textContent;
    });
  };

  // Function to truncate the description
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length <= wordLimit) {
      return description;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  // Paginate filtered hotels
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="list-hotel-container">
      {currentHotels.map((hotel) => (
        <Card key={hotel.hotel_id} className="hotel-card">
          <Box className="hotel-card-box">
            <Box className="hotel-image-box">
            <CardMedia
              component="img"
              image={hotel.details ? (hotel.details.image_details.prefix.concat('0', hotel.details.image_details.suffix)) : '/placeholder.jpg'}
              alt={hotel.details ? hotel.details.name : 'Hotel Image'}
              className="hotel-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder.jpg'; 
              }}
            />
            </Box>
            <Box className="hotel-card-content">
              <Typography variant="h5" component="div" style={{ fontFamily: 'Inter', fontSize: '20px' }}>
                {hotel.details ? hotel.details.name : 'Hotel Name'}
              </Typography>
              <Box className="hotel-rating">
                <Rating value={hotel.details?.trustyou?.score?.kaligo_overall || 0} precision={0.1} readOnly />
                <Box className="hotel-score">
                  <Typography variant="body2" color="text.secondary" style={{ marginLeft: '8px', fontFamily: 'Inter' }}>
                    {hotel.details?.trustyou?.score?.kaligo_overall || '0'}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Inter' }}>
                {hotel.details ? hotel.details.location : 'Location'}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Inter' }}>
                {hotel.details && hotel.details.description
                  ? expandedHotelId === hotel.hotel_id
                    ? parseDescription(hotel.details.description)
                    : parseDescription(truncateDescription(hotel.details.description, 50))
                  : 'Description'}
                {hotel.details && hotel.details.description && (
                  <span
                    onClick={() => setExpandedHotelId(expandedHotelId === hotel.hotel_id ? null : hotel.hotel_id)}
                    style={{ color: 'blue', cursor: 'pointer' }}
                    >
                      {expandedHotelId === hotel.hotel_id ? ' Show less' : ' Show more'}
                    </span>
                  )}
                </Typography>
                <Box className="hotel-card-footer">
                  <Button
                    className="select-button"
                    size="small"
                    color="primary"
                    variant="contained"
                    style={{ fontWeight: 'bold', fontFamily: 'Inter', backgroundColor: '#1A1A48' }}
                    onClick={() => handleSelect(hotel)}
                  >
                    Select
                  </Button>
                  <Box className="hotel-price">
                    <Typography variant="body2" style={{ fontWeight: 'bold', fontFamily: 'Inter', color: '#FEBB02' }}>
                      {hotel.price} SGD
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Inter' }}>
                      Taxes incl.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        ))}
        <Box className="pagination-container" style={{ marginTop: '20px', textAlign: 'center', marginLeft:'200px' }}>
          <Pagination
            count={Math.ceil(filteredHotels.length / hotelsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </div>
        );
      }
      
      export default ListHotel;