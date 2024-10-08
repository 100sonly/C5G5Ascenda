import './App.css';
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Hotel from "./pages/HotelInformation";
import SignIn from "./components/pages/SignIn"
import Home from "./components/pages/Home"
import React from 'react';
import Hotels from "./components/pages/Hotels";
import BookingConfirmation from "./components/pages/BookingConfirmation";
import Footer from "./components/Footer/index.js"
import Success from "./components/StripePayment/success.js"; 
import Cancel from "./components/StripePayment/cancel.js"; 
import Bookings from "./components/pages/Bookings.js"


function App() {

  return (
    <Router>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{duration:2000}} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={< Hotels/>} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/checkout' element={<BookingConfirmation />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
        <Route path='/hotelinformation' element={<Hotel />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
