import { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { STORAGE_KEYS, ERROR_MESSAGES } from '@/utils/constants';
import type { ApiError, AmadeusError } from '@/types';

interface AmadeusErrorResponse {
  errors?: AmadeusError[];
  message?: string;
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch {
    return null;
  }
};

const isTokenExpired = (): boolean => {
  try {
    const expiry = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
    if (!expiry) return true;
    return Date.now() >= parseInt(expiry, 10);
  } catch {
    return true;
  }
};

export const setupInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (config.url?.includes('/oauth2/token')) {
        return config;
      }

      const token = getStoredToken();

      if (token && !isTokenExpired()) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError<AmadeusErrorResponse>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return instance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRY);
          processQueue(null, null);
          return Promise.reject(createApiError(error));
        } catch (refreshError) {
          processQueue(error, null);
          return Promise.reject(createApiError(error));
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(createApiError(error));
    }
  );
};

const createApiError = (error: AxiosError<AmadeusErrorResponse>): ApiError => {
  if (error.response) {
    const data = error.response.data;

    if (data?.errors && Array.isArray(data.errors)) {
      return {
        message: data.errors[0]?.title || ERROR_MESSAGES.API_ERROR,
        code: data.errors[0]?.code?.toString(),
        status: error.response.status,
        details: data.errors,
      };
    }

    return {
      message: data?.message || ERROR_MESSAGES.API_ERROR,
      status: error.response.status,
    };
  }

  if (error.request) {
    return {
      message: ERROR_MESSAGES.NETWORK_ERROR,
      code: 'NETWORK_ERROR',
    };
  }

  return {
    message: error.message || ERROR_MESSAGES.GENERIC_ERROR,
  };
};
