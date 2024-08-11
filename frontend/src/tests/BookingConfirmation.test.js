import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import BookingConfirmation from '../components/pages/BookingConfirmation';
import { useLocation } from 'react-router-dom';

// Mock the useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('BookingConfirmation Component', () => {
  beforeEach(() => {
    // Mock the location object
    useLocation.mockImplementation(() => ({
      state: {
        params: {
          params: [
            '3', // nights
            '2024-08-01#14:00', // start
            '2024-08-07#11:00', // end as a string
            '4.5', // rating
            '123 Hotel St, City', // address
            '12345', // bookingId
            'Deluxe Room', // roomName
            '1', // numberOfRooms
            { prefix: 'http://example.com/', suffix: '.jpg' }, // img
            ['WiFi', 'TV', 'Air conditioning', 'Heating'], // amenities
          ]
        }
      },
      search: '?price=100&roomName=Deluxe%20Room&roomNum=1'
    }));
  });

  test('renders input fields and allows valid input', () => {
    render(
      <MemoryRouter>
        <BookingConfirmation />
      </MemoryRouter>
    );

    // Test valid input for First Name
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'John' },
    });
    expect(screen.getByLabelText(/First Name/i).value).toBe('John');
    expect(screen.queryByText(/First name is required/i)).not.toBeInTheDocument();

    // Test valid input for Last Name
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    expect(screen.getByLabelText(/Last Name/i).value).toBe('Doe');
    expect(screen.queryByText(/Last name is required/i)).not.toBeInTheDocument();

    // Test valid input for Phone Number
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: '1234567890' },
    });
    expect(screen.getByLabelText(/Phone Number/i).value).toBe('1234567890');
    expect(screen.queryByText(/Phone number is required/i)).not.toBeInTheDocument();

    // Test valid input for Email Address
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'john.doe@example.com' },
    });
    expect(screen.getByLabelText(/Email Address/i).value).toBe('john.doe@example.com');
    expect(screen.queryByText(/Email address is required/i)).not.toBeInTheDocument();
  });

  test('shows validation errors for invalid input', () => {
    render(
      <MemoryRouter>
        <BookingConfirmation />
      </MemoryRouter>
    );

    // Trigger validation by simulating a click on the confirm button
    fireEvent.click(screen.getByText(/Confirm & Proceed/i));

    // Test for First Name validation error
    expect(screen.getByLabelText(/First Name/i)).toHaveValue('');
    expect(screen.getByText(/First name is required/i)).toBeInTheDocument();

    // Test for Last Name validation error
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue('');
    expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();

    // Test for Phone Number validation error
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue('');
    expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();

    // Test for Email Address validation error
    expect(screen.getByLabelText(/Email Address/i)).toHaveValue('');
    expect(screen.getByText(/Email address is required/i)).toBeInTheDocument();
  });
});
