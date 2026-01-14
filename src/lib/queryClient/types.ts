import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ApiError } from '@/types';

export type QueryConfig<TData = unknown> = Omit<
  UseQueryOptions<TData, ApiError>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, ApiError, TVariables>,
  'mutationFn'
>;

export interface QueryKeys {
  flightOffers: (params: string) => readonly [string, string];
  airports: (keyword: string) => readonly [string, string];
  authToken: readonly [string];
}

export const queryKeys: QueryKeys = {
  flightOffers: (params: string) => ['flightOffers', params] as const,
  airports: (keyword: string) => ['airports', keyword] as const,
  authToken: ['authToken'] as const,
};
