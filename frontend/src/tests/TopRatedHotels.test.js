// TopRatedHotels.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import TopRatedHotels from '../components/TopRatedHotels';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers

test('renders TopRatedHotels component with correct number of hotel cards', () => {
  render(<TopRatedHotels />);

  // Check for the section heading
  const heading = screen.getByText(/Top Rated Hotels/i);
  expect(heading).toBeInTheDocument();

  // Check for the correct number of hotel cards
  const hotelCards = screen.getAllByRole('img');
  expect(hotelCards).toHaveLength(3);
});

test('renders hotel details correctly', () => {
  render(<TopRatedHotels />);

  // Check for hotel names
  expect(screen.getByText(/Four Seasons Villa/i)).toBeInTheDocument();
  expect(screen.getByText(/The Fullerton Hotel Singapore/i)).toBeInTheDocument();
  expect(screen.getByText(/Park Hyatt New York/i)).toBeInTheDocument();

  // Check for ratings
  expect(screen.getAllByText(/Rating: 5/i)).toHaveLength(3);

  // Check for addresses
  expect(screen.getByText(/Jimbaran Bay Jimbaran Denpasar 80361/i)).toBeInTheDocument();
  expect(screen.getByText(/1 Fullerton Square/i)).toBeInTheDocument();
  expect(screen.getByText(/153 West 57Th Street/i)).toBeInTheDocument();

  // Check for prices
  expect(screen.getByText(/\$2643\.32\/night/i)).toBeInTheDocument();
  expect(screen.getByText(/\$1187\.42\/night/i)).toBeInTheDocument();
  expect(screen.getByText(/\$3145\.83\/night/i)).toBeInTheDocument();
});

test('renders "Book Now" buttons for each hotel', () => {
  render(<TopRatedHotels />);

  // Check for "Book Now" buttons
  const bookNowButtons = screen.getAllByText(/Book Now/i);
  expect(bookNowButtons).toHaveLength(3);

  // Ensure each button is present in the document
  bookNowButtons.forEach(button => {
    expect(button).toBeInTheDocument();
  });
});
