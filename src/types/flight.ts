export type CabinClass = 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';

export type TripType = 'one-way' | 'round-trip';

export interface Airport {
  iataCode: string;
  name: string;
  cityName: string;
  cityCode: string;
  countryName: string;
  countryCode: string;
}

export interface FlightSegment {
  id: string;
  departure: {
    iataCode: string;
    terminal?: string;
    at: Date;
  };
  arrival: {
    iataCode: string;
    terminal?: string;
    at: Date;
  };
  carrierCode: string;
  carrierName: string;
  flightNumber: string;
  aircraft: string;
  duration: number;
  numberOfStops: number;
}

export interface Itinerary {
  duration: number;
  segments: FlightSegment[];
  departureTime: Date;
  arrivalTime: Date;
  totalStops: number;
}

export interface FlightPrice {
  currency: string;
  total: number;
  base: number;
  fees: number;
  perAdult: number;
}

export interface Flight {
  id: string;
  itineraries: Itinerary[];
  price: FlightPrice;
  validatingAirlineCodes: string[];
  numberOfBookableSeats: number;
  instantTicketingRequired: boolean;
  cabinClass: CabinClass;
  departureDate: Date;
  arrivalDate: Date;
  totalDuration: number;
  totalStops: number;
  airlines: string[];
}

export interface FlightSearchCriteria {
  origin: Airport | null;
  destination: Airport | null;
  departureDate: Date | null;
  returnDate: Date | null;
  tripType: TripType;
  adults: number;
  children: number;
  infants: number;
  cabinClass: CabinClass;
}

export interface PricePoint {
  date: string;
  price: number;
  count: number;
}

export interface PriceTrend {
  average: number;
  lowest: number;
  highest: number;
  trend: 'up' | 'down' | 'stable';
  percentageChange: number;
  goodDeals: number;
}

export interface FlightFilters {
  priceRange: {
    min: number;
    max: number;
  };
  stops: number[];
  airlines: string[];
  departureTimeRanges: string[];
  arrivalTimeRanges: string[];
  maxDuration: number | null;
}

export type SortOption = 'price-asc' | 'price-desc' | 'duration-asc' | 'departure-asc';

export interface FlightSearchState {
  criteria: FlightSearchCriteria;
  results: Flight[];
  filteredResults: Flight[];
  filters: FlightFilters;
  sortBy: SortOption;
  isLoading: boolean;
  error: string | null;
  priceData: PricePoint[];
  priceTrend: PriceTrend | null;
}
