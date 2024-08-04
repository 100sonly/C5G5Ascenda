import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './Navbar.css';

function Navbar({ isLoggedIn, onLogout }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const navigate = useNavigate();

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


  const handleNavClick = (e, path) => {
    if (!isLoggedIn && (path === '/services' || path === '/bookings' || path === '/')) {
      e.preventDefault();
      toast.error('Please log in to access this page');
    } else {
      navigate(path);
    }
    closeMobileMenu();
  };
  


  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={(e) => handleNavClick(e, '/')}>
            <img className='logo' src='../ascenda.png' />
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={(e) => handleNavClick(e, '/')}>
                HOME
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/services'
                className='nav-links'
                onClick={(e) => handleNavClick(e, '/services')}
                //onClick={closeMobileMenu}
              >
                SERVICES
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/bookings'
                className='nav-links'
                onClick={(e) => handleNavClick(e, '/bookings')}
                //onClick={closeMobileMenu}
              >
                BOOKINGS
              </Link>
            </li>
            {!isLoggedIn && (
              <li>
                <Link
                  to='/signin'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
          {isLoggedIn ? (
            button && <Button onClick={onLogout} buttonStyle='btn--outline'>Logout</Button>
          ) : (
            button && <Button to='/signin' buttonStyle='btn--fill'>Login</Button>
          )}
        </div>
      </nav>
    </>
  );
}
 
  



            {/* <li>
              <Link
                to='/register'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button to='/register' buttonStyle='btn--outline'>Register</Button>}
          {button && <Button to='/signin' buttonStyle='btn--fill'>Login</Button>}
        </div>
      </nav>
    </>
  );
} */}

export default Navbar;