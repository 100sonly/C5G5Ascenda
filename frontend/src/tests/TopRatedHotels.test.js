import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopRatedHotels from '../components/TopRatedHotels';

jest.mock('@mui/material', () => ({
  Card: (props) => <div {...props} data-testid="card">{props.children}</div>,
  CardContent: (props) => <div {...props} data-testid="card-content">{props.children}</div>,
  CardMedia: (props) => <img {...props} data-testid="card-media" />,
  Typography: (props) => <div {...props} data-testid="typography">{props.children}</div>,
  Button: (props) => <button {...props} data-testid="button">{props.children}</button>,
  CardActions: (props) => <div {...props} data-testid="card-actions">{props.children}</div>,
}));

describe('TopRatedHotels Component', () => {
  test('renders top rated hotels correctly', () => {
    render(<TopRatedHotels />);

    // Log the HTML output to verify the rendering
    screen.debug();

    // Check if the cards are rendered
    expect(screen.getAllByTestId('card')).toHaveLength(3);

    // Query the text content for hotel names
    const hotelNames = screen.getAllByTestId('typography').filter(element =>
      element.textContent.includes('Hotel A') || element.textContent.includes('Hotel B') || element.textContent.includes('Hotel C')
    );
    expect(hotelNames.length).toBeGreaterThanOrEqual(3);

    // Verify the hotel names
    expect(hotelNames[0].textContent).toContain('Hotel A');
    expect(hotelNames[1].textContent).toContain('Hotel B');
    expect(hotelNames[2].textContent).toContain('Hotel C');

    // Verify the ratings
    const hotelRatings = screen.getAllByTestId('typography').filter(element =>
      element.textContent.includes('Rating:')
    );
    expect(hotelRatings[0].textContent).toContain('Rating: 4.5');
    expect(hotelRatings[1].textContent).toContain('Rating: 4.2');
    expect(hotelRatings[2].textContent).toContain('Rating: 4.8');

    // Verify the prices
    const hotelPrices = screen.getAllByTestId('typography').filter(element =>
      element.textContent.includes('Price:')
    );
    expect(hotelPrices[0].textContent).toContain('Price: 2024');
    expect(hotelPrices[1].textContent).toContain('Price: 2024');
    expect(hotelPrices[2].textContent).toContain('Price: 2024');

    // Verify the presence of buttons
    expect(screen.getAllByTestId('button')).toHaveLength(3);
  });
});
