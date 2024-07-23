import React from 'react';
import '../App.css';
import './HeroSection.css';
import SearchForm from '../components/SearchForm/index.js';

function HeroSection() {
    return (
        <div className="hero-container">
            <img src='/bg.png' alt="bg image" className="hero-image"/>
            <div className="overlay"></div>
            <div className="text-content">
                <h1>Chase elegance. Reserve your<br/> dream stay now.</h1>
                <p>Discover the finest hotels from all over the world.</p>
            </div>
            <SearchForm customClass={"search-form-hero"} />
        </div>
    );
}

export default HeroSection;
