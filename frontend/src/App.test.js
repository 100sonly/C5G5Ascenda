import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

test('renders Navbar with logo and HOME link', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  // Check for the logo 
  const logo = screen.getByAltText('Logo');
  expect(logo).toBeInTheDocument();
  // Check for the HOME link
  const homeLink = screen.getByText(/HOME/i);
  expect(homeLink).toBeInTheDocument();
  // Check for the Booking link
  const bookingLink = screen.getByText(/BOOKINGS/i);
  expect(bookingLink).toBeInTheDocument();
});


