import { currencyApiClient } from './client';
import { transformExchangeRates, transformLocation } from './transformers';
import type {
  ExchangeRateApiResponse,
  LocationApiResponse,
  TransformedExchangeRates,
  TransformedLocation,
} from './types';

export const fetchExchangeRates = async (baseCurrency: string = 'USD'): Promise<TransformedExchangeRates> => {
  const client = currencyApiClient.getExchangeRateClient();
  const apiKey = currencyApiClient.getApiKey();
  
  const endpoint = apiKey === 'free' 
    ? `/latest/${baseCurrency}`
    : `/${apiKey}/latest/${baseCurrency}`;

  const { data } = await client.get<ExchangeRateApiResponse>(endpoint);

  if (data.result !== 'success') {
    throw new Error('Failed to fetch exchange rates');
  }

  return transformExchangeRates(data);
};

export const fetchUserLocation = async (): Promise<TransformedLocation> => {
  const client = currencyApiClient.getLocationClient();
  
  const { data } = await client.get<LocationApiResponse>('/json/');

  if (!data.currency || !data.country_code) {
    throw new Error('Failed to detect location');
  }

  return transformLocation(data);
};

export const fetchSupportedCurrencies = async (): Promise<string[]> => {
  const rates = await fetchExchangeRates('USD');
  return Object.keys(rates.rates);
};
