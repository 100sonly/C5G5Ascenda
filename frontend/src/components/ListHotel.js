import React, {useEffect} from 'react';
import '../App.css';
import './HeroSection.css';
import {Form} from "react-bootstrap";
import {AiFillEnvironment} from "react-icons/ai";
import GuestDropdown from "./GuestDropdown";



 function ListHotel() {
    var hotel_results;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);




     useEffect(() => {
         async function fetchData() {
             await fetch("http://localhost:3000/prices/destination/".concat(urlParams.get('destination_id'), "/", urlParams.get('checkin'), '/', urlParams.get('checkout'), '/en_US/SGD/', urlParams.get('guests')))
                 .then((response) => response.json())
                 .then((json) => hotel_results = json);
                return hotel_results;
             // ...
         }

         var hotels=document.getElementById("hotels");
         var hotel_results=fetchData().then((hotel_results) => hotels.value=hotel_results)


     }, [queryString,urlParams]);

     return (
         <>
             <div id="hotels" placeholder="hotels">

             </div>
         </>
     );


}

export default ListHotel;