import React from "react";
import { useState, Component, useEffect } from "react";

function RoomDesc(obj) {
    console.log(Object.keys(obj));
    return (
        <div>
            <h3>{obj.roomNormalizedDescription}</h3>
            <div dangerouslySetInnerHTML={{__html: obj.long_description}} />
        </div>
    )
}

function RoomList({json}) {
    let keys = Object.keys(json);
    let items = Object.values(json)
    console.log(items);

    return (
        keys.map(function(key, i) {
            return <div>{RoomDesc(items[i])}</div>
        })
    )
}

export default RoomList;