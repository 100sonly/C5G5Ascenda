import { render, fireEvent } from '@testing-library/react';
import RoomCard from '../components/RoomCard';
import { BrowserRouter as Router } from 'react-router-dom'; // Needed for Link components

// Mock the RoomDetailsDialog component as it is used in RoomCard
jest.mock('../components/RoomDetailsDialog/index.js', () => () => <div>RoomDetailsDialog</div>);

describe('RoomCard Component Tests', () => {
  const mockRoom = {
    images: [{ high_resolution_url: 'image_url' }],
    roomNormalizedDescription: 'Deluxe Room',
    price: 100,
    amenities: ['Air conditioning', 'Free Wi-Fi'],
    free_cancellation: true,
  };

  test('renders RoomCard with query params and props passed', () => {
    const { getByText } = render(
      <Router>
        <RoomCard giveRoomName={() => {}} givePrice={() => {}} room={mockRoom} params={{}} />
      </Router>
    );
    expect(getByText('Deluxe Room')).toBeInTheDocument();
    expect(getByText('$100.00')).toBeInTheDocument();
  });

  test('opens RoomDetailsDialog on room name click, with params passed', () => {
    const { getByText } = render(
      <Router>
        <RoomCard giveRoomName={() => {}} givePrice={() => {}} room={mockRoom} params={{}} />
      </Router>
    );
    fireEvent.click(getByText('Deluxe Room'));
    expect(getByText('RoomDetailsDialog')).toBeInTheDocument();
  });

  test('displays formatted price correctly', () => {
    const roomWithPrice = { ...mockRoom, price: 123.456 };
    const { getByText } = render(
      <Router>
        <RoomCard giveRoomName={() => {}} givePrice={() => {}} room={roomWithPrice} params={{}} />
      </Router>
    );
    expect(getByText('$123.46')).toBeInTheDocument(); // Check if price is formatted correctly
  });

  test('shows snackbar if no rooms selected and "Book" is clicked', () => {
    const { getByText, getByRole } = render(
      <Router>
        <RoomCard giveRoomName={() => {}} givePrice={() => {}} room={mockRoom} params={{}} />
      </Router>
    );
    
    fireEvent.click(getByText('Book')); // Clicking "Book" with no rooms selected
    
    expect(getByRole('alert')).toBeInTheDocument(); // Check if Snackbar appears
  });

  
});
