import { useMemo } from 'react';
import { useCurrencyStore } from '@/store';
import {
  convertPrice,
  formatCurrency,
//   convertAndFormat,
  getCurrencySymbol,
  getCurrencyInfo,
  formatPriceRange,
  formatCompactCurrency,
} from '@/utils/currency';
import { DEFAULT_CURRENCY } from '@/types/currency';

export const useCurrency = () => {
  const {
    selectedCurrency,
    exchangeRates,
    isLoading,
    error,
    setSelectedCurrency,
    fetchExchangeRates,
    updateExchangeRates,
  } = useCurrencyStore();

  const currentRate = useMemo(() => {
    if (!exchangeRates || selectedCurrency === exchangeRates.base) {
      return 1;
    }
    return exchangeRates.rates[selectedCurrency] || 1;
  }, [exchangeRates, selectedCurrency]);

  const convert = useMemo(
    () => (amount: number, fromCurrency: string = DEFAULT_CURRENCY) => {
      if (!exchangeRates) return amount;
      
      if (fromCurrency === selectedCurrency) return amount;
      
      const fromRate = exchangeRates.rates[fromCurrency] || 1;
      const toRate = exchangeRates.rates[selectedCurrency] || 1;
      
      const amountInBase = amount / fromRate;
      return convertPrice(amountInBase, toRate);
    },
    [exchangeRates, selectedCurrency]
  );

  const format = useMemo(
    () => (amount: number, currency?: string) => {
      return formatCurrency(amount, currency || selectedCurrency);
    },
    [selectedCurrency]
  );

  const convertAndFormatPrice = useMemo(
    () => (amount: number, fromCurrency: string = DEFAULT_CURRENCY) => {
      const converted = convert(amount, fromCurrency);
      return format(converted);
    },
    [convert, format]
  );

  const formatRange = useMemo(
    () => (min: number, max: number, fromCurrency: string = DEFAULT_CURRENCY) => {
      const convertedMin = convert(min, fromCurrency);
      const convertedMax = convert(max, fromCurrency);
      return formatPriceRange(convertedMin, convertedMax, selectedCurrency);
    },
    [convert, selectedCurrency]
  );

  const formatCompact = useMemo(
    () => (amount: number, fromCurrency: string = DEFAULT_CURRENCY) => {
      const converted = convert(amount, fromCurrency);
      return formatCompactCurrency(converted, selectedCurrency);
    },
    [convert, selectedCurrency]
  );

  const currencyInfo = useMemo(
    () => getCurrencyInfo(selectedCurrency),
    [selectedCurrency]
  );

  const symbol = useMemo(
    () => getCurrencySymbol(selectedCurrency),
    [selectedCurrency]
  );

  const changeCurrency = (currency: string) => {
    if (currency !== selectedCurrency) {
      setSelectedCurrency(currency);
    }
  };

  const refresh = async () => {
    await updateExchangeRates();
  };

  return {
    selectedCurrency,
    exchangeRates,
    isLoading,
    error,
    currentRate,
    symbol,
    currencyInfo,
    convert,
    format,
    convertAndFormat: convertAndFormatPrice,
    formatRange,
    formatCompact,
    changeCurrency,
    refresh,
    fetchExchangeRates,
  };
};
