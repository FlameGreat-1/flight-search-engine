import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { FilterStoreState, FilterActions } from '../types';
import { useSearchStore } from './searchSlice';
import {
  applyAllFilters,
  getPriceRange,
  getMaxDuration,
  getUniqueAirlines,
} from '@/utils/filtering';
import { generatePriceData, calculatePriceTrend } from '@/utils/analytics';
import { TIME_RANGES } from '@/utils/constants';

const initialState: FilterStoreState = {
  priceRange: {
    min: 0,
    max: 10000,
    currentMin: 0,
    currentMax: 10000,
  },
  stops: {
    direct: false,
    oneStop: false,
    twoPlusStops: false,
  },
  airlines: [],
  departureTime: {
    earlyMorning: { ...TIME_RANGES.EARLY_MORNING, selected: false },
    morning: { ...TIME_RANGES.MORNING, selected: false },
    afternoon: { ...TIME_RANGES.AFTERNOON, selected: false },
    evening: { ...TIME_RANGES.EVENING, selected: false },
  },
  arrivalTime: {
    earlyMorning: { ...TIME_RANGES.EARLY_MORNING, selected: false },
    morning: { ...TIME_RANGES.MORNING, selected: false },
    afternoon: { ...TIME_RANGES.AFTERNOON, selected: false },
    evening: { ...TIME_RANGES.EVENING, selected: false },
  },
  duration: {
    maxDuration: null,
    currentMax: null,
  },
  activeFilters: [],
  filteredResults: [],
  priceData: [],
  priceTrend: null,
};

