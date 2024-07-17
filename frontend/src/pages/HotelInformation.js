import { useState, Component, useEffect } from "react";
import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import HotelImgSection from "../components/ImageGallery";



const Hotel = () => {
    const [desc, setDesc] = useState("");
    const [image_details, setImageDetails] = useState("");
    const [name, setName] = useState("");
    //const [hotelId, setHotelId] = useState("");
    const hotelId = 'diH7';


    async function InitHotel() {
        const req = await fetch(`http://localhost:3000/hotels/hotel/${hotelId}`);
        const txt = await req.text();
        const json = JSON.parse(txt);
        setDesc(json.description);
        setName(json.name);
        setImageDetails(json.image_details);
        
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


    </div>
  );
};

export default Hotel;
