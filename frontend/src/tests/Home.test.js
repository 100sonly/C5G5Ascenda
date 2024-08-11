// Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/pages/Home';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers

jest.mock('../components/HeroSection', () => () => <div data-testid="hero-section">HeroSection</div>);
jest.mock('../components/TopRatedHotels', () => () => <div data-testid="top-rated-hotels">TopRatedHotels</div>);

describe('Home Component', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn(); // Mock window.scrollTo
  });

  test('renders HeroSection and TopRatedHotels components', () => {
    render(<Home />);

    // Check for HeroSection
    const heroSection = screen.getByTestId('hero-section');
    expect(heroSection).toBeInTheDocument();

    // Check for TopRatedHotels
    const topRatedHotels = screen.getByTestId('top-rated-hotels');
    expect(topRatedHotels).toBeInTheDocument();
  });

  test('calls window.scrollTo on component mount', () => {
    render(<Home />);

    // Check if window.scrollTo was called with (0, 0)
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
