export { amadeusClient } from './amadeus/client';
export {
  transformFlightOffersResponse,
  transformAirportSearchResponse,
  transformAmadeusFlightOffer,
  transformAmadeusLocation,
} from './amadeus/transformers';
export type {
  AmadeusFlightSearchRequest,
  AmadeusLocationSearchRequest,
  AmadeusFlightOffersResponse,
  AmadeusLocationResponse,
} from './amadeus/types';

export { currencyApiClient } from './currency/client';
export {
  fetchExchangeRates,
  fetchUserLocation,
  fetchSupportedCurrencies,
} from './currency/endpoints';
export {
  transformExchangeRates,
  transformLocation,
} from './currency/transformers';
export type {
  ExchangeRateApiResponse,
  LocationApiResponse,
  CurrencyApiError,
  TransformedExchangeRates,
  TransformedLocation,
} from './currency/types';
