import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { SearchState, SearchActions } from '../types';
import type { FlightSearchCriteria } from '@/types';

const initialCriteria: FlightSearchCriteria = {
  origin: null,
  destination: null,
  departureDate: null,
  returnDate: null,
  tripType: 'round-trip',
  adults: 1,
  children: 0,
  infants: 0,
  cabinClass: 'ECONOMY',
};

const initialState: SearchState = {
  criteria: initialCriteria,
  results: [],
  isLoading: false,
  error: null,
  hasSearched: false,
};

export const useSearchStore = create<SearchState & SearchActions>()(
  devtools(
    (set) => ({
      ...initialState,

      setCriteria: (criteria) =>
        set(
          (state) => ({
            criteria: { ...state.criteria, ...criteria },
          }),
          false,
          'setCriteria'
        ),

      setResults: (results) =>
        set(
          {
            results,
            isLoading: false,
            error: null,
            hasSearched: true,
          },
          false,
          'setResults'
        ),

      setLoading: (isLoading) =>
        set(
          {
            isLoading,
            error: isLoading ? null : undefined,
          },
          false,
          'setLoading'
        ),

      setError: (error) =>
        set(
          {
            error,
            isLoading: false,
          },
          false,
          'setError'
        ),

      resetSearch: () =>
        set(
          {
            ...initialState,
            criteria: initialCriteria,
          },
          false,
          'resetSearch'
        ),
    }),
    { name: 'SearchStore' }
  )
);
