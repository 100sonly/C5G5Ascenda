import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Hotel from "./pages/HotelInformation";
import React from 'react'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Hotel />} />
        <Route path='/register' element={<Hotel />} />
        <Route path='/signin' element={<Hotel />} />
        <Route path='/bookings' element={<Hotel />} />
        <Route path='/services' element={<Hotel />} />
      </Routes>
    </Router>
  );
}

export default App;
