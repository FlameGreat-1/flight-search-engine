import { useMemo } from 'react';
import { usePriceAnalytics } from '@/features/analytics';
import type { PricePoint } from '@/types';

export const usePriceGraphData = () => {
  const { chartData, trend, insights, hasData } = usePriceAnalytics();

  const formattedData = useMemo(() => {
    return chartData.map((point) => ({
      ...point,
      displayPrice: `$${point.price}`,
      displayCount: `${point.count} flight${point.count !== 1 ? 's' : ''}`,
    }));
  }, [chartData]);

  const priceRange = useMemo(() => {
    if (chartData.length === 0) {
      return { min: 0, max: 1000 };
    }

    const prices = chartData.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.1;

    return {
      min: Math.max(0, Math.floor(min - padding)),
      max: Math.ceil(max + padding),
    };
  }, [chartData]);

  const averagePrice = useMemo(() => {
    if (chartData.length === 0) return 0;
    const total = chartData.reduce((sum, point) => sum + point.price, 0);
    return Math.round(total / chartData.length);
  }, [chartData]);

  const lowestPrice = useMemo(() => {
    if (chartData.length === 0) return 0;
    return Math.min(...chartData.map((p) => p.price));
  }, [chartData]);

  return {
    data: formattedData,
    priceRange,
    averagePrice,
    lowestPrice,
    trend,
    insights,
    hasData,
    isEmpty: chartData.length === 0,
  };
};
