import React from "react";
import { Map, Marker } from "pigeon-maps"
import { osm } from 'pigeon-maps/providers'
import "./index.css";
import { useState, Component, useEffect } from "react";

function LocationMap({position}) {
    let zoomLevel = 15;
    const [hue, setHue] = useState(0)
    const color = `hsl(${hue % 360}deg 39% 70%)`
    console.log(position);
    //const position = [51.505, -0.09]
    return (
        <Map defaultZoom={zoomLevel} center={position} height={500} provider={osm}>
            <Marker 
                width={50}
                anchor={position} 
                color={color} 
                onClick={() => setHue(hue + 20)} 
            />
        </Map>
    );
}

export default LocationMap;