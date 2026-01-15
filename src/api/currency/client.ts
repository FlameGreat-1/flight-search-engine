import axios, { AxiosInstance } from 'axios';

const EXCHANGE_RATE_BASE_URL = 'https://v6.exchangerate-api.com/v6';
const LOCATION_BASE_URL = 'https://ipapi.co';
const EXCHANGE_RATE_API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY || 'free';

class CurrencyApiClient {
  private exchangeRateClient: AxiosInstance;
  private locationClient: AxiosInstance;

  constructor() {
    this.exchangeRateClient = axios.create({
      baseURL: EXCHANGE_RATE_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.locationClient = axios.create({
      baseURL: LOCATION_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.exchangeRateClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        if (error.response?.status === 403) {
          throw new Error('Invalid API key or access denied.');
        }
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timeout. Please check your connection.');
        }
        throw error;
      }
    );

    this.locationClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        }
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timeout. Please check your connection.');
        }
        throw error;
      }
    );
  }

  getExchangeRateClient(): AxiosInstance {
    return this.exchangeRateClient;
  }

  getLocationClient(): AxiosInstance {
    return this.locationClient;
  }

  getApiKey(): string {
    return EXCHANGE_RATE_API_KEY;
  }
}

export const currencyApiClient = new CurrencyApiClient();
