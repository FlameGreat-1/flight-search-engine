import { AMADEUS_CONFIG } from '@/utils/constants';

export const AMADEUS_ENDPOINTS = {
  AUTH: {
    TOKEN: `${AMADEUS_CONFIG.TOKEN_ENDPOINT}`,
  },
  SHOPPING: {
    FLIGHT_OFFERS: `${AMADEUS_CONFIG.FLIGHT_OFFERS_ENDPOINT}`,
  },
  REFERENCE_DATA: {
    LOCATIONS: `${AMADEUS_CONFIG.LOCATION_ENDPOINT}`,
  },
} as const;

export const buildFlightOffersUrl = (params: Record<string, string | number | boolean>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  return `${AMADEUS_ENDPOINTS.SHOPPING.FLIGHT_OFFERS}?${searchParams.toString()}`;
};

export const buildLocationSearchUrl = (keyword: string, subType?: string): string => {
  const searchParams = new URLSearchParams({
    keyword,
    'page[limit]': '10',
  });

  if (subType) {
    searchParams.append('subType', subType);
  }

  return `${AMADEUS_ENDPOINTS.REFERENCE_DATA.LOCATIONS}?${searchParams.toString()}`;
};

export const getAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

export const getAuthRequestBody = (clientId: string, clientSecret: string) => {
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  });

  return params.toString();
};
