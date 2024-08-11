// RoomList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RoomList from '../components/RoomList';
import RoomCard from '../components/RoomCard/index.js';

// Mock data for testing
const mockJson = {
  room1: { id: 1, name: 'Deluxe Room', price: 200 },
  room2: { id: 2, name: 'Suite', price: 400 },
};

const mockGiveRoomName = jest.fn();
const mockGivePrice = jest.fn();
const mockParams = ['param1', 'param2'];

// Mock RoomCard component
jest.mock('../components/RoomCard/index.js', () => {
  return ({ givePrice, giveRoomName, room, params }) => (
    <div>
      <div>{room.name}</div>
      <div>{room.price}</div>
      <button onClick={() => givePrice(room.price)}>Set Price</button>
      <button onClick={() => giveRoomName(room.name)}>Set Room Name</button>
    </div>
  );
});

describe('RoomList Component', () => {
  test('renders RoomCard components based on json data', () => {
    render(
      <RoomList
        giveRoomName={mockGiveRoomName}
        givePrice={mockGivePrice}
        json={mockJson}
        params={mockParams}
      />
    );

    // Check if RoomCard components are rendered
    expect(screen.getByText('Deluxe Room')).toBeInTheDocument();
    expect(screen.getByText('Suite')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('400')).toBeInTheDocument();
  });

  test('calls all params with correct arguments', () => {
    render(
      <RoomList
        giveRoomName={mockGiveRoomName}
        givePrice={mockGivePrice}
        json={mockJson}
        params={mockParams}
      />
    );

    // Simulate button clicks
    fireEvent.click(screen.getAllByText('Set Price')[0]);
    fireEvent.click(screen.getAllByText('Set Room Name')[0]);

    // Check if mock functions were called with correct arguments
    expect(mockGivePrice).toHaveBeenCalledWith(200);
    expect(mockGiveRoomName).toHaveBeenCalledWith('Deluxe Room');
  });
});
