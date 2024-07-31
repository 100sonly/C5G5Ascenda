import React, { useEffect } from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import TopRatedHotels from '../TopRatedHotels';


function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);


  return (
    <>

        <HeroSection />
        <TopRatedHotels />
        </>
  );

}

export default Home;