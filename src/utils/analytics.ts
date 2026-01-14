import type { Flight, PricePoint, PriceTrend } from '@/types';
import { formatDateForAPI } from './date';

export const calculatePriceTrend = (priceData: PricePoint[]): PriceTrend | null => {
  if (priceData.length < 2) {
    return null;
  }

  const prices = priceData.map((p) => p.price);
  const average = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);

  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];
  const percentageChange = ((lastPrice - firstPrice) / firstPrice) * 100;

  let trend: 'up' | 'down' | 'stable' = 'stable';
  if (percentageChange > 5) trend = 'up';
  else if (percentageChange < -5) trend = 'down';

  return {
    average: Math.round(average),
    lowest,
    highest,
    trend,
    percentageChange: Math.round(percentageChange * 10) / 10,
  };
};

export const generatePriceData = (flights: Flight[]): PricePoint[] => {
  const priceMap = new Map<string, { total: number; count: number }>();

  flights.forEach((flight) => {
    const date = formatDateForAPI(flight.departureDate);
    const existing = priceMap.get(date);

    if (existing) {
      priceMap.set(date, {
        total: existing.total + flight.price.total,
        count: existing.count + 1,
      });
    } else {
      priceMap.set(date, {
        total: flight.price.total,
        count: 1,
      });
    }
  });

  return Array.from(priceMap.entries())
    .map(([date, data]) => ({
      date,
      price: Math.round(data.total / data.count),
      count: data.count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
};

export const calculateAveragePrice = (flights: Flight[]): number => {
  if (flights.length === 0) return 0;
  const total = flights.reduce((sum, flight) => sum + flight.price.total, 0);
  return Math.round(total / flights.length);
};

export const calculateMedianPrice = (flights: Flight[]): number => {
  if (flights.length === 0) return 0;

  const prices = flights.map((f) => f.price.total).sort((a, b) => a - b);
  const mid = Math.floor(prices.length / 2);

  return prices.length % 2 === 0 ? (prices[mid - 1] + prices[mid]) / 2 : prices[mid];
};

export const calculatePricePercentile = (flights: Flight[], percentile: number): number => {
  if (flights.length === 0) return 0;

  const prices = flights.map((f) => f.price.total).sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * prices.length) - 1;

  return prices[Math.max(0, index)];
};

export const identifyBestDeals = (flights: Flight[], threshold: number = 0.8): Flight[] => {
  const average = calculateAveragePrice(flights);
  const dealThreshold = average * threshold;

  return flights.filter((flight) => flight.price.total <= dealThreshold);
};

export const calculatePriceSavings = (currentPrice: number, averagePrice: number): number => {
  return Math.round(averagePrice - currentPrice);
};

export const calculateSavingsPercentage = (currentPrice: number, averagePrice: number): number => {
  if (averagePrice === 0) return 0;
  return Math.round(((averagePrice - currentPrice) / averagePrice) * 100);
};

export const isGoodDeal = (price: number, averagePrice: number, threshold: number = 0.9): boolean => {
  return price <= averagePrice * threshold;
};

export const getPriceCategory = (price: number, lowest: number, highest: number): 'low' | 'medium' | 'high' => {
  const range = highest - lowest;
  const lowThreshold = lowest + range * 0.33;
  const highThreshold = lowest + range * 0.67;

  if (price <= lowThreshold) return 'low';
  if (price <= highThreshold) return 'medium';
  return 'high';
};

export const calculateDurationEfficiency = (flight: Flight): number => {
  const directDuration = flight.itineraries[0].segments[0].duration;
  const actualDuration = flight.totalDuration;
  return Math.round((directDuration / actualDuration) * 100);
};

export const calculateValueScore = (flight: Flight, averagePrice: number, averageDuration: number): number => {
  const priceScore = (1 - flight.price.total / (averagePrice * 2)) * 50;
  const durationScore = (1 - flight.totalDuration / (averageDuration * 2)) * 30;
  const stopsScore = flight.totalStops === 0 ? 20 : flight.totalStops === 1 ? 10 : 0;

  return Math.max(0, Math.min(100, Math.round(priceScore + durationScore + stopsScore)));
};

export const groupPricesByRange = (flights: Flight[], rangeSize: number = 100): Record<string, number> => {
  const ranges: Record<string, number> = {};

  flights.forEach((flight) => {
    const price = flight.price.total;
    const rangeStart = Math.floor(price / rangeSize) * rangeSize;
    const rangeEnd = rangeStart + rangeSize;
    const key = `${rangeStart}-${rangeEnd}`;

    ranges[key] = (ranges[key] || 0) + 1;
  });

  return ranges;
};
