export type {
  AmadeusAuthResponse,
  AmadeusError,
  AmadeusErrorResponse,
  AmadeusFlightSegment,
  AmadeusItinerary,
  AmadeusTravelerPricing,
  AmadeusFlightOffer,
  AmadeusFlightOffersResponse,
  FlightSearchParams,
  AirportSearchParams,
  AmadeusLocation,
  AmadeusLocationResponse,
  ApiResponse,
  ApiError,
} from './api';

export type {
  CabinClass,
  TripType,
  Airport,
  FlightSegment,
  Itinerary,
  FlightPrice,
  Flight,
  FlightSearchCriteria,
  PricePoint,
  PriceTrend,
  FlightFilters,
  SortOption,
  FlightSearchState,
} from './flight';

export type {
  SearchFormData,
  SearchFormErrors,
  SearchHistoryItem,
  AirportSuggestion,
  PassengerCount,
  SearchValidation,
  QuickSearchOption,
  DateRange,
  SearchMetadata,
} from './search';

export type {
  PriceRangeFilter,
  StopsFilter,
  AirlineFilter,
  TimeRange,
  DepartureTimeFilter,
  ArrivalTimeFilter,
  DurationFilter,
  ActiveFilter,
  FilterState,
  FilterOptions,
  FilterUpdatePayload,
  FilterPreset,
  FilterPresetConfig,
} from './filter';

export type {
  Currency,
  ExchangeRates,
  CurrencyState,
  LocationData,
} from './currency';

export { CURRENCY_SYMBOLS, DEFAULT_CURRENCY, CACHE_DURATION } from './currency';
