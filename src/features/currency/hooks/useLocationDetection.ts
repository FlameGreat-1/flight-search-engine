import { useEffect, useState } from 'react';
import { useCurrencyStore } from '@/store';
import { getUserLocation } from '@/utils/exchangeRates';
import type { LocationData } from '@/types';

interface UseLocationDetectionOptions {
  autoDetect?: boolean;
  onSuccess?: (location: LocationData) => void;
  onError?: (error: Error) => void;
}

export const useLocationDetection = (options: UseLocationDetectionOptions = {}) => {
  const { autoDetect = true, onSuccess, onError } = options;
  const { detectUserCurrency } = useCurrencyStore();
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionError, setDetectionError] = useState<string | null>(null);

  const detectLocation = async () => {
    setIsDetecting(true);
    setDetectionError(null);

    try {
      const userLocation = await getUserLocation();
      setLocation(userLocation);
      onSuccess?.(userLocation);
      return userLocation;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to detect location';
      setDetectionError(errorMessage);
      onError?.(error instanceof Error ? error : new Error(errorMessage));
      return null;
    } finally {
      setIsDetecting(false);
    }
  };

  const detectAndSetCurrency = async () => {
    setIsDetecting(true);
    setDetectionError(null);

    try {
      await detectUserCurrency();
      const userLocation = await getUserLocation();
      setLocation(userLocation);
      onSuccess?.(userLocation);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to detect currency';
      setDetectionError(errorMessage);
      onError?.(error instanceof Error ? error : new Error(errorMessage));
    } finally {
      setIsDetecting(false);
    }
  };

  useEffect(() => {
    if (autoDetect) {
      detectAndSetCurrency();
    }
  }, []);

  return {
    location,
    isDetecting,
    detectionError,
    detectLocation,
    detectAndSetCurrency,
  };
};
