import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { UIState, UIActions } from '../types';
import type { SortOption } from '@/types';

const initialState: UIState = {
  sortBy: 'price-asc',
  isMobileFilterOpen: false,
  selectedFlightId: null,
};

export const useUIStore = create<UIState & UIActions>()(
  devtools(
    (set) => ({
      ...initialState,

      setSortBy: (sortBy: SortOption) =>
        set(
          {
            sortBy,
          },
          false,
          'setSortBy'
        ),

      toggleMobileFilter: () =>
        set(
          (state) => ({
            isMobileFilterOpen: !state.isMobileFilterOpen,
          }),
          false,
          'toggleMobileFilter'
        ),

      setSelectedFlight: (flightId: string | null) =>
        set(
          {
            selectedFlightId: flightId,
          },
          false,
          'setSelectedFlight'
        ),
    }),
    { name: 'UIStore' }
  )
);
