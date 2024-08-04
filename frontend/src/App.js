import './App.css';
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';

import Hotel from "./pages/HotelInformation";
import SignIn from "./components/pages/SignIn"
import Home from "./components/pages/Home"
import React, { useState } from 'react';
import Hotels from "./components/pages/Hotels";
import BookingConfirmation from "./components/pages/BookingConfirmation";
import Footer from "./components/Footer/index.js"
import Success from "./components/StripePayment/success.js"; 
import Cancel from "./components/StripePayment/cancel.js"; 
import Services from './components/pages/Services.js';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogOut = () => {
    setIsLoggedIn(false);
    toast.success('You have logged out.');
    // Additional logout logic (e.g., clearing local storage)
    // Redirect to home page if needed
  }


  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/signin" />;
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogOut}/>
      <Toaster position='bottom-right' toastOptions={{duration:2000}} />
      <Routes>
        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/hotels' element={<PrivateRoute><Hotels /></PrivateRoute>} />
        <Route path='/signin' element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/bookings' element={<PrivateRoute><Hotel /></PrivateRoute>} />
        <Route path='/services' element={<PrivateRoute><Services /></PrivateRoute>} />
        <Route path='/checkout' element={<BookingConfirmation />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
