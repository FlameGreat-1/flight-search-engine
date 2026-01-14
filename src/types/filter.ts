export interface PriceRangeFilter {
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
}

export interface StopsFilter {
  direct: boolean;
  oneStop: boolean;
  twoPlusStops: boolean;
}

export interface AirlineFilter {
  code: string;
  name: string;
  selected: boolean;
  count: number;
}

export interface TimeRange {
  label: string;
  start: number;
  end: number;
  selected: boolean;
}

export interface DepartureTimeFilter {
  earlyMorning: TimeRange;
  morning: TimeRange;
  afternoon: TimeRange;
  evening: TimeRange;
}

export interface ArrivalTimeFilter {
  earlyMorning: TimeRange;
  morning: TimeRange;
  afternoon: TimeRange;
  evening: TimeRange;
}

export interface DurationFilter {
  maxDuration: number | null;
  currentMax: number | null;
}

export interface ActiveFilter {
  type: 'price' | 'stops' | 'airline' | 'departure' | 'arrival' | 'duration';
  label: string;
  value: string | number;
  id: string;
}

export interface FilterState {
  priceRange: PriceRangeFilter;
  stops: StopsFilter;
  airlines: AirlineFilter[];
  departureTime: DepartureTimeFilter;
  arrivalTime: ArrivalTimeFilter;
  duration: DurationFilter;
  activeFilters: ActiveFilter[];
}

export interface FilterOptions {
  priceRange: {
    min: number;
    max: number;
  };
  availableAirlines: Array<{
    code: string;
    name: string;
    count: number;
  }>;
  maxDuration: number;
  stopsDistribution: {
    direct: number;
    oneStop: number;
    twoPlusStops: number;
  };
}

export interface FilterUpdatePayload {
  type: keyof FilterState;
  value: Partial<FilterState[keyof FilterState]>;
}

export type FilterPreset = 'cheapest' | 'fastest' | 'best' | 'direct';

export interface FilterPresetConfig {
  name: string;
  description: string;
  filters: Partial<FilterState>;
}
