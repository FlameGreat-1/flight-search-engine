import { fetchExchangeRates, fetchUserLocation } from '@/api';
import type { ExchangeRates, LocationData } from '@/types';
import { CACHE_DURATION, DEFAULT_CURRENCY } from '@/types/currency';

const EXCHANGE_RATES_KEY = 'exchange_rates';
const LOCATION_KEY = 'user_location';

export const getExchangeRates = async (baseCurrency: string = DEFAULT_CURRENCY): Promise<ExchangeRates> => {
  const cached = getCachedRates(baseCurrency);
  if (cached) return cached;

  const rates = await fetchExchangeRates(baseCurrency);
  cacheRates(rates);
  return rates;
};

export const getUserLocation = async (): Promise<LocationData> => {
  const cached = getCachedLocation();
  if (cached) return cached;

  const location = await fetchUserLocation();
  cacheLocation(location);
  return location;
};

export const getCachedRates = (baseCurrency: string): ExchangeRates | null => {
  try {
    const cached = localStorage.getItem(`${EXCHANGE_RATES_KEY}_${baseCurrency}`);
    if (!cached) return null;

    const data: ExchangeRates = JSON.parse(cached);
    const isExpired = Date.now() - data.timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(`${EXCHANGE_RATES_KEY}_${baseCurrency}`);
      return null;
    }

    return data;
  } catch {
    return null;
  }
};

export const getCachedLocation = (): LocationData | null => {
  try {
    const cached = localStorage.getItem(LOCATION_KEY);
    if (!cached) return null;

    return JSON.parse(cached);
  } catch {
    return null;
  }
};

export const cacheRates = (rates: ExchangeRates): void => {
  try {
    localStorage.setItem(`${EXCHANGE_RATES_KEY}_${rates.base}`, JSON.stringify(rates));
  } catch (error) {
    console.error('Failed to cache exchange rates:', error);
  }
};

export const cacheLocation = (location: LocationData): void => {
  try {
    localStorage.setItem(LOCATION_KEY, JSON.stringify(location));
  } catch (error) {
    console.error('Failed to cache location:', error);
  }
};

export const clearRatesCache = (): void => {
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(EXCHANGE_RATES_KEY)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Failed to clear rates cache:', error);
  }
};

export const getExchangeRate = async (from: string, to: string): Promise<number> => {
  if (from === to) return 1;

  const rates = await getExchangeRates(from);
  const rate = rates.rates[to];

  if (!rate) {
    throw new Error(`Exchange rate not found for ${from} to ${to}`);
  }

  return rate;
};
