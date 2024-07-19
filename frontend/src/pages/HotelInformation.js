import { useState, Component, useEffect } from "react";
import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import HotelImgSection from "../components/ImageGallery";
import LocationMap from "../components/LocationMap";
import AmenitiesList from "../components/AmenitiesList";
import RoomList from "../components/RoomList";

const Hotel = () => {
    const [desc, setDesc] = useState("");
    const [image_details, setImageDetails] = useState("");
    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [amenities, setAmenities] = useState(0);
    const [rooms, setRooms] = useState([]);
    //const [hotelId, setHotelId] = useState("");
    // HARDCODED VALUES FOR DEV PURPOSES
    const hotelId = 'diH7';
    const destID = 'A0HL';
    const startDate = '2024-12-25';
    const endDate = '2025-01-07';
    const language = 'en_US';
    const currency = 'SGD';
    const guest_num = '2';


    async function InitHotel() {
        const req_hotel = await fetch(`http://localhost:3000/hotels/hotel/${hotelId}`);
        const txt_hotel = await req_hotel.text();
        const json_hotel = JSON.parse(txt_hotel);
        const req_rooms = await fetch(`http://localhost:3000/prices/hotel/${hotelId}/${destID}/${startDate}/${endDate}/${language}/${currency}/${guest_num}`);
        const txt_rooms = await req_rooms.text();
        const json_rooms = JSON.parse(txt_rooms);
        
        setDesc(json_hotel.description);
        setName(json_hotel.name);
        setImageDetails(json_hotel.image_details);
        setLatitude(json_hotel.latitude);
        setLongitude(json_hotel.longitude);
        setAmenities(json_hotel.amenities);

        setRooms(json_rooms);
    }

    

    useEffect( () => {
        // TODO: fixme:
        InitHotel()
    }, []);

  return (
    <div>
      <HotelImgSection image_details={image_details} />
      <h1>{name}</h1>
      <h2>Overview</h2>
      <div dangerouslySetInnerHTML={{__html: desc}} />
      <h2>Amenities</h2>
      <AmenitiesList amenities={amenities} />
      <h2>Rooms</h2>
      <RoomList json={rooms} />
      <h2>Location</h2>
      <LocationMap position={[latitude, longitude]} />
    </div>
  );
};

export default Hotel;
