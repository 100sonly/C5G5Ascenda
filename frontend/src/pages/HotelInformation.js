import { useState, Component, useEffect } from "react";
import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import HotelImgSection from "../components/ImageGallery";
import LocationMap from "../components/LocationMap";
import AmenitiesList from "../components/AmenitiesList";

const Hotel = () => {
    const [desc, setDesc] = useState("");
    const [image_details, setImageDetails] = useState("");
    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [amenities, setAmenities] = useState(0);
    //const [hotelId, setHotelId] = useState("");
    const hotelId = 'diH7';


    async function InitHotel() {
        const req = await fetch(`http://localhost:3000/hotels/hotel/${hotelId}`);
        const txt = await req.text();
        const json = JSON.parse(txt);
        setDesc(json.description);
        setName(json.name);
        setImageDetails(json.image_details);
        setLatitude(json.latitude);
        setLongitude(json.longitude);
        setAmenities(json.amenities);
    }


    console.log(Object.keys(amenities));

    

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
      <h2>Location</h2>
      <LocationMap position={[latitude, longitude]} />
    </div>
  );
};

export default Hotel;
