import React from 'react';
import '../App.css';
import './HeroSection.css';
import {Form} from "react-bootstrap";
import {AiFillEnvironment} from "react-icons/ai";
import GuestDropdown from "./GuestDropdown";

function ListHotel() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    fetch("http://localhost:3000/prices/destination/".concat(urlParams.get('destination_id'),"/",urlParams.get('checkin'),'/',urlParams.get('checkout'),'/en_US/SGD/',urlParams.get('guests')))
        .then((response) => response.json())
        .then((json) => console.log(json));
    return (
<></>
    );
}

export default ListHotel;