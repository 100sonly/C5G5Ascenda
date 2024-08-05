import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookingDialog from './BookingDialog';
import { Button } from './Button';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <img className='logo' src='../ascenda.png' alt='Logo' />
            <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                HOME
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                SERVICES
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-links' onClick={handleDialogOpen}>
                BOOKINGS
              </Link>
            </li>
            <li>
              <Link to='/register' className='nav-links-mobile' onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button to='/register' buttonStyle='btn--outline'>Register</Button>}
          {button && <Button to='/signin' buttonStyle='btn--fill'>Login</Button>}
        </div>
      </nav>
      <BookingDialog open={dialogOpen} onClose={handleDialogClose} />
    </>
  );
}

export default Navbar;
