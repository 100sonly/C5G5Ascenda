// src/tests/Hotel.test.js

import { render, screen } from '@testing-library/react';
import Hotel from '../pages/HotelInformation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
  })
}));

test('renders hotel page without crashing', async () => {
    render(
      <Router>
        <Hotel />
      </Router>
    );
    expect(await screen.findByText(/Overview/i)).toBeInTheDocument();
  });



  test('displays overview section', async () => {
    render(
      <Router>
        <Hotel />
      </Router>
    );
    expect(await screen.findByText(/Overview/i)).toBeInTheDocument();
  });

  test('displays amenities section', async () => {
    render(
      <Router>
        <Hotel />
      </Router>
    );
    expect(await screen.findByText(/Amenities/i)).toBeInTheDocument();
  });

  test('displays location section', async () => {
    render(
      <Router>
        <Hotel />
      </Router>
    );
    expect(await screen.findByText(/Location/i)).toBeInTheDocument();
  });

