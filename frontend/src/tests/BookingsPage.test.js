import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Bookings from '../components/pages/Bookings';
import { useLocation } from 'react-router-dom';

jest.mock('../components/HalfRating', () => () => <div>HalfRating</div>);
jest.mock('../components/ConfirmationAmenities', () => () => <div>ConfirmationAmenities</div>);
jest.mock('../components/DeleteConfirmationModal', () => ({ open, onClose, onDelete }) => (
  open ? <div role="dialog">DeleteConfirmationModal</div> : null
));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('Bookings Component Tests', () => {
  const mockBookingDetails = {
    personalInfo: {
      salutation: 'mr',
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      specialRequests: 'Vegetarian meal',
    },
    bookingId: '123456',
    roomName: 'Deluxe Suite',
    checkIn: { date: '2024-08-01', time: '15:00' },
    checkOut: { date: '2024-08-07', time: '11:00' },
    nights: 6,
    price: 600,
    numberOfRooms: 1,
  };

  const mockHotelData = {
    heroImage: 'hotel_image_url',
    hotelName: 'Grand Hotel',
    hotelRating: 4.5,
    hotelAddress: '123 Hotel St, City, Country',
    hotelAmenities: ['Free Wi-Fi', 'Swimming Pool', 'Spa'],
  };

  beforeEach(() => {
    useLocation.mockReturnValue({
      state: { bookingDetails: mockBookingDetails, hotelData: mockHotelData },
    });
  });

  test('shows no booking details message when no data is provided', () => {
    useLocation.mockReturnValue({ state: {} });

    render(
      <Router>
        <Bookings />
      </Router>
    );

    expect(screen.getByText(/No booking details available./i)).toBeInTheDocument();
  });

  test('displays booking details when data is provided', () => {
    render(
      <Router>
        <Bookings />
      </Router>
    );

    
    const nameElements = screen.getAllByText(/John Doe/i);
    expect(nameElements).toHaveLength(2); 

    
    const roomNameElements = screen.getAllByText(/Deluxe Suite/i);
    expect(roomNameElements).toHaveLength(2); 

    
    const hotelNameElements = screen.getAllByText(/Grand Hotel/i);
    expect(hotelNameElements).toHaveLength(1); 

    
    const hotelAddressElements = screen.getAllByText(/123 Hotel St, City, Country/i);
    expect(hotelAddressElements).toHaveLength(1); 
  });
});
