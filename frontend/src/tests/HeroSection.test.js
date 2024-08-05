// HeroSection.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from '../components/HeroSection';

describe('HeroSection Component', () => {
  test('renders background image, overlay, and text content', () => {
    render(<HeroSection />);

    // Check if background image is rendered
    expect(screen.getByAltText('bg image')).toBeInTheDocument();

    // Check if overlay is rendered
    expect(screen.getByTestId('overlay')).toBeInTheDocument();

    // Check if text content is rendered
    expect(screen.getByText(/Chase elegance. Reserve your dream stay now./i)).toBeInTheDocument();
    expect(screen.getByText(/Discover the finest hotels from all over the world./i)).toBeInTheDocument();

    // Check if SearchForm is rendered
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });
});
