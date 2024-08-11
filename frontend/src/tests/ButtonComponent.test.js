// Button.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Button } from '../components/Button';

describe('Button Component', () => {
  const defaultProps = {
    children: 'Test Button',
    onClick: jest.fn(),
    buttonStyle: 'btn--primary',
    buttonSize: 'btn--medium',
    type: 'button',
    to: '/test-path',
  };

  const setup = (props = {}) => {
    render(
      <Router>
        <Button {...defaultProps} {...props} />
      </Router>
    );
  };

  test('renders with default styles and size', () => {
    setup();
    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn btn--primary btn--medium');
  });

  test('renders with provided styles and size', () => {
    setup({ buttonStyle: 'btn--outline', buttonSize: 'btn--large' });
    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toHaveClass('btn btn--outline btn--large');
  });

  test('renders as a link with the correct path', () => {
    setup();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test-path');
  });

  test('handles onClick event', () => {
    setup();
    const button = screen.getByRole('button', { name: /test button/i });
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  test('renders the correct children', () => {
    setup({ children: 'Click Me' });
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test('does not apply invalid styles or sizes', () => {
    setup({ buttonStyle: 'invalid-style', buttonSize: 'invalid-size' });
    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toHaveClass('btn btn--primary btn--medium');
  });
});
