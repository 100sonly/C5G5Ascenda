import React from "react";
import RoomCard from "../RoomCard/index.js";
import {Helmet} from "react-helmet";
import Hotel from "../../pages/HotelInformation";
function RoomList({ giveRoomName,givePrice,json }) {
    let keys = Object.keys(json);
    let items = Object.values(json);

    const getPrice = (price) => {

        givePrice(price);
    }
    const getRoomName = (roomName) => {

        giveRoomName(roomName);
    }
    return (

        items.map((item, i) => (
            <RoomCard givePrice={getPrice} giveRoomName={getRoomName} setRoomName={Hotel.setRoomName} key={keys[i]} room={item} />
        ))

    );
}

export default RoomList;
