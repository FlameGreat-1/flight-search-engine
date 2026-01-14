import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@/hooks';
import { amadeusClient, transformAirportSearchResponse } from '@/api';
import { queryKeys } from '@/lib';
import { SEARCH_CONSTRAINTS } from '@/utils/constants';
import type { Airport } from '@/types';

export const useAirportSearch = (initialKeyword: string = '') => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const debouncedKeyword = useDebounce(keyword, SEARCH_CONSTRAINTS.DEBOUNCE_DELAY);

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.airports(debouncedKeyword),
    queryFn: async () => {
      const response = await amadeusClient.referenceData.searchAirports({
        keyword: debouncedKeyword,
        subType: 'AIRPORT',
      });
      return transformAirportSearchResponse(response.data);
    },
    enabled: debouncedKeyword.length >= SEARCH_CONSTRAINTS.MIN_KEYWORD_LENGTH,
    staleTime: 5 * 60 * 1000,
  });

  const updateKeyword = useCallback((value: string) => {
    setKeyword(value);
  }, []);

  const clearKeyword = useCallback(() => {
    setKeyword('');
  }, []);

  return {
    keyword,
    updateKeyword,
    clearKeyword,
    airports: data || [],
    isLoading: isLoading && debouncedKeyword.length >= SEARCH_CONSTRAINTS.MIN_KEYWORD_LENGTH,
    error: error?.message || null,
  };
};
