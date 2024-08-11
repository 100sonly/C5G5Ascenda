// RoomDetailsDialog.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RoomDetailsDialog from '../components/RoomDetailsDialog';
import { amenityIcons } from '../components/RoomAmenityIcons/index.js';

// Mock data for testing
const mockRoom = {
  images: [
    { high_resolution_url: 'image1.jpg' },
    { high_resolution_url: 'image2.jpg' },
  ],
  roomNormalizedDescription: 'Deluxe Room',
  amenities: ['Air conditioning', 'Free bottled water'],
  price: 200,
  market_rates: [
    { rate: 180, supplier: 'Supplier A' },
    { rate: 190, supplier: 'Supplier B' },
  ],
  long_description: '<p>This is a detailed description of the room.</p>',
};

const mockOnClose = jest.fn()

  

  test('calls onClose when Close button is clicked', () => {
    render(<RoomDetailsDialog open={true} onClose={mockOnClose} room={mockRoom} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

