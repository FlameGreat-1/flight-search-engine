import type { SearchFormData, SearchFormErrors, PassengerCount } from '@/types';
import { PASSENGER_LIMITS, DATE_CONSTRAINTS, SEARCH_CONSTRAINTS } from './constants';
import { isValidDate, isDateInPast, getDaysDifference, parseISODate } from './date';

export const validateOrigin = (origin: string): string | undefined => {
  if (!origin || origin.trim().length === 0) {
    return 'Origin airport is required';
  }
  if (origin.length < 3) {
    return 'Please enter a valid airport code';
  }
  return undefined;
};

export const validateDestination = (destination: string, origin: string): string | undefined => {
  if (!destination || destination.trim().length === 0) {
    return 'Destination airport is required';
  }
  if (destination.length < 3) {
    return 'Please enter a valid airport code';
  }
  if (destination.toUpperCase() === origin.toUpperCase()) {
    return 'Destination must be different from origin';
  }
  return undefined;
};

export const validateDepartureDate = (departureDate: string): string | undefined => {
  if (!departureDate) {
    return 'Departure date is required';
  }

  const date = parseISODate(departureDate);
  if (!date || !isValidDate(date)) {
    return 'Invalid departure date';
  }

  if (isDateInPast(date)) {
    return 'Departure date cannot be in the past';
  }

  const daysFromNow = getDaysDifference(new Date(), date);
  if (daysFromNow > DATE_CONSTRAINTS.MAX_DEPARTURE_DAYS) {
    return `Departure date cannot be more than ${DATE_CONSTRAINTS.MAX_DEPARTURE_DAYS} days from today`;
  }

  return undefined;
};

export const validateReturnDate = (
  returnDate: string,
  departureDate: string,
  tripType: string
): string | undefined => {
  if (tripType === 'one-way') {
    return undefined;
  }

  if (!returnDate) {
    return 'Return date is required for round trip';
  }

  const returnDateObj = parseISODate(returnDate);
  if (!returnDateObj || !isValidDate(returnDateObj)) {
    return 'Invalid return date';
  }

  if (isDateInPast(returnDateObj)) {
    return 'Return date cannot be in the past';
  }

  const departureDateObj = parseISODate(departureDate);
  if (departureDateObj && isValidDate(departureDateObj)) {
    const daysDiff = getDaysDifference(departureDateObj, returnDateObj);

    if (daysDiff < DATE_CONSTRAINTS.MIN_TRIP_DURATION) {
      return 'Return date must be after departure date';
    }

    if (daysDiff > DATE_CONSTRAINTS.MAX_TRIP_DURATION) {
      return `Trip duration cannot exceed ${DATE_CONSTRAINTS.MAX_TRIP_DURATION} days`;
    }
  }

  return undefined;
};

export const validatePassengerCount = (
  adults: number,
  children: number,
  infants: number
): string | undefined => {
  if (adults < PASSENGER_LIMITS.MIN_ADULTS) {
    return `At least ${PASSENGER_LIMITS.MIN_ADULTS} adult is required`;
  }

  if (adults > PASSENGER_LIMITS.MAX_ADULTS) {
    return `Maximum ${PASSENGER_LIMITS.MAX_ADULTS} adults allowed`;
  }

  if (children < PASSENGER_LIMITS.MIN_CHILDREN || children > PASSENGER_LIMITS.MAX_CHILDREN) {
    return `Children must be between ${PASSENGER_LIMITS.MIN_CHILDREN} and ${PASSENGER_LIMITS.MAX_CHILDREN}`;
  }

  if (infants < PASSENGER_LIMITS.MIN_INFANTS || infants > PASSENGER_LIMITS.MAX_INFANTS) {
    return `Infants must be between ${PASSENGER_LIMITS.MIN_INFANTS} and ${PASSENGER_LIMITS.MAX_INFANTS}`;
  }

  if (infants > adults) {
    return 'Number of infants cannot exceed number of adults';
  }

  const total = adults + children + infants;
  if (total > PASSENGER_LIMITS.MAX_TOTAL) {
    return `Total passengers cannot exceed ${PASSENGER_LIMITS.MAX_TOTAL}`;
  }

  return undefined;
};

export const validateSearchForm = (formData: SearchFormData): SearchFormErrors => {
  const errors: SearchFormErrors = {};

  const originError = validateOrigin(formData.origin);
  if (originError) errors.origin = originError;

  const destinationError = validateDestination(formData.destination, formData.origin);
  if (destinationError) errors.destination = destinationError;

  const departureDateError = validateDepartureDate(formData.departureDate);
  if (departureDateError) errors.departureDate = departureDateError;

  const returnDateError = validateReturnDate(
    formData.returnDate,
    formData.departureDate,
    formData.tripType
  );
  if (returnDateError) errors.returnDate = returnDateError;

  const passengerError = validatePassengerCount(
    formData.adults,
    formData.children,
    formData.infants
  );
  if (passengerError) errors.adults = passengerError;

  return errors;
};

export const isSearchFormValid = (formData: SearchFormData): boolean => {
  const errors = validateSearchForm(formData);
  return Object.keys(errors).length === 0;
};

export const validateAirportKeyword = (keyword: string): boolean => {
  return keyword.trim().length >= SEARCH_CONSTRAINTS.MIN_KEYWORD_LENGTH;
};

export const validatePriceRange = (min: number, max: number): boolean => {
  return min >= 0 && max >= min;
};

export const sanitizeSearchInput = (input: string): string => {
  return input.trim().replace(/[^a-zA-Z0-9\s-]/g, '');
};

export const validateIATACode = (code: string): boolean => {
  const iataRegex = /^[A-Z]{3}$/;
  return iataRegex.test(code.toUpperCase());
};

export const getTotalPassengers = (passengers: PassengerCount): number => {
  return passengers.adults + passengers.children + passengers.infants;
};
