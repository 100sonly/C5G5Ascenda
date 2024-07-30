import { useState, useEffect } from "react";
import React from "react";
import HotelImgSection from "../components/ImageGallery";
import LocationMap from "../components/LocationMap";
import RoomList from "../components/RoomList";
import NavTabs from "../components/NavTabs";
import HalfRating from "../components/HalfRating";
import AutoGrid from "../components/AutoLayout";
import Highlights from "../components/HighlightsBox"; 
import SearchForm from "../components/SearchForm"
import { Button, Skeleton } from '@mui/material';
import { PlaceRounded } from '@mui/icons-material';
import './HotelInformation.css';
import { Helmet } from "react-helmet"
import {Link} from "react-router-dom";

const Hotel = () => {

  useEffect(() => {
    window.scrollTo({
        top: 0,
        behavior: 'auto'
    });
}, []);

  const [desc, setDesc] = useState("");
  const [image_details, setImageDetails] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [amenities, setAmenities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [marketRates, setMarketRates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState(0);
    const [roomName, setRoomName] = useState("");

  // HARDCODED VALUES FOR DEV PURPOSES
  //diH7-fullerton, QDaO-panpacific
  const hotelId = 'diH7';
  const destID = 'A0HL';
  const startDate = new Date('2024-12-25');
  const endDate = new Date('2025-01-07');
  const language = 'en_US';
  const currency = 'SGD';
  const guest_num = '2';

  const booking_id=hotelId+destID+Math.floor(Math.random() * 10000).toString();

  var nights=Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

  const getPrice = (price) => {
        setPrice(price);

    }
    const getRoomName = (roomName) => {
      setRoomName(roomName);
    }
    //for formatting date
    function formatDate(date) {
        // Array to convert day index to day name
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Get components of the date
        const dayName = days[date.getDay()];
        const day = date.getDate();
        const monthName = months[date.getMonth()];
        const year = date.getFullYear();

        // Format hours and minutes
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;

        // Assemble the formatted string
        const formattedTime = `${hours}:${strMinutes} ${ampm}`;
        return `${dayName}, ${day} ${monthName}, ${year}#${formattedTime}`;
    }

  async function InitHotel() {
    try {
      const req_hotel = await fetch(`http://localhost:3000/hotels/hotel/${hotelId}`);
      const json_hotel = await req_hotel.json();
      console.log(json_hotel)
      console.log("Categories:", json_hotel.categories);

      const req_rooms = await fetch(`http://localhost:3000/prices/hotel/${hotelId}/${destID}/${startDate}/${endDate}/${language}/${currency}/${guest_num}`);
      const json_rooms = await req_rooms.json();
      console.log("Rooms JSON:", json_rooms);

      setDesc(json_hotel.description);
      setName(json_hotel.name);
      setRating(json_hotel.rating);
      setAddress(json_hotel.address)
      setImageDetails(json_hotel.image_details);
      setLatitude(json_hotel.latitude);
      setLongitude(json_hotel.longitude);

      const amenitiesArray = Object.keys(json_hotel.amenities).filter(amenity => json_hotel.amenities[amenity]);
      setAmenities(amenitiesArray);
      setRooms(json_rooms);
      setMarketRates(json_rooms.marketRates)

      const categoriesArray = Object.values(json_hotel.categories);
      const sortedCategories = categoriesArray.sort((a, b) => b.score - a.score);

      const overallCategory = sortedCategories.find(cat => cat.name === 'Overall');
      if (overallCategory) {
        sortedCategories.splice(sortedCategories.indexOf(overallCategory), 1);
        sortedCategories.unshift(overallCategory);
      }

      setCategories(sortedCategories);  

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch hotel data:", error);
    }
  }

  useEffect(() => {
    InitHotel();
  }, []);

  return (

    <div style={{ paddingTop: '2%', paddingLeft: '10%', paddingRight: '10%' }}>

      <div id="searchform">
          {loading ? (
            <Skeleton variant="rounded" sx={{ bgcolor: 'grey.500' }}  width="100%" height={40} />
          ) : (
            <SearchForm customClass="search-form-hotel" />
          )}
        </div>
      <div id="hotel-images" style={{ paddingTop: '8%' }}>
        {loading ? (
          <Skeleton variant="rounded" sx={{ bgcolor: 'grey.500' }} width="100%" height={400} />
        ) : (
          <HotelImgSection image_details={image_details} />
        )}
      </div>

      <div id="nav-tabs" className="sticky-nav-tabs" style={{ paddingTop: '2%' }}>
        {loading ? (
          <Skeleton variant="text" sx={{ bgcolor: 'grey.500' }}  width="100%" height={40} />
        ) : (
          <NavTabs />
        )}
      </div>


      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '2%' }}>
        <h1 id="hotel-name">
          {loading ? <Skeleton variant="text" sx={{ bgcolor: 'grey.500' }}  width="60%" /> : name}
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
          <Skeleton variant="text" sx={{ bgcolor: 'grey.500' }}  width="20%" height={40} />
        ) : (
          <HalfRating rating={rating} />
        )}
      </div>

      <div id="address" style={{ paddingTop: '1%', display: 'flex', alignItems: 'center' }}>
        {loading ? (
          <Skeleton variant="text" sx={{ bgcolor: 'grey.500' }}  width="20%" height={40} />
        ) : (
          <>
            <PlaceRounded style={{ color: '#1A1E43', marginRight: '8px' }} />
            <span>{address}</span>
            <div
              onClick={() => window.location.href = '#location'} 
              style={{ 
                textTransform: 'none',
                marginLeft: '10px',
                color: '#2F80ED',
                padding: '0',
                cursor: 'pointer'
              }}
            >
              show map
            </div>
          </>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2%' }}>
        <div style={{ flex: 1 }}>
          <h2 id="overview">Overview</h2>
          <div>
            {loading ? (
              <Skeleton variant="text" sx={{ bgcolor: 'grey.500' }} width="80%" height={60} />
            ) : (
              <div className='description' dangerouslySetInnerHTML={{ __html: desc }} />
            )}
          </div>
        </div>
        <div style={{ width: '30%' }}>
          {loading ? (
            <Skeleton variant="rounded" sx={{ bgcolor: 'grey.500' }}  width="100%" height={200} />
          ) : (
            <Highlights ratings={categories} />
          )}
        </div>
      </div>

      <h2 id="amenities" style={{ paddingTop: '2%' }}>Amenities</h2>
      <div style={{ paddingTop: '2%' }}>
        {loading ? (
          <Skeleton variant="rounded" sx={{ bgcolor: 'grey.500' }} width="100%" height={200} />
        ) : (
          <AutoGrid amenities={amenities} />
        )}
      </div>

      <h2 id="rooms" style={{ paddingTop: '2%' }}>Rooms</h2>
      <div style={{ paddingTop: '2%' }}>
        {loading ? (
          <Skeleton variant="rounded" sx={{ bgcolor: 'grey.500' }}  width="100%" height={200} />
        ) : (
          <RoomList className='roomlist' json={rooms} givePrice={getPrice} giveRoomName={getRoomName} />
        )}
      </div>

      <h2 id="location" style={{ paddingTop: '2%' }}>Location</h2>
      <div style={{ paddingTop: '2%' }}>
        {loading ? (
          <Skeleton variant="rounded" sx={{ bgcolor: 'grey.500' }}  width="100%" height={300} />
        ) : (
          <LocationMap className='map' position={[latitude, longitude]} />
        )}
      </div>
        <Link to={`../checkout?price=${price}&roomName=${roomName}&nights=${nights}&hotelId=${hotelId}&destID=${destID}&rating=${rating}&address=${address}&booking_id=${booking_id}&name=${name}&startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}&image_details=${image_details}&amenities=${amenities}`}>
        <Button
            variant="contained"
            color="primary"
            onClick={() => console.log(price,roomName,nights,hotelId,destID,formatDate(startDate),formatDate(endDate),image_details,amenities)}
            style={{
                backgroundColor: '#2F80ED',
                color: '#fff',
                borderRadius: '5px',
                padding: '10px 20px',
                textTransform: 'none',
            }}
        >
            Make Booking
        </Button>
        </Link>
    </div>
  );
}

export default Hotel;
