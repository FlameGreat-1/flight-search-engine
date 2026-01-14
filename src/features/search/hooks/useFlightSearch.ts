import { useMutation } from '@tanstack/react-query';
import { useSearchStore, useFilterStore } from '@/store';
import { amadeusClient, transformFlightOffersResponse } from '@/api';
import type { FlightSearchCriteria } from '@/types';
import { formatDateForAPI } from '@/utils/date';
import { ERROR_MESSAGES } from '@/utils/constants';

export const useFlightSearch = () => {
  const { setCriteria, setResults, setLoading, setError } = useSearchStore();
  const { initializeFilters } = useFilterStore();

  const mutation = useMutation({
    mutationFn: async (criteria: FlightSearchCriteria) => {
      if (!criteria.origin || !criteria.destination || !criteria.departureDate) {
        throw new Error(ERROR_MESSAGES.VALIDATION_ERROR);
      }

      const searchParams = {
        originLocationCode: criteria.origin.iataCode,
        destinationLocationCode: criteria.destination.iataCode,
        departureDate: formatDateForAPI(criteria.departureDate),
        adults: criteria.adults,
        children: criteria.children > 0 ? criteria.children : undefined,
        infants: criteria.infants > 0 ? criteria.infants : undefined,
        travelClass: criteria.cabinClass,
        returnDate:
          criteria.tripType === 'round-trip' && criteria.returnDate
            ? formatDateForAPI(criteria.returnDate)
            : undefined,
        max: 250,
      };

      const response = await amadeusClient.shopping.searchFlightOffers(searchParams);
      return transformFlightOffersResponse(response);
    },
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (flights) => {
      setResults(flights);
      initializeFilters(flights);
    },
    onError: (error: Error) => {
      setError(error.message || ERROR_MESSAGES.API_ERROR);
      setResults([]);
    },
  });

  const searchFlights = (criteria: FlightSearchCriteria) => {
    setCriteria(criteria);
    mutation.mutate(criteria);
  };

  return {
    searchFlights,
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
    isSuccess: mutation.isSuccess,
  };
};
