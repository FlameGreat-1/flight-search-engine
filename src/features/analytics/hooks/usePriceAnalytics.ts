import { useMemo } from 'react';
import { useFilterStore } from '@/store';
import { useCurrency } from '@/features/currency';
import type { PricePoint, PriceTrend } from '@/types';
import {
  calculateAveragePrice,
  calculateMedianPrice,
  identifyBestDeals,
  getPriceCategory,
} from '@/utils/analytics';

export const usePriceAnalytics = () => {
  const { filteredResults, priceData, priceTrend } = useFilterStore();
  const { convertAndFormat } = useCurrency();

  const analytics = useMemo(() => {
    if (filteredResults.length === 0) {
      return {
        average: 0,
        median: 0,
        bestDeals: [],
        distribution: {
          low: 0,
          medium: 0,
          high: 0,
        },
      };
    }

    const average = calculateAveragePrice(filteredResults);
    const median = calculateMedianPrice(filteredResults);
    const bestDeals = identifyBestDeals(filteredResults, 0.85);

    const prices = filteredResults.map((f) => f.price.total);
    const lowest = Math.min(...prices);
    const highest = Math.max(...prices);

    const distribution = filteredResults.reduce(
      (acc, flight) => {
        const category = getPriceCategory(flight.price.total, lowest, highest);
        acc[category]++;
        return acc;
      },
      { low: 0, medium: 0, high: 0 }
    );

    return {
      average,
      median,
      bestDeals,
      distribution,
    };
  }, [filteredResults]);

  const chartData = useMemo((): PricePoint[] => {
    return priceData;
  }, [priceData]);

  const trend = useMemo((): PriceTrend | null => {
    return priceTrend;
  }, [priceTrend]);

  const insights = useMemo(() => {
    if (!trend || filteredResults.length === 0) {
      return [];
    }

    const messages: string[] = [];

    if (trend.trend === 'down') {
      messages.push(`Prices are trending down by ${Math.abs(trend.percentageChange)}%`);
    } else if (trend.trend === 'up') {
      messages.push(`Prices are trending up by ${trend.percentageChange}%`);
    }

    if (analytics.bestDeals.length > 0) {
      messages.push(`${analytics.bestDeals.length} great deals available`);
    }

    const savingsVsAverage = analytics.average - trend.lowest;
    if (savingsVsAverage > 0) {
      messages.push(`Save up to ${convertAndFormat(savingsVsAverage, 'USD')} vs average price`);
    }

    return messages;
  }, [trend, analytics, filteredResults.length, convertAndFormat]);

  return {
    analytics,
    chartData,
    trend,
    insights,
    hasData: filteredResults.length > 0,
  };
};
