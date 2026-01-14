import { axiosInstance } from '@/lib/axios';
import { AMADEUS_CONFIG, STORAGE_KEYS } from '@/utils/constants';
import {
  AMADEUS_ENDPOINTS,
  buildFlightOffersUrl,
  buildLocationSearchUrl,
  getAuthRequestBody,
} from './endpoints';
import type {
  AmadeusAuthResponse,
  AmadeusFlightOffersResponse,
  AmadeusLocationResponse,
  AmadeusFlightSearchRequest,
  AmadeusLocationSearchRequest,
} from './types';

const getAccessToken = async (): Promise<string> => {
  const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  const tokenExpiry = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);

  if (storedToken && tokenExpiry && Date.now() < parseInt(tokenExpiry, 10)) {
    return storedToken;
  }

  const response = await axiosInstance.post<AmadeusAuthResponse>(
    AMADEUS_ENDPOINTS.AUTH.TOKEN,
    getAuthRequestBody(AMADEUS_CONFIG.API_KEY, AMADEUS_CONFIG.API_SECRET),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  const { access_token, expires_in } = response.data;
  const expiryTime = Date.now() + expires_in * 1000 - 60000;

  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, access_token);
  localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiryTime.toString());

  return access_token;
};

export const searchFlightOffers = async (
  params: AmadeusFlightSearchRequest
): Promise<AmadeusFlightOffersResponse> => {
  const token = await getAccessToken();

  const queryParams: Record<string, string | number | boolean> = {
    originLocationCode: params.originLocationCode,
    destinationLocationCode: params.destinationLocationCode,
    departureDate: params.departureDate,
    adults: params.adults,
  };

  if (params.returnDate) {
    queryParams.returnDate = params.returnDate;
  }

  if (params.children && params.children > 0) {
    queryParams.children = params.children;
  }

  if (params.infants && params.infants > 0) {
    queryParams.infants = params.infants;
  }

  if (params.travelClass) {
    queryParams.travelClass = params.travelClass;
  }

  if (params.nonStop !== undefined) {
    queryParams.nonStop = params.nonStop;
  }

  if (params.currencyCode) {
    queryParams.currencyCode = params.currencyCode;
  }

  if (params.maxPrice) {
    queryParams.maxPrice = params.maxPrice;
  }

  if (params.max) {
    queryParams.max = params.max;
  } else {
    queryParams.max = 250;
  }

  const url = buildFlightOffersUrl(queryParams);

  const response = await axiosInstance.get<AmadeusFlightOffersResponse>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const searchAirports = async (
  params: AmadeusLocationSearchRequest
): Promise<AmadeusLocationResponse> => {
  const token = await getAccessToken();

  const url = buildLocationSearchUrl(params.keyword, params.subType || 'AIRPORT');

  const response = await axiosInstance.get<AmadeusLocationResponse>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const amadeusClient = {
  auth: {
    getAccessToken,
  },
  shopping: {
    searchFlightOffers,
  },
  referenceData: {
    searchAirports,
  },
};
