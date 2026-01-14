import { CURRENCY_SYMBOLS, DEFAULT_CURRENCY } from './constants';

export const formatCurrency = (
  amount: number,
  currency: string = DEFAULT_CURRENCY,
  showSymbol: boolean = true
): string => {
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));

  return showSymbol ? `${symbol}${formattedAmount}` : formattedAmount;
};

export const formatCurrencyWithDecimals = (
  amount: number,
  currency: string = DEFAULT_CURRENCY
): string => {
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${symbol}${formattedAmount}`;
};

export const parseCurrency = (value: string): number => {
  const cleaned = value.replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

export const getCurrencySymbol = (currency: string): string => {
  return CURRENCY_SYMBOLS[currency] || currency;
};

export const formatPriceRange = (min: number, max: number, currency: string = DEFAULT_CURRENCY): string => {
  if (min === max) {
    return formatCurrency(min, currency);
  }
  return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`;
};

export const calculatePricePerPerson = (totalPrice: number, passengers: number): number => {
  return passengers > 0 ? totalPrice / passengers : totalPrice;
};

export const formatCompactCurrency = (amount: number, currency: string = DEFAULT_CURRENCY): string => {
  const symbol = CURRENCY_SYMBOLS[currency] || currency;

  if (amount >= 1000000) {
    return `${symbol}${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(1)}K`;
  }
  return formatCurrency(amount, currency);
};

export const calculateDiscount = (originalPrice: number, discountedPrice: number): number => {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

export const formatDiscountPercentage = (originalPrice: number, discountedPrice: number): string => {
  const discount = calculateDiscount(originalPrice, discountedPrice);
  return discount > 0 ? `${discount}% off` : '';
};
