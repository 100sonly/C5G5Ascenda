import { useState, Component, useEffect } from "react";
import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import HotelImgSection from "../components/ImageGallery";



const Hotel = () => {
    const [desc, setDesc] = useState("");
    const [image_details, setImageDetails] = useState("");
    //const [hotelId, setHotelId] = useState("");
    const hotelId = 'diH7';


    async function InitHotel() {
        const req = await fetch(`http://localhost:3000/hotels/hotel/${hotelId}`);
        const txt = await req.text();
        const json = JSON.parse(txt);
        setDesc(json.description);
        setImageDetails(json.image_details);
        
    }

    

    useEffect( () => {
        // TODO: fixme:
        InitHotel()
    }, []);

  return (
    <div>
      <h1>This is a test page</h1>
      <div dangerouslySetInnerHTML={{__html: desc}} />

      <HotelImgSection image_details={image_details} />

    </div>
  );
};

export default Hotel;
