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

function App() {

  return (
    <Router>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{duration:2000}} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={< Hotels/>} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/bookings' element={<Hotel />} />
        <Route path='/services' element={<Hotel />} />
      </Routes>
    </Router>
  );
}

export default App;
