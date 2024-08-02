// Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../components/pages/Home';
import HeroSection from '../components/HeroSection';
import TopRatedHotels from '../components/TopRatedHotels';

jest.mock('../components/HeroSection', () => () => <div>HeroSection</div>);
jest.mock('../components/TopRatedHotels', () => () => <div>TopRatedHotels</div>);

describe('Home Component', () => {
  beforeAll(() => {
    global.scrollTo = jest.fn();
  });

  test('renders HeroSection and TopRatedHotels components', () => {
    render(<Home />);

    expect(screen.getByText('HeroSection')).toBeInTheDocument();

    expect(screen.getByText('TopRatedHotels')).toBeInTheDocument();
  });

  test('scrolls to top on mount', () => {
    render(<Home />);

    // Check if window.scrollTo was called with (0, 0)
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
