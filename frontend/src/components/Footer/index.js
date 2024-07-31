import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
        <Link to='/' className='navbar-logo'>
          <img src='../ascenda.png' alt="Company Logo" />
          </Link>
        </div>
        <div className="footer-sections">
          <div className="footer-section">
            <h6>Company</h6>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="footer-section">
            <h6>Resources</h6>
            <a href="#">Blog</a>
            <a href="#">Help Center</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="footer-section">
            <h6>Follow Us</h6>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <Facebook />
              </a>
              <a href="#" className="social-icon">
                <Twitter />
              </a>
              <a href="#" className="social-icon">
                <Instagram />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};


export default Footer;
