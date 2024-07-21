import { useState, useEffect } from "react";
import React from "react";
import HotelImgSection from "../components/ImageGallery";
import LocationMap from "../components/LocationMap";
import RoomList from "../components/RoomList";
import NavTabs from "../components/NavTabs";
import HalfRating from "../components/HalfRating";
import AutoGrid from "../components/AutoLayout";
import Highlights from "../components/HighlightsBox"; 
import { Button, Skeleton } from '@mui/material';
import './HotelInformation.css';

const Hotel = () => {
  const [desc, setDesc] = useState("");
  const [image_details, setImageDetails] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [amenities, setAmenities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // HARDCODED VALUES FOR DEV PURPOSES
  const hotelId = 'diH7';
  const destID = 'A0HL';
  const startDate = '2024-12-25';
  const endDate = '2025-01-07';
  const language = 'en_US';
  const currency = 'SGD';
  const guest_num = '2';

  async function InitHotel() {
    try {
      const req_hotel = await fetch(`http://localhost:3000/hotels/hotel/${hotelId}`);
      const json_hotel = await req_hotel.json();
      console.log("Categories:", json_hotel.categories);

      const req_rooms = await fetch(`http://localhost:3000/prices/hotel/${hotelId}/${destID}/${startDate}/${endDate}/${language}/${currency}/${guest_num}`);
      const json_rooms = await req_rooms.json();
      console.log("Rooms JSON:", json_rooms);

      setDesc(json_hotel.description);
      setName(json_hotel.name);
      setRating(json_hotel.rating);
      setImageDetails(json_hotel.image_details);
      setLatitude(json_hotel.latitude);
      setLongitude(json_hotel.longitude);

      const amenitiesArray = Object.keys(json_hotel.amenities).filter(amenity => json_hotel.amenities[amenity]);
      setAmenities(amenitiesArray);

      setRooms(json_rooms);

      // Extract categories and sort them
      const categoriesArray = Object.values(json_hotel.categories);
      const sortedCategories = categoriesArray.sort((a, b) => b.score - a.score);

      // Ensure 'overall' is first
      const overallCategory = sortedCategories.find(cat => cat.name === 'Overall');
      if (overallCategory) {
        sortedCategories.splice(sortedCategories.indexOf(overallCategory), 1);
        sortedCategories.unshift(overallCategory);
      }

      setCategories(sortedCategories);  // Set all categories

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch hotel data:", error);
    }
  }

  useEffect(() => {
    InitHotel();
  }, []);

  return (
    <div style={{ paddingLeft: '10%', paddingRight: '10%' }}> 
      <div id="hotel-images" style={{ paddingTop: '5%' }}>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={400} />
        ) : (
          <HotelImgSection image_details={image_details} />
        )}
      </div>

      <div id="nav-tabs" style={{ paddingTop: '2%' }}>
        {loading ? (
          <Skeleton variant="text" width="100%" height={40} />
        ) : (
          <NavTabs />
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '2%' }}>
        <h1 id="hotel-name">
          {loading ? <Skeleton variant="text" width="60%" /> : name}
        </h1>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => window.location.href = '#rooms'} 
          style={{ 
            backgroundColor: '#2F80ED', 
            color: '#fff',
            borderRadius: '5px',
            padding: '10px 20px',
            textTransform: 'none',
          }}
        >
          See Room Availability
        </Button>
      </div>

      <div id="rating" style={{ paddingTop: '1%' }}>
        {loading ? (
          <Skeleton variant="text" width="20%" height={40} />
        ) : (
          <HalfRating rating={rating} />
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2%' }}>
        <div style={{ flex: 1 }}>
          <h2 id="overview">Overview</h2>
          <div>
            {loading ? (
              <Skeleton variant="text" width="80%" height={60} />
            ) : (
              <div className='description' dangerouslySetInnerHTML={{ __html: desc }} />
            )}
          </div>
        </div>
        <div style={{ width: '30%' }}>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={200} />
          ) : (
            <Highlights ratings={categories} />
          )}
        </div>
      </div>

      <h2 id="amenities" style={{ paddingTop: '2%' }}>Amenities</h2>
      <div style={{ paddingTop: '2%' }}>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={200} />
        ) : (
          <AutoGrid amenities={amenities} />
        )}
      </div>

      <h2 id="rooms" style={{ paddingTop: '2%' }}>Rooms</h2>
      <div style={{ paddingTop: '2%' }}>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={200} />
        ) : (
          <RoomList className='roomlist' json={rooms} />
        )}
      </div>

      <h2 id="location" style={{ paddingTop: '2%' }}>Location</h2>
      <div style={{ paddingTop: '2%' }}>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={300} />
        ) : (
          <LocationMap className='map' position={[latitude, longitude]} />
        )}
      </div>
    </div>
  );
}

export default Hotel;
