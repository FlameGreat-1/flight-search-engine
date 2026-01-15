import { QueryClient, DefaultOptions } from '@tanstack/react-query';
import { QUERY_STALE_TIME } from '@/utils/constants';
import type { ApiError } from '@/types';

const queryConfig: DefaultOptions = {
  queries: {
    staleTime: QUERY_STALE_TIME.FLIGHT_OFFERS,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
    retry: (failureCount, error) => {
      const apiError = error as ApiError;
      if (apiError.status === 401 || apiError.status === 403 || apiError.status === 404) {
        return false;
      }
      return failureCount < 1;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    networkMode: 'online',
  },
  mutations: {
    retry: false,
    networkMode: 'online',
    onError: (error) => {
      console.error('Mutation error:', error);
    },
  },
};

export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: queryConfig,
  });
};

export const queryClient = createQueryClient();
