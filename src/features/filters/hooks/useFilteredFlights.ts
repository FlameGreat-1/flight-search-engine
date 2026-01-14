import { useMemo } from 'react';
import { useFilterStore, useUIStore } from '@/store';
import { sortFlights } from '@/utils/sorting';

export const useFilteredFlights = () => {
  const { filteredResults, priceData, priceTrend } = useFilterStore();
  const { sortBy } = useUIStore();

  const sortedFlights = useMemo(() => {
    return sortFlights(filteredResults, sortBy);
  }, [filteredResults, sortBy]);

  const stats = useMemo(() => {
    if (filteredResults.length === 0) {
      return {
        count: 0,
        lowestPrice: 0,
        highestPrice: 0,
        averagePrice: 0,
      };
    }

    const prices = filteredResults.map((f) => f.price.total);
    const total = prices.reduce((sum, price) => sum + price, 0);

    return {
      count: filteredResults.length,
      lowestPrice: Math.min(...prices),
      highestPrice: Math.max(...prices),
      averagePrice: Math.round(total / filteredResults.length),
    };
  }, [filteredResults]);

  return {
    flights: sortedFlights,
    priceData,
    priceTrend,
    stats,
    isEmpty: filteredResults.length === 0,
  };
};
