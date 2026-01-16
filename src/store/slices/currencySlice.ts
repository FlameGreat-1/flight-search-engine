import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CurrencyState, ExchangeRates, LocationData } from '@/types';
import { DEFAULT_CURRENCY } from '@/types/currency';
import { getExchangeRates, getUserLocation } from '@/utils/exchangeRates';

interface CurrencyActions {
  setSelectedCurrency: (currency: string) => void;
  setExchangeRates: (rates: ExchangeRates) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  fetchExchangeRates: (baseCurrency?: string) => Promise<void>;
  detectUserCurrency: () => Promise<void>;
  updateExchangeRates: () => Promise<void>;
  resetCurrency: () => void;
}

type CurrencyStore = CurrencyState & CurrencyActions;

const initialState: CurrencyState = {
  selectedCurrency: DEFAULT_CURRENCY,
  exchangeRates: null,
  isLoading: false,
  error: null,
  lastUpdated: null,
};

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSelectedCurrency: (currency: string) => {
        set({ selectedCurrency: currency, error: null });
        get().fetchExchangeRates('USD');
      },

      setExchangeRates: (rates: ExchangeRates) => {
        set({
          exchangeRates: rates,
          lastUpdated: Date.now(),
          error: null,
        });
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      setError: (error: string | null) => {
        set({ error, isLoading: false });
      },

      fetchExchangeRates: async (baseCurrency?: string) => {
        const currency = baseCurrency || 'USD';
        
        set({ isLoading: true, error: null });

        try {
          const rates = await getExchangeRates(currency);
          set({
            exchangeRates: rates,
            lastUpdated: Date.now(),
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch exchange rates';
          set({
            error: errorMessage,
            isLoading: false,
          });
        }
      },

      detectUserCurrency: async () => {
        set({ isLoading: true, error: null });

        try {
          const location: LocationData = await getUserLocation();
          const detectedCurrency = location.currency || DEFAULT_CURRENCY;
          
          set({ selectedCurrency: detectedCurrency });
          await get().fetchExchangeRates('USD');
        } catch (error) {
          set({
            selectedCurrency: DEFAULT_CURRENCY,
            error: null,
            isLoading: false,
          });
          await get().fetchExchangeRates('USD');
        }
      },

      updateExchangeRates: async () => {
        const { lastUpdated } = get();
        const oneDay = 24 * 60 * 60 * 1000;
        
        if (lastUpdated && Date.now() - lastUpdated < oneDay) {
          return;
        }

        await get().fetchExchangeRates('USD');
      },

      resetCurrency: () => {
        set({
          ...initialState,
          exchangeRates: null,
          lastUpdated: null,
        });
      },
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({
        selectedCurrency: state.selectedCurrency,
        exchangeRates: state.exchangeRates,
        lastUpdated: state.lastUpdated,
      }),
    }
  )
);
