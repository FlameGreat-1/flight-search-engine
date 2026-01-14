import { useCallback } from 'react';
import { useLocalStorage } from '@/hooks';
import type { SearchHistoryItem, FlightSearchCriteria } from '@/types';
import { STORAGE_KEYS } from '@/utils/constants';

const MAX_HISTORY_ITEMS = 10;

export const useSearchHistory = () => {
  const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>(
    STORAGE_KEYS.SEARCH_HISTORY,
    []
  );

  const addToHistory = useCallback(
    (criteria: FlightSearchCriteria) => {
      if (!criteria.origin || !criteria.destination || !criteria.departureDate) {
        return;
      }

      const newItem: SearchHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        origin: criteria.origin,
        destination: criteria.destination,
        departureDate: criteria.departureDate,
        returnDate: criteria.returnDate,
        tripType: criteria.tripType,
        passengers: {
          adults: criteria.adults,
          children: criteria.children,
          infants: criteria.infants,
        },
        cabinClass: criteria.cabinClass,
        searchedAt: new Date(),
      };

      setHistory((prev) => {
        const filtered = prev.filter(
          (item) =>
            !(
              item.origin.iataCode === newItem.origin.iataCode &&
              item.destination.iataCode === newItem.destination.iataCode &&
              item.departureDate.getTime() === newItem.departureDate.getTime()
            )
        );

        return [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      });
    },
    [setHistory]
  );

  const removeFromHistory = useCallback(
    (id: string) => {
      setHistory((prev) => prev.filter((item) => item.id !== id));
    },
    [setHistory]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const getRecentSearches = useCallback(
    (limit: number = 5) => {
      return history.slice(0, limit);
    },
    [history]
  );

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getRecentSearches,
  };
};
