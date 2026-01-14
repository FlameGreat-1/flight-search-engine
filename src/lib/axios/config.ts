import axios, { AxiosInstance } from 'axios';
import { AMADEUS_CONFIG, APP_CONFIG } from '@/utils/constants';

export const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: AMADEUS_CONFIG.API_URL,
    timeout: APP_CONFIG.API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return instance;
};

export const axiosInstance = createAxiosInstance();
