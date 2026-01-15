import type {
  ExchangeRateApiResponse,
  LocationApiResponse,
  TransformedExchangeRates,
  TransformedLocation,
} from './types';

export const transformExchangeRates = (data: ExchangeRateApiResponse): TransformedExchangeRates => {
  return {
    base: data.base_code,
    rates: data.conversion_rates,
    timestamp: data.time_last_update_unix * 1000,
  };
};

export const transformLocation = (data: LocationApiResponse): TransformedLocation => {
  return {
    country_code: data.country_code,
    country_name: data.country_name,
    currency: data.currency,
  };
};
