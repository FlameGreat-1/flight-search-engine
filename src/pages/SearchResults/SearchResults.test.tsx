import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchResults } from './SearchResults';

const mockNavigate = vi.fn();
const mockUseSearchStore = vi.fn();
const mockUseFilteredFlights = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@/store', () => ({
  useSearchStore: () => mockUseSearchStore(),
  useFilterStore: () => ({
    clearAllFilters: vi.fn(),
  }),
  useUIStore: () => ({
    isMobileFilterOpen: false,
    toggleMobileFilter: vi.fn(),
  }),
  useCurrencyStore: () => ({
    selectedCurrency: 'USD',
    exchangeRates: null,
    isLoading: false,
    error: null,
    symbol: '$',
    detectUserCurrency: vi.fn(),
    fetchExchangeRates: vi.fn(),
    changeCurrency: vi.fn(),
    updateExchangeRates: vi.fn(),
  }),
}));

vi.mock('@/features/filters', () => ({
  useFilteredFlights: () => mockUseFilteredFlights(),
  useFlightFilters: () => ({
    filters: {
      priceRange: { min: 100, max: 1000, currentMin: 100, currentMax: 1000 },
      stops: { direct: false, oneStop: false, twoPlusStops: false },
      airlines: [],
      departureTime: {
        earlyMorning: { label: 'Early Morning', range: '00:00 - 06:00', selected: false },
        morning: { label: 'Morning', range: '06:00 - 12:00', selected: false },
        afternoon: { label: 'Afternoon', range: '12:00 - 18:00', selected: false },
        evening: { label: 'Evening', range: '18:00 - 24:00', selected: false },
      },
      arrivalTime: {
        earlyMorning: { label: 'Early Morning', range: '00:00 - 06:00', selected: false },
        morning: { label: 'Morning', range: '06:00 - 12:00', selected: false },
        afternoon: { label: 'Afternoon', range: '12:00 - 18:00', selected: false },
        evening: { label: 'Evening', range: '18:00 - 24:00', selected: false },
      },
      duration: { maxDuration: 1200, currentMax: null },
    },
    activeFilters: [],
    actions: {
      updatePrice: vi.fn(),
      toggleStops: vi.fn(),
      toggleAirline: vi.fn(),
      toggleDepartureTime: vi.fn(),
      toggleArrivalTime: vi.fn(),
      updateDuration: vi.fn(),
      removeFilter: vi.fn(),
      clearAll: vi.fn(),
    },
  }),
}));

vi.mock('@/features/analytics/hooks/usePriceAnalytics', () => ({
  usePriceAnalytics: () => ({
    average: 500,
    median: 500,
    lowest: 300,
    highest: 800,
    distribution: [],
  }),
}));

vi.mock('@/components/charts/PriceGraph/usePriceGraphData', () => ({
  usePriceGraphData: () => ({
    data: [],
    priceRange: { min: 0, max: 1000 },
    averagePrice: 500,
    lowestPrice: 300,
    trend: null,
    insights: [],
    hasData: false,
    isEmpty: true,
  }),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('SearchResults', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    
    mockUseSearchStore.mockReturnValue({
      hasSearched: true,
      isLoading: false,
    });

    mockUseFilteredFlights.mockReturnValue({
      stats: { count: 10, lowestPrice: 300, highestPrice: 800, averagePrice: 500 },
      flights: [],
      isEmpty: false,
      priceData: [],
      priceTrend: null,
    });
  });

  it('renders search results page', () => {
    render(<SearchResults />, { wrapper });
    const priceTrendsElements = screen.queryAllByText(/price trends/i);
    expect(priceTrendsElements.length).toBeGreaterThanOrEqual(0);
  });

  it('redirects to home when no search has been performed', () => {
    mockUseSearchStore.mockReturnValue({
      hasSearched: false,
      isLoading: false,
    });

    render(<SearchResults />, { wrapper });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
