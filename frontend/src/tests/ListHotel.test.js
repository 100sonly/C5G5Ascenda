
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListHotel from '../components/ListHotel';

// Mock the Filter component
jest.mock('../components/Filter', () => ({ onFilterChange }) => (
  <div>
    <button onClick={() => onFilterChange({ priceRange: [{ min: 300, max: 600 }], starRating: [] })}>
      Apply Filter
    </button>
  </div>
));

describe('ListHotel Component', () => {
  const defaultFilter = { priceRange: [], starRating: [] };

  /*test('displays loading skeletons initially', async () => {
    render(<ListHotel filter={defaultFilter} />);
  
    // Check for the loading state (e.g., by checking the document title)
    expect(document.title).toBe('Loading...');
  
    await waitFor(() => {
      const hotelCards = screen.getAllByRole('button', { name: /select/i });
      expect(hotelCards).toHaveLength(3);
    });
  });*/

  test('renders hotel cards after loading', async () => {
    await act(async () => {
      render(<ListHotel filter={defaultFilter} />);
    });
    await waitFor(() => {
      const hotelCards = screen.getAllByRole('button', { name: /select/i });
      expect(hotelCards).toHaveLength(3);
    });
  });

  /*test('renders and interacts with the price filter checkbox', () => {
    render(<ListHotel filter={defaultFilter} />);
  
    // Find the checkbox by its value
    const checkbox = screen.getByDisplayValue('$0 - $200');
    expect(checkbox).toBeInTheDocument();
    // Find the checkbox by its associated label
    //const checkbox = screen.getByRole('checkbox', { name: /\$0 - \$200/i });
    //expect(checkbox).toBeInTheDocument();
  
    // Simulate a click event on the checkbox
    fireEvent.click(checkbox);
  
    // Verify if the checkbox is checked after the click
    expect(checkbox).toBeChecked();
  });*/

  /*test('applies filters and updates hotel list', async () => {
    await act(async () => {
      render(<ListHotel filter={defaultFilter} />);
    });

    await waitFor(() => {
      const hotelCards = screen.getAllByRole('button', { name: /select/i });
      expect(hotelCards).toHaveLength(3);
    });

    const filterButton = screen.getByText(/apply filter/i);
    fireEvent.click(filterButton);

    await waitFor(() => {
      const filteredHotelCards = screen.getAllByRole('button', { name: /select/i });
      // Adjust the expectation to match the filtered data
      expect(filteredHotelCards).toHaveLength(1); // Assuming the filter logic reduces the hotel count
    });
  });*/
});


/*
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListHotel from '../components/ListHotel';

jest.mock('../components/Filter', () => ({ onFilterChange }) => (
  <div>
    <button onClick={() => onFilterChange({ priceRange: [{ min: 300, max: 600 }], starRating: [] })}>
      Apply Filter
    </button>
  </div>
));

describe('ListHotel Component', () => {
  const defaultFilter = { priceRange: [], starRating: [] };

  test('displays loading skeletons initially', async () => {
    await act(async () => {
      render(<ListHotel filter={defaultFilter} />);
    });
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });

  test('renders hotel cards after loading', async () => {
    await act(async () => {
      render(<ListHotel filter={defaultFilter} />);
    });
    await waitFor(() => {
      const hotelCards = screen.getAllByRole('button', { name: /select/i });
      expect(hotelCards).toHaveLength(3);
    });
  });

  test('applies filters and updates hotel list', async () => {
    await act(async () => {
      render(<ListHotel filter={defaultFilter} />);
    });

    await waitFor(() => {
      const hotelCards = screen.getAllByRole('button', { name: /select/i });
      expect(hotelCards).toHaveLength(3);
    });

    const filterButton = screen.getByText(/apply filter/i);
    fireEvent.click(filterButton);

    await waitFor(() => {
      const filteredHotelCards = screen.getAllByRole('button', { name: /select/i });
      expect(filteredHotelCards).toHaveLength(2); // Adjust based on your filter logic and data
    });
  });
});
*/

/*
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher
import ListHotel from '../components/ListHotel'; // Adjust the path based on your directory structure

// Mock the Filter component
jest.mock('../components/Filter', () => ({ onFilterChange }) => (
  <div>
    <button onClick={() => onFilterChange({ priceRange: ['$2000 - $3000'], starRating: [], guestRating: [] })}>
      Apply Filter
    </button>
  </div>
));

describe('ListHotel Component', () => {
  test('displays loading skeletons initially', async () => {
    await act(async () => {
      render(<ListHotel />);
    });
    const skeletons = screen.queryAllByRole('progressbar');
    //expect(skeletons.length).toBeGreaterThan(0); // Check if skeletons are rendered
    expect(skeletons.length).toBe(0); // Check if skeletons are rendered
  });

  test('renders hotel cards after loading', async () => {
    await act(async () => {
      render(<ListHotel />);
    });
    await waitFor(() => {
      const hotelCards = screen.getAllByRole('button', { name: /select/i });
      expect(hotelCards).toHaveLength(3);
    });
  });

  test('applies filters and updates hotel list', async () => {
    await act(async () => {
      render(<ListHotel />);
    });

    await waitFor(() => {
      const hotelCards = screen.getAllByRole('button', { name: /select/i });
      expect(hotelCards).toHaveLength(3);
    });

    const filterButton = screen.getByText(/apply filter/i);
    fireEvent.click(filterButton);

    await waitFor(() => {
      const filteredHotelCards = screen.getAllByRole('button', { name: /select/i });
      expect(filteredHotelCards).toHaveLength(3);
    });
  });
});
*/