import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListHotel from '../components/ListHotel';
import Loader from '../components/Loader';

// Mock the navigate function from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
);

const mockData = [
  {
    hotel_id: '1',
    price: 500,
    details: {
      name: 'Hotel A',
      imageUrl: '/hotel-a.jpg',
      trustyou: {
        score: {
          kaligo_overall: 4.5,
        },
      },
    },
  },
  {
    hotel_id: '2',
    price: 300,
    details: {
      name: 'Hotel B',
      imageUrl: '/hotel-b.jpg',
      trustyou: {
        score: {
          kaligo_overall: 3.5,
        },
      },
    },
  },
  {
    hotel_id: '3',
    price: 1000,
    details: {
      name: 'Hotel C',
      imageUrl: '/hotel-c.jpg',
      trustyou: {
        score: {
          kaligo_overall: 4.9,
        },
      },
    },
  },
];

describe('ListHotel Component', () => {
  const defaultFilter = { priceRange: [], starRating: [] };

  // verify hotel are rendered after the data is fetched
  test('fetches and displays hotel data correctly', async () => {
    render(<ListHotel filter={defaultFilter} />);

    await waitFor(() => {
      expect(screen.getByText('Hotel A')).toBeInTheDocument();
      expect(screen.getByText('Hotel B')).toBeInTheDocument();
    });
  });

  // verify hotels are correctly filtered (price range)
  test('filters hotels based on price range', async () => {
    const mockUpdatePriceRangeCounts = jest.fn();
    const mockUpdateStarRatingCounts = jest.fn();

    render(
      <ListHotel
        filter={{ priceRange: [{ min: 0, max: 400 }], starRating: [] }}
        updatePriceRangeCounts={mockUpdatePriceRangeCounts}
        updateStarRatingCounts={mockUpdateStarRatingCounts}
      />
    );

    await waitFor(() => {
      expect(screen.queryByText('Hotel A')).not.toBeInTheDocument();
      expect(screen.getByText('Hotel B')).toBeInTheDocument();
    });
  });

  // verify hotels are correctly filtered (star rating)
  test('filters hotels based on star rating', async () => {
    const mockUpdatePriceRangeCounts = jest.fn();
    const mockUpdateStarRatingCounts = jest.fn();

    render(
      <ListHotel
        filter={{ priceRange: [], starRating: [{ min: 4, max: 5 }] }}
        updatePriceRangeCounts={mockUpdatePriceRangeCounts}
        updateStarRatingCounts={mockUpdateStarRatingCounts}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Hotel A')).toBeInTheDocument();
      expect(screen.queryByText('Hotel B')).not.toBeInTheDocument();
    });
  });

  // verify hotels are correctly filtered (both)
  test('applies both price range and star rating filters correctly', async () => {
    const mockUpdatePriceRangeCounts = jest.fn();
    const mockUpdateStarRatingCounts = jest.fn();

    render(
      <ListHotel
        filter={{ priceRange: [{ min: 300, max: 600 }], starRating: [{ min: 4, max: 5 }] }}
        updatePriceRangeCounts={mockUpdatePriceRangeCounts}
        updateStarRatingCounts={mockUpdateStarRatingCounts}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Hotel A')).toBeInTheDocument();
      expect(screen.queryByText('Hotel B')).not.toBeInTheDocument();
    });
  });
});