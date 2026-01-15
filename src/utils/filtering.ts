import type { Flight, FilterState, StopsFilter } from '@/types';
import { getTimeOfDay } from './date';

export const filterByPriceRange = (flights: Flight[], min: number, max: number): Flight[] => {
  return flights.filter((flight) => {
    const price = flight.price.total;
    return price >= min && price <= max;
  });
};

export const filterByStops = (flights: Flight[], stopsFilter: StopsFilter): Flight[] => {
  if (!stopsFilter.direct && !stopsFilter.oneStop && !stopsFilter.twoPlusStops) {
    return flights;
  }

  return flights.filter((flight) => {
    const stops = flight.totalStops;
    if (stopsFilter.direct && stops === 0) return true;
    if (stopsFilter.oneStop && stops === 1) return true;
    if (stopsFilter.twoPlusStops && stops >= 2) return true;
    return false;
  });
};

export const filterByAirlines = (flights: Flight[], selectedAirlines: string[]): Flight[] => {
  if (selectedAirlines.length === 0) {
    return flights;
  }

  return flights.filter((flight) => {
    return flight.validatingAirlineCodes.some((code) => selectedAirlines.includes(code));
  });
};

export const filterByDepartureTime = (flights: Flight[], timeRanges: string[]): Flight[] => {
  if (timeRanges.length === 0) {
    return flights;
  }

  return flights.filter((flight) => {
    const departureTimeOfDay = getTimeOfDay(flight.departureDate);
    return timeRanges.includes(departureTimeOfDay);
  });
};

export const filterByArrivalTime = (flights: Flight[], timeRanges: string[]): Flight[] => {
  if (timeRanges.length === 0) {
    return flights;
  }

  return flights.filter((flight) => {
    const arrivalTimeOfDay = getTimeOfDay(flight.arrivalDate);
    return timeRanges.includes(arrivalTimeOfDay);
  });
};

export const filterByMaxDuration = (flights: Flight[], maxDuration: number | null): Flight[] => {
  if (maxDuration === null) {
    return flights;
  }

  return flights.filter((flight) => flight.totalDuration <= maxDuration);
};

export const applyAllFilters = (flights: Flight[], filters: FilterState): Flight[] => {
  let filtered = [...flights];

  filtered = filterByPriceRange(filtered, filters.priceRange.currentMin, filters.priceRange.currentMax);

  filtered = filterByStops(filtered, filters.stops);

  const selectedAirlines = filters.airlines.filter((a) => a.selected).map((a) => a.code);
  filtered = filterByAirlines(filtered, selectedAirlines);

  const selectedDepartureTimes = Object.entries(filters.departureTime)
    .filter(([, range]) => range.selected)
    .map(([key]) => {
      if (key === 'earlyMorning') return 'early-morning';
      if (key === 'morning') return 'morning';
      if (key === 'afternoon') return 'afternoon';
      if (key === 'evening') return 'evening';
      return key;
    });
  filtered = filterByDepartureTime(filtered, selectedDepartureTimes);

  const selectedArrivalTimes = Object.entries(filters.arrivalTime)
    .filter(([, range]) => range.selected)
    .map(([key]) => {
      if (key === 'earlyMorning') return 'early-morning';
      if (key === 'morning') return 'morning';
      if (key === 'afternoon') return 'afternoon';
      if (key === 'evening') return 'evening';
      return key;
    });
  filtered = filterByArrivalTime(filtered, selectedArrivalTimes);

  filtered = filterByMaxDuration(filtered, filters.duration.currentMax);

  return filtered;
};

export const getPriceRange = (flights: Flight[]): { min: number; max: number } => {
  if (flights.length === 0) {
    return { min: 0, max: 10000 };
  }

  const prices = flights.map((flight) => flight.price.total);
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
};

export const getMaxDuration = (flights: Flight[]): number => {
  if (flights.length === 0) {
    return 1440;
  }

  const durations = flights.map((flight) => flight.totalDuration);
  return Math.max(...durations);
};

export const getUniqueAirlines = (flights: Flight[]): Array<{ code: string; name: string; count: number }> => {
  const airlineMap = new Map<string, { code: string; name: string; count: number }>();

  flights.forEach((flight) => {
    flight.validatingAirlineCodes.forEach((code) => {
      const airlineName = flight.airlines.find((a) => a === code) || code;
      if (airlineMap.has(code)) {
        const existing = airlineMap.get(code)!;
        airlineMap.set(code, { ...existing, count: existing.count + 1 });
      } else {
        airlineMap.set(code, { code, name: airlineName, count: 1 });
      }
    });
  });

  return Array.from(airlineMap.values()).sort((a, b) => b.count - a.count);
};

export const getStopsDistribution = (flights: Flight[]): { direct: number; oneStop: number; twoPlusStops: number } => {
  return flights.reduce(
    (acc, flight) => {
      if (flight.totalStops === 0) acc.direct++;
      else if (flight.totalStops === 1) acc.oneStop++;
      else acc.twoPlusStops++;
      return acc;
    },
    { direct: 0, oneStop: 0, twoPlusStops: 0 }
  );
};

export const hasActiveFilters = (filters: FilterState): boolean => {
  const { priceRange, stops, airlines, departureTime, arrivalTime, duration } = filters;

  if (priceRange.currentMin !== priceRange.min || priceRange.currentMax !== priceRange.max) {
    return true;
  }

  if (stops.direct || stops.oneStop || stops.twoPlusStops) {
    return true;
  }

  if (airlines.some((a) => a.selected)) {
    return true;
  }

  if (Object.values(departureTime).some((range) => range.selected)) {
    return true;
  }

  if (Object.values(arrivalTime).some((range) => range.selected)) {
    return true;
  }

  if (duration.currentMax !== null && duration.currentMax !== duration.maxDuration) {
    return true;
  }

  return false;
};

export const getActiveFiltersCount = (filters: FilterState): number => {
  return filters.activeFilters.length;
};

export const clearAllFilters = (filters: FilterState): FilterState => {
  return {
    ...filters,
    priceRange: {
      ...filters.priceRange,
      currentMin: filters.priceRange.min,
      currentMax: filters.priceRange.max,
    },
    stops: {
      direct: false,
      oneStop: false,
      twoPlusStops: false,
    },
    airlines: filters.airlines.map((a) => ({ ...a, selected: false })),
    departureTime: {
      earlyMorning: { ...filters.departureTime.earlyMorning, selected: false },
      morning: { ...filters.departureTime.morning, selected: false },
      afternoon: { ...filters.departureTime.afternoon, selected: false },
      evening: { ...filters.departureTime.evening, selected: false },
    },
    arrivalTime: {
      earlyMorning: { ...filters.arrivalTime.earlyMorning, selected: false },
      morning: { ...filters.arrivalTime.morning, selected: false },
      afternoon: { ...filters.arrivalTime.afternoon, selected: false },
      evening: { ...filters.arrivalTime.evening, selected: false },
    },
    duration: {
      ...filters.duration,
      currentMax: null,
    },
    activeFilters: [],
  };
};
