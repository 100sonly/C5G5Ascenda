import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Test from "./pages/test";
import Hotel from "./pages/HotelInformation";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"; 
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import SignIn from './components/pages/SignIn';
import Bookings from './components/pages/Bookings';
import Services from './components/pages/Services';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/services' element={<Services />} />
      </Routes>
    </Router>
  );
}

export default App;
