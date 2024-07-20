import React from 'react';
import '../App.css';
import './HeroSection.css';
import { AiFillEnvironment} from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import  {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";

function HeroSection() {


    return (

        <div className="hero-container">

            <img src='/bg.png' alt="bg image" className="hero-image"/>
            <div className="overlay"></div>
            <div className="text-content">
                <h1>Chase elegance. Reserve your<br/> dream stay now.</h1>
                <p>Discover the finest hotels from all over the world.</p>
            </div>
            <form className="search-form">
                <div className="input-container">
                    <AiFillEnvironment className="input-icon"/>
                    <input type="text" placeholder="Destination" className="form-input"
                           id="destination"/>

                </div>
                <input type="date" placeholder="Check-in" className="form-input" id="bookingstart"/>
                <input type="date" placeholder="Check-out" className="form-input" id="bookingend"/>
                <div className="input-container">
                    <FaUser className="input-icon"/>
                    <input type="number" placeholder="Guests" className="form-input" id="guests"/>
                </div>
                <div id="result"></div>
                <button type="submit" className="form-submit">Search</button>
            </form>

            <Helmet>
                <script src="autocomplete.js" type="text/javascript"></script>
            </Helmet>
        </div>

    );
}

export default HeroSection;