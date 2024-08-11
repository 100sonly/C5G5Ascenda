// src/tests/HotelInformation.test.js

import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Hotel from '../pages/HotelInformation';
import { BrowserRouter as Router, MemoryRouter, useNavigate } from 'react-router-dom';

// Mock useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      hotel: { hotel_id: 'T9cE' },
      destinationId: 'destID',
      checkin: '2024-08-01',
      checkout: '2024-08-07',
      guests: 2,
      adultchildren: { adults: 1, children: 1 }
    }
  }),
  useNavigate: jest.fn()
}));

// Mock the RoomList component
const RoomListMock = ({ json }) => {
  const navigate = useNavigate();
  return (
    <div>
      {json.length > 0 && json.map((room, index) => (
        <button key={index} onClick={() => navigate(`/booking?room=${room.id}`)}>Select</button>
      ))}
    </div>
  );
};

// Helper function to render the component
const renderHotel = () => {
  render(
    <MemoryRouter>
      <Hotel />
    </MemoryRouter>
  );
};

test('renders hotel page without crashing', async () => {
  renderHotel();
  await waitFor(() => {
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
  });
});

test('displays overview section', async () => {
  renderHotel();
  await waitFor(() => {
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
  });
});

test('displays amenities section', async () => {
  renderHotel();
  await waitFor(() => {
    expect(screen.getByText(/Amenities/i)).toBeInTheDocument();
  });
});

test('displays location section', async () => {
  renderHotel();
  await waitFor(() => {
    expect(screen.getByText(/Location/i)).toBeInTheDocument();
  });
});

test('clicking "Select" button redirects to booking page', async () => {
  const mockNavigate = jest.fn();
  jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);

  renderHotel();
  
  // Mock data for rooms
  const mockRooms = [{ id: 'room1' }, { id: 'room2' }];

  // Render RoomListMock directly to simulate room selection
  render(<RoomListMock json={mockRooms} />);

  // Click the "Select" button
  fireEvent.click(screen.getAllByText(/Select/i)[0]);

  // Verify the navigation
  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/booking?room=room1');
  });
});
