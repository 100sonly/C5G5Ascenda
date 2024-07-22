import React from "react";
import RoomCard from "../RoomCard/index.js"; 

function RoomList({ json }) {
    let keys = Object.keys(json);
    let items = Object.values(json);

    return (
        items.map((item, i) => (
            <RoomCard key={keys[i]} room={item} />
        ))
    );
}

export default RoomList;
