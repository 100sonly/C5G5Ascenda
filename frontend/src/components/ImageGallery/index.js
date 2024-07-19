import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.css";
import { useState, Component, useEffect } from "react";


function HotelImgSection({image_details}) {
    const carouselStyle = {
      minWidth: '20%',
      maxWidth: 500,
      minHeight: '10%',
      maxHeight: 150
    }

    let image_list = [];
    for (let i=0; i < image_details.count; i++) {
        let string_to_push = `${image_details.prefix}${i}${image_details.suffix}`;
        image_list.push(string_to_push);
    }
    return (
        <Carousel useKeyboardArrows={true}>
            {image_list.map((URL, index) => (
              <div className="slider-item-div">
                <img src={URL} key={index} />
              </div>
            ))}
        </Carousel>
    );
}

export default HotelImgSection;
