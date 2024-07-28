import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

test('renders Navbar with logo and HOME link', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  // Check for the logo text
  const logoElement = screen.getByText(/Ascenda/i);
  expect(logoElement).toBeInTheDocument();

  // Check for the HOME link
  const homeLink = screen.getByText(/HOME/i);
  expect(homeLink).toBeInTheDocument();
});

test('renders Register and Login buttons when button state is true', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  const registerButton = screen.getByText(/Register/i);
  const loginButton = screen.getByText(/Login/i);

  expect(registerButton).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});


/*
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Navbar with Home link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const homeLink = screen.getByText(/HOME/i);
  expect(homeLink).toBeInTheDocument();
});
*/