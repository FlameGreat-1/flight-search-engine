import type { CabinClass, TripType, SortOption, FilterPreset } from '@/types';

export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Flight Search Engine',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  API_RETRY_ATTEMPTS: parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS) || 3,
} as const;

export const AMADEUS_CONFIG = {
  API_URL: import.meta.env.VITE_AMADEUS_API_URL || 'https://test.api.amadeus.com',
  API_KEY: import.meta.env.VITE_AMADEUS_API_KEY,
  API_SECRET: import.meta.env.VITE_AMADEUS_API_SECRET,
  TOKEN_ENDPOINT: '/v1/security/oauth2/token',
  FLIGHT_OFFERS_ENDPOINT: '/v2/shopping/flight-offers',
  LOCATION_ENDPOINT: '/v1/reference-data/locations',
} as const;

export const CABIN_CLASSES: Record<CabinClass, string> = {
  ECONOMY: 'Economy',
  PREMIUM_ECONOMY: 'Premium Economy',
  BUSINESS: 'Business',
  FIRST: 'First Class',
} as const;

export const TRIP_TYPES: Record<TripType, string> = {
  'one-way': 'One Way',
  'round-trip': 'Round Trip',
} as const;

export const PASSENGER_LIMITS = {
  MIN_ADULTS: 1,
  MAX_ADULTS: 9,
  MIN_CHILDREN: 0,
  MAX_CHILDREN: 9,
  MIN_INFANTS: 0,
  MAX_INFANTS: 9,
  MAX_TOTAL: 9,
} as const;

export const DATE_CONSTRAINTS = {
  MIN_DEPARTURE_DAYS: 0,
  MAX_DEPARTURE_DAYS: 365,
  MIN_TRIP_DURATION: 1,
  MAX_TRIP_DURATION: 365,
} as const;

export const SEARCH_CONSTRAINTS = {
  MIN_KEYWORD_LENGTH: 2,
  MAX_RESULTS: 250,
  DEBOUNCE_DELAY: 300,
  AUTOCOMPLETE_LIMIT: 10,
} as const;

export const SORT_OPTIONS: Record<SortOption, string> = {
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'duration-asc': 'Duration: Shortest',
  'departure-asc': 'Departure: Earliest',
} as const;

export const TIME_RANGES = {
  EARLY_MORNING: { label: 'Early Morning', start: 0, end: 6 },
  MORNING: { label: 'Morning', start: 6, end: 12 },
  AFTERNOON: { label: 'Afternoon', start: 12, end: 18 },
  EVENING: { label: 'Evening', start: 18, end: 24 },
} as const;

export const STOPS_OPTIONS = [
  { value: 0, label: 'Direct' },
  { value: 1, label: '1 Stop' },
  { value: 2, label: '2+ Stops' },
] as const;

export const FILTER_PRESETS: Record<FilterPreset, { name: string; description: string }> = {
  cheapest: {
    name: 'Cheapest',
    description: 'Lowest price flights',
  },
  fastest: {
    name: 'Fastest',
    description: 'Shortest duration',
  },
  best: {
    name: 'Best',
    description: 'Best value for money',
  },
  direct: {
    name: 'Direct',
    description: 'Non-stop flights only',
  },
} as const;

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'CHF',
  CNY: '¥',
  INR: '₹',
  NGN: '₦',
} as const;

export const DEFAULT_CURRENCY = 'USD';

export const STORAGE_KEYS = {
  SEARCH_HISTORY: 'flight_search_history',
  RECENT_SEARCHES: 'recent_searches',
  USER_PREFERENCES: 'user_preferences',
  AUTH_TOKEN: 'amadeus_token',
  TOKEN_EXPIRY: 'token_expiry',
} as const;

export const CACHE_KEYS = {
  FLIGHT_OFFERS: 'flight_offers',
  AIRPORTS: 'airports',
  PRICE_TRENDS: 'price_trends',
} as const;

export const QUERY_STALE_TIME = {
  FLIGHT_OFFERS: 5 * 60 * 1000,
  AIRPORTS: 24 * 60 * 60 * 1000,
  AUTH_TOKEN: 25 * 60 * 1000,
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  API_ERROR: 'Unable to fetch flight data. Please try again.',
  AUTH_ERROR: 'Authentication failed. Please refresh the page.',
  VALIDATION_ERROR: 'Please check your search criteria.',
  NO_RESULTS: 'No flights found. Try adjusting your search.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

export const POPULAR_ROUTES = [
  { origin: 'JFK', destination: 'LAX', label: 'New York to Los Angeles' },
  { origin: 'LHR', destination: 'JFK', label: 'London to New York' },
  { origin: 'DXB', destination: 'LHR', label: 'Dubai to London' },
  { origin: 'SIN', destination: 'SYD', label: 'Singapore to Sydney' },
] as const;

export const AIRLINE_ALLIANCES = {
  STAR_ALLIANCE: ['UA', 'LH', 'AC', 'SQ', 'TK', 'NH'],
  ONEWORLD: ['AA', 'BA', 'QF', 'JL', 'QR', 'IB'],
  SKYTEAM: ['DL', 'AF', 'KL', 'AZ', 'KE', 'AM'],
} as const;
