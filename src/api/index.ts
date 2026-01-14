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
