import { useFilterStore } from '@/store';
import { useCallback } from 'react';

export const useFlightFilters = () => {
  const {
    priceRange,
    stops,
    airlines,
    departureTime,
    arrivalTime,
    duration,
    activeFilters,
    updatePriceRange,
    toggleStops,
    toggleAirline,
    toggleDepartureTime,
    toggleArrivalTime,
    setMaxDuration,
    removeFilter,
    clearAllFilters,
  } = useFilterStore();

  const handlePriceChange = useCallback(
    (min: number, max: number) => {
      updatePriceRange(min, max);
    },
    [updatePriceRange]
  );

  const handleStopsToggle = useCallback(
    (stops: 'direct' | 'oneStop' | 'twoPlusStops') => {
      toggleStops(stops);
    },
    [toggleStops]
  );

  const handleAirlineToggle = useCallback(
    (airlineCode: string) => {
      toggleAirline(airlineCode);
    },
    [toggleAirline]
  );

  const handleDepartureTimeToggle = useCallback(
    (timeRange: string) => {
      toggleDepartureTime(timeRange);
    },
    [toggleDepartureTime]
  );

  const handleArrivalTimeToggle = useCallback(
    (timeRange: string) => {
      toggleArrivalTime(timeRange);
    },
    [toggleArrivalTime]
  );

  const handleDurationChange = useCallback(
    (maxDuration: number | null) => {
      setMaxDuration(maxDuration);
    },
    [setMaxDuration]
  );

  const handleRemoveFilter = useCallback(
    (filterId: string) => {
      removeFilter(filterId);
    },
    [removeFilter]
  );

  const handleClearAll = useCallback(() => {
    clearAllFilters();
  }, [clearAllFilters]);

  return {
    filters: {
      priceRange,
      stops,
      airlines,
      departureTime,
      arrivalTime,
      duration,
    },
    activeFilters,
    actions: {
      updatePrice: handlePriceChange,
      toggleStops: handleStopsToggle,
      toggleAirline: handleAirlineToggle,
      toggleDepartureTime: handleDepartureTimeToggle,
      toggleArrivalTime: handleArrivalTimeToggle,
      updateDuration: handleDurationChange,
      removeFilter: handleRemoveFilter,
      clearAll: handleClearAll,
    },
  };
};
