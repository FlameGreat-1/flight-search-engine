import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib';
import { router } from './router';
import { useCurrencyStore } from '@/store';

export const App = () => {
  const { detectUserCurrency, fetchExchangeRates } = useCurrencyStore();

  useEffect(() => {
    const initializeCurrency = async () => {
      try {
        await detectUserCurrency();
      } catch {
        await fetchExchangeRates();
      }
    };

    initializeCurrency();
  }, [detectUserCurrency, fetchExchangeRates]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
