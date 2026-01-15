import type {
  Flight,
  FlightSearchCriteria,
  SortOption,
  FilterState,
  PricePoint,
  PriceTrend,
  ExchangeRates,
} from '@/types';

export interface SearchState {
  criteria: FlightSearchCriteria;
  results: Flight[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

export interface FilterStoreState extends FilterState {
  filteredResults: Flight[];
  priceData: PricePoint[];
  priceTrend: PriceTrend | null;
}

export interface UIState {
  sortBy: SortOption;
  isMobileFilterOpen: boolean;
  selectedFlightId: string | null;
}

export interface CurrencyStoreState {
  selectedCurrency: string;
  exchangeRates: ExchangeRates | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

export interface SearchActions {
  setCriteria: (criteria: Partial<FlightSearchCriteria>) => void;
  setResults: (results: Flight[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetSearch: () => void;
}

export interface FilterActions {
  updatePriceRange: (min: number, max: number) => void;
  toggleStops: (stops: 'direct' | 'oneStop' | 'twoPlusStops') => void;
  toggleAirline: (airlineCode: string) => void;
  toggleDepartureTime: (timeRange: string) => void;
  toggleArrivalTime: (timeRange: string) => void;
  setMaxDuration: (duration: number | null) => void;
  removeFilter: (filterId: string) => void;
  clearAllFilters: () => void;
  initializeFilters: (flights: Flight[]) => void;
  applyFilters: () => void;
}

export interface UIActions {
  setSortBy: (sortBy: SortOption) => void;
  toggleMobileFilter: () => void;
  setSelectedFlight: (flightId: string | null) => void;
}

export interface CurrencyActions {
  setSelectedCurrency: (currency: string) => void;
  setExchangeRates: (rates: ExchangeRates) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  fetchExchangeRates: (baseCurrency?: string) => Promise<void>;
  detectUserCurrency: () => Promise<void>;
  updateExchangeRates: () => Promise<void>;
  resetCurrency: () => void;
}
