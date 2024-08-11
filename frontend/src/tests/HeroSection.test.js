// HeroSection.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from '../components/HeroSection';
import '@testing-library/jest-dom/extend-expect'; 

test('renders HeroSection with background image, text, and SearchForm', () => {
  render(<HeroSection />);

  const bgImage = screen.getByAltText('bg image');
  expect(bgImage).toBeInTheDocument();
  expect(bgImage).toHaveClass('hero-image');

  const mainHeading = screen.getByText(/Chase elegance. Reserve your dream stay now./i);
  expect(mainHeading).toBeInTheDocument();

  const subHeading = screen.getByText(/Discover the finest hotels from all over the world./i);
  expect(subHeading).toBeInTheDocument();

});
