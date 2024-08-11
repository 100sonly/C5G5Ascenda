import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Loader from '../components/Loader';

describe('Loader Component', () => {
  test('renders the loading spinner', () => {
    render(<Loader />);
    const spinner = screen.getByTestId('loader-spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('renders the loading message', () => {
    render(<Loader />);
    const message = screen.getByText(/fetching you the best prices.../i);
    expect(message).toBeInTheDocument();
  });
});
