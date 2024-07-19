import React from 'react';
import '../App.css';
import './HeroSection.css';
import { AiFillEnvironment} from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';

function HeroSection() {
    return (
        <div className="hero-container">
            <img src='/bg.png' alt="bg image" className="hero-image" />
            <div className="overlay"></div>
            <div className="text-content">
                <h1>Chase elegance. Reserve your<br/> dream stay now.</h1>
                <p>Discover the finest hotels from all over the world.</p>
            </div>
            <form className="search-form">
                <div className="input-container">
                <AiFillEnvironment className="input-icon" />
                <input type="text" placeholder="Destination" className="form-input" />
                </div>
                <input type="date" placeholder="Check-in" className="form-input" />
                <input type="date" placeholder="Check-out" className="form-input" />
                <div className="input-container">
                <FaUser className="input-icon" />
                <input type="number" placeholder="Guests" className="form-input" />
                </div>
                <button type="submit" className="form-submit">Search</button>
        </form>
        </div>
    );
}

export default HeroSection;