export const useFilterStore = create<FilterStoreState & FilterActions>()(
  devtools(
    (set, get) => ({
      ...initialState,

      initializeFilters: (flights) => {
        const priceRange = getPriceRange(flights);
        const maxDuration = getMaxDuration(flights);
        const airlines = getUniqueAirlines(flights);

        set(
          {
            priceRange: {
              min: priceRange.min,
              max: priceRange.max,
              currentMin: priceRange.min,
              currentMax: priceRange.max,
            },
            airlines: airlines.map((airline) => ({
              ...airline,
              selected: false,
            })),
            duration: {
              maxDuration,
              currentMax: null,
            },
            filteredResults: flights,
            priceData: generatePriceData(flights),
            priceTrend: calculatePriceTrend(generatePriceData(flights)),
          },
          false,
          'initializeFilters'
        );
      },

      applyFilters: () => {
        const state = get();
        const searchResults = useSearchStore.getState().results;
        
        const filtered = applyAllFilters(searchResults, state);
        const newPriceData = generatePriceData(filtered);
        const newPriceTrend = calculatePriceTrend(newPriceData);

        set(
          {
            filteredResults: filtered,
            priceData: newPriceData,
            priceTrend: newPriceTrend,
          },
          false,
          'applyFilters'
        );
      },

      updatePriceRange: (min, max) => {
        const state = get();
        const activeFilters = state.activeFilters.filter((f) => f.type !== 'price');

        if (min !== state.priceRange.min || max !== state.priceRange.max) {
          activeFilters.push({
            type: 'price',
            label: 'Price Range',
            value: `$${min} - $${max}`,
            id: 'price-range',
          });
        }

        set(
          {
            priceRange: { ...state.priceRange, currentMin: min, currentMax: max },
            activeFilters,
          },
          false,
          'updatePriceRange'
        );

        get().applyFilters();
      },

      toggleStops: (stops) => {
        const state = get();
        const newStops = { ...state.stops, [stops]: !state.stops[stops] };
        const activeFilters = state.activeFilters.filter((f) => f.type !== 'stops');

        const stopsLabels = [];
        if (newStops.direct) stopsLabels.push('Direct');
        if (newStops.oneStop) stopsLabels.push('1 Stop');
        if (newStops.twoPlusStops) stopsLabels.push('2+ Stops');

        if (stopsLabels.length > 0) {
          activeFilters.push({
            type: 'stops',
            label: 'Stops',
            value: stopsLabels.join(', '),
            id: 'stops-filter',
          });
        }

        set({ stops: newStops, activeFilters }, false, 'toggleStops');
        get().applyFilters();
      },

      toggleAirline: (airlineCode) => {
        const state = get();
        const airlines = state.airlines.map((airline) =>
          airline.code === airlineCode ? { ...airline, selected: !airline.selected } : airline
        );

        const activeFilters = state.activeFilters.filter((f) => f.type !== 'airline');
        const selectedAirlines = airlines.filter((a) => a.selected);

        selectedAirlines.forEach((airline) => {
          activeFilters.push({
            type: 'airline',
            label: airline.name,
            value: airline.code,
            id: `airline-${airline.code}`,
          });
        });

        set({ airlines, activeFilters }, false, 'toggleAirline');
        get().applyFilters();
      },

      toggleDepartureTime: (timeRange) => {
        const state = get();
        const key = timeRange as keyof typeof state.departureTime;
        const newDepartureTime = {
          ...state.departureTime,
          [key]: { ...state.departureTime[key], selected: !state.departureTime[key].selected },
        };

        const activeFilters = state.activeFilters.filter((f) => f.type !== 'departure');
        const selectedTimes = Object.entries(newDepartureTime)
          .filter(([, range]) => range.selected)
          .map(([, range]) => range.label);

        if (selectedTimes.length > 0) {
          activeFilters.push({
            type: 'departure',
            label: 'Departure Time',
            value: selectedTimes.join(', '),
            id: 'departure-time',
          });
        }

        set({ departureTime: newDepartureTime, activeFilters }, false, 'toggleDepartureTime');
        get().applyFilters();
      },

      toggleArrivalTime: (timeRange) => {
        const state = get();
        const key = timeRange as keyof typeof state.arrivalTime;
        const newArrivalTime = {
          ...state.arrivalTime,
          [key]: { ...state.arrivalTime[key], selected: !state.arrivalTime[key].selected },
        };

        const activeFilters = state.activeFilters.filter((f) => f.type !== 'arrival');
        const selectedTimes = Object.entries(newArrivalTime)
          .filter(([, range]) => range.selected)
          .map(([, range]) => range.label);

        if (selectedTimes.length > 0) {
          activeFilters.push({
            type: 'arrival',
            label: 'Arrival Time',
            value: selectedTimes.join(', '),
            id: 'arrival-time',
          });
        }

        set({ arrivalTime: newArrivalTime, activeFilters }, false, 'toggleArrivalTime');
        get().applyFilters();
      },

      setMaxDuration: (duration) => {
        const state = get();
        const activeFilters = state.activeFilters.filter((f) => f.type !== 'duration');

        if (duration !== null) {
          activeFilters.push({
            type: 'duration',
            label: 'Max Duration',
            value: `${Math.floor(duration / 60)}h ${duration % 60}m`,
            id: 'max-duration',
          });
        }

        set(
          {
            duration: { ...state.duration, currentMax: duration },
            activeFilters,
          },
          false,
          'setMaxDuration'
        );

        get().applyFilters();
      },

      removeFilter: (filterId) => {
        const state = get();
        const filter = state.activeFilters.find((f) => f.id === filterId);

        if (!filter) return;

        const updates: Partial<FilterStoreState> = {
          activeFilters: state.activeFilters.filter((f) => f.id !== filterId),
        };

        if (filter.type === 'price') {
          updates.priceRange = {
            ...state.priceRange,
            currentMin: state.priceRange.min,
            currentMax: state.priceRange.max,
          };
        } else if (filter.type === 'stops') {
          updates.stops = { direct: false, oneStop: false, twoPlusStops: false };
        } else if (filter.type === 'airline') {
          updates.airlines = state.airlines.map((a) =>
            a.code === filter.value ? { ...a, selected: false } : a
          );
        } else if (filter.type === 'duration') {
          updates.duration = { ...state.duration, currentMax: null };
        }

        set(updates, false, 'removeFilter');
        get().applyFilters();
      },

      clearAllFilters: () => {
        const state = get();
        set(
          {
            priceRange: {
              ...state.priceRange,
              currentMin: state.priceRange.min,
              currentMax: state.priceRange.max,
            },
            stops: { direct: false, oneStop: false, twoPlusStops: false },
            airlines: state.airlines.map((a) => ({ ...a, selected: false })),
            departureTime: {
              earlyMorning: { ...state.departureTime.earlyMorning, selected: false },
              morning: { ...state.departureTime.morning, selected: false },
              afternoon: { ...state.departureTime.afternoon, selected: false },
              evening: { ...state.departureTime.evening, selected: false },
            },
            arrivalTime: {
              earlyMorning: { ...state.arrivalTime.earlyMorning, selected: false },
              morning: { ...state.arrivalTime.morning, selected: false },
              afternoon: { ...state.arrivalTime.afternoon, selected: false },
              evening: { ...state.arrivalTime.evening, selected: false },
            },
            duration: { ...state.duration, currentMax: null },
            activeFilters: [],
          },
          false,
          'clearAllFilters'
        );

        get().applyFilters();
      },
    }),
    { name: 'FilterStore' }
  )
);
