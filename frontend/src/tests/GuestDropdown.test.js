// GuestDropdown.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers
import GuestDropdown from '../components/GuestDropdown';

// Mock the useLocation hook to avoid errors
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({}),
}));

describe('GuestDropdown Component', () => {
  const setup = (props = { params: [] }) => {
    render(<GuestDropdown {...props} />);
  };

  test('opens the dropdown menu when input is clicked', () => {
    setup();
    const inputContainer = screen.getByRole('textbox');
    fireEvent.click(inputContainer);
    expect(screen.getByText('Rooms')).toBeInTheDocument();
    expect(screen.getByText('Adults')).toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
  });



  test('closes dropdown when clicking outside', () => {
    setup();
    const inputContainer = screen.getByRole('textbox');
    fireEvent.click(inputContainer);
    expect(screen.getByText('Rooms')).toBeInTheDocument();

    // Click outside the dropdown
    fireEvent.mouseDown(document);
    expect(screen.queryByText('Rooms')).not.toBeInTheDocument();
  });
});
