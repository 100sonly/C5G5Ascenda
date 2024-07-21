import React from 'react';
import '../App.css';
import './HeroSection.css';
import { AiFillEnvironment } from 'react-icons/ai';
import { Helmet } from "react-helmet";
import GuestDropdown from './GuestDropdown';


function HeroSection() {
    return (
        <div className="hero-container">
            <img src='/bg.png' alt="bg image" className="hero-image"/>
            <div className="overlay"></div>
            <div className="text-content">
                <h1>Chase elegance. Reserve your<br/> dream stay now.</h1>
                <p>Discover the finest hotels from all over the world.</p>
            </div>
            <form className="search-form" action="/Hotels">
                <div className="input-container">
                    <input type="text" placeholder="Destination" className="form-input" id="destination_id" name="destination_id"/>
                    <AiFillEnvironment className="input-icon"/>
                </div>
                <input type="date" placeholder="Check-in" className="form-input" id="checkin" name="checkin"/>
                <input type="date" placeholder="Check-out" className="form-input" id="checkout" name="checkout"/>
                <GuestDropdown />
                <div id="result"></div>
                <button type="submit"  className="form-submit">Search</button>
            </form>
            <Helmet>
                <script src="autocomplete.js" type="text/javascript"></script>
            </Helmet>
        </div>
    );
}

export default HeroSection;