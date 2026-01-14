import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchResults } from './SearchResults';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@/store', () => ({
  useSearchStore: () => ({
    hasSearched: true,
    isLoading: false,
  }),
  useFilterStore: () => ({
    clearAllFilters: vi.fn(),
  }),
  useUIStore: () => ({
    isMobileFilterOpen: false,
    toggleMobileFilter: vi.fn(),
  }),
}));

vi.mock('@/features/filters', () => ({
  useFilteredFlights: () => ({
    stats: { count: 10, lowestPrice: 300, highestPrice: 800, averagePrice: 500 },
    flights: [],
    isEmpty: false,
    priceData: [],
    priceTrend: null,
  }),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('SearchResults', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders search results page', () => {
    render(<SearchResults />, { wrapper });
    expect(screen.getByText(/price trends/i)).toBeInTheDocument();
  });

  it('redirects to home when no search has been performed', () => {
    vi.mock('@/store', () => ({
      useSearchStore: () => ({
        hasSearched: false,
        isLoading: false,
      }),
      useFilterStore: () => ({
        clearAllFilters: vi.fn(),
      }),
      useUIStore: () => ({
        isMobileFilterOpen: false,
        toggleMobileFilter: vi.fn(),
      }),
    }));

    render(<SearchResults />, { wrapper });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
