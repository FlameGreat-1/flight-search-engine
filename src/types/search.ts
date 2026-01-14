import type { Airport, CabinClass, TripType } from './flight';

export interface SearchFormData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  tripType: TripType;
  adults: number;
  children: number;
  infants: number;
  cabinClass: CabinClass;
}

export interface SearchFormErrors {
  origin?: string;
  destination?: string;
  departureDate?: string;
  returnDate?: string;
  adults?: string;
  children?: string;
  infants?: string;
}

export interface SearchHistoryItem {
  id: string;
  origin: Airport;
  destination: Airport;
  departureDate: Date;
  returnDate: Date | null;
  tripType: TripType;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass: CabinClass;
  searchedAt: Date;
}

export interface AirportSuggestion {
  iataCode: string;
  name: string;
  cityName: string;
  countryName: string;
  countryCode: string;
  score: number;
}

export interface PassengerCount {
  adults: number;
  children: number;
  infants: number;
}

export interface SearchValidation {
  isValid: boolean;
  errors: SearchFormErrors;
}

export interface QuickSearchOption {
  label: string;
  origin: string;
  destination: string;
  popular: boolean;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface SearchMetadata {
  totalResults: number;
  searchDuration: number;
  currency: string;
  searchId: string;
  timestamp: Date;
}
