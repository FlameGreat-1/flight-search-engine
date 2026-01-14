import type { Flight, SortOption } from '@/types';

export const sortFlightsByPrice = (flights: Flight[], ascending: boolean = true): Flight[] => {
  return [...flights].sort((a, b) => {
    const priceA = a.price.total;
    const priceB = b.price.total;
    return ascending ? priceA - priceB : priceB - priceA;
  });
};

export const sortFlightsByDuration = (flights: Flight[], ascending: boolean = true): Flight[] => {
  return [...flights].sort((a, b) => {
    const durationA = a.totalDuration;
    const durationB = b.totalDuration;
    return ascending ? durationA - durationB : durationB - durationA;
  });
};

export const sortFlightsByDeparture = (flights: Flight[], ascending: boolean = true): Flight[] => {
  return [...flights].sort((a, b) => {
    const timeA = a.departureDate.getTime();
    const timeB = b.departureDate.getTime();
    return ascending ? timeA - timeB : timeB - timeA;
  });
};

export const sortFlightsByArrival = (flights: Flight[], ascending: boolean = true): Flight[] => {
  return [...flights].sort((a, b) => {
    const timeA = a.arrivalDate.getTime();
    const timeB = b.arrivalDate.getTime();
    return ascending ? timeA - timeB : timeB - timeA;
  });
};

export const sortFlightsByStops = (flights: Flight[], ascending: boolean = true): Flight[] => {
  return [...flights].sort((a, b) => {
    const stopsA = a.totalStops;
    const stopsB = b.totalStops;
    return ascending ? stopsA - stopsB : stopsB - stopsA;
  });
};

export const sortFlightsByBestValue = (flights: Flight[]): Flight[] => {
  return [...flights].sort((a, b) => {
    const scoreA = calculateFlightScore(a);
    const scoreB = calculateFlightScore(b);
    return scoreB - scoreA;
  });
};

const calculateFlightScore = (flight: Flight): number => {
  const maxPrice = 10000;
  const maxDuration = 1440;

  const priceScore = (1 - flight.price.total / maxPrice) * 50;
  const durationScore = (1 - flight.totalDuration / maxDuration) * 30;
  const stopsScore = flight.totalStops === 0 ? 20 : flight.totalStops === 1 ? 10 : 0;

  return priceScore + durationScore + stopsScore;
};

export const sortFlights = (flights: Flight[], sortBy: SortOption): Flight[] => {
  switch (sortBy) {
    case 'price-asc':
      return sortFlightsByPrice(flights, true);
    case 'price-desc':
      return sortFlightsByPrice(flights, false);
    case 'duration-asc':
      return sortFlightsByDuration(flights, true);
    case 'departure-asc':
      return sortFlightsByDeparture(flights, true);
    default:
      return flights;
  }
};

export const getRecommendedFlight = (flights: Flight[]): Flight | null => {
  if (flights.length === 0) return null;
  const sorted = sortFlightsByBestValue(flights);
  return sorted[0];
};

export const getCheapestFlight = (flights: Flight[]): Flight | null => {
  if (flights.length === 0) return null;
  const sorted = sortFlightsByPrice(flights, true);
  return sorted[0];
};

export const getFastestFlight = (flights: Flight[]): Flight | null => {
  if (flights.length === 0) return null;
  const sorted = sortFlightsByDuration(flights, true);
  return sorted[0];
};

export const getDirectFlights = (flights: Flight[]): Flight[] => {
  return flights.filter((flight) => flight.totalStops === 0);
};

export const groupFlightsByAirline = (flights: Flight[]): Record<string, Flight[]> => {
  return flights.reduce((acc, flight) => {
    const airline = flight.validatingAirlineCodes[0];
    if (!acc[airline]) {
      acc[airline] = [];
    }
    acc[airline].push(flight);
    return acc;
  }, {} as Record<string, Flight[]>);
};

export const groupFlightsByStops = (flights: Flight[]): Record<number, Flight[]> => {
  return flights.reduce((acc, flight) => {
    const stops = flight.totalStops;
    if (!acc[stops]) {
      acc[stops] = [];
    }
    acc[stops].push(flight);
    return acc;
  }, {} as Record<number, Flight[]>);
};
