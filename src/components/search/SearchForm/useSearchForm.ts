import { useState, useCallback, useEffect } from 'react';
import { useSearchStore } from '@/store';
import { useFlightSearch, useSearchHistory } from '@/features/search';
import { validateSearchForm, isSearchFormValid } from '@/utils/validation';
import type { SearchFormData, SearchFormErrors, Airport, CabinClass, TripType } from '@/types';

export const useSearchForm = () => {
  const { criteria } = useSearchStore();
  const { searchFlights, isLoading } = useFlightSearch();
  const { addToHistory } = useSearchHistory();

  const [formData, setFormData] = useState<SearchFormData>({
    origin: criteria.origin?.iataCode || '',
    destination: criteria.destination?.iataCode || '',
    departureDate: criteria.departureDate ? criteria.departureDate.toISOString().split('T')[0] : '',
    returnDate: criteria.returnDate ? criteria.returnDate.toISOString().split('T')[0] : '',
    tripType: criteria.tripType,
    adults: criteria.adults,
    children: criteria.children,
    infants: criteria.infants,
    cabinClass: criteria.cabinClass,
  });

  const [selectedOrigin, setSelectedOrigin] = useState<Airport | null>(criteria.origin);
  const [selectedDestination, setSelectedDestination] = useState<Airport | null>(criteria.destination);
  const [errors, setErrors] = useState<SearchFormErrors>({});

  useEffect(() => {
    if (criteria.origin) setSelectedOrigin(criteria.origin);
    if (criteria.destination) setSelectedDestination(criteria.destination);
  }, [criteria.origin, criteria.destination]);

  const updateField = useCallback(<K extends keyof SearchFormData>(
    field: K,
    value: SearchFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleOriginChange = useCallback((airport: Airport | null) => {
    setSelectedOrigin(airport);
    updateField('origin', airport?.iataCode || '');
  }, [updateField]);

  const handleDestinationChange = useCallback((airport: Airport | null) => {
    setSelectedDestination(airport);
    updateField('destination', airport?.iataCode || '');
  }, [updateField]);

  const handleTripTypeChange = useCallback((tripType: TripType) => {
    updateField('tripType', tripType);
    if (tripType === 'one-way') {
      updateField('returnDate', '');
    }
  }, [updateField]);

  const handlePassengersChange = useCallback((passengers: { adults: number; children: number; infants: number }) => {
    setFormData((prev) => ({
      ...prev,
      adults: passengers.adults,
      children: passengers.children,
      infants: passengers.infants,
    }));
    setErrors((prev) => ({ ...prev, adults: undefined }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateSearchForm(formData);
    setErrors(validationErrors);

    if (!isSearchFormValid(formData)) {
      return;
    }

    if (!selectedOrigin || !selectedDestination) {
      return;
    }

    const searchCriteria = {
      origin: selectedOrigin,
      destination: selectedDestination,
      departureDate: new Date(formData.departureDate),
      returnDate: formData.returnDate ? new Date(formData.returnDate) : null,
      tripType: formData.tripType,
      adults: formData.adults,
      children: formData.children,
      infants: formData.infants,
      cabinClass: formData.cabinClass,
    };

    searchFlights(searchCriteria);
    addToHistory(searchCriteria);
  }, [formData, selectedOrigin, selectedDestination, searchFlights, addToHistory]);

  const swapLocations = useCallback(() => {
    const tempOrigin = selectedOrigin;
    const tempOriginCode = formData.origin;

    setSelectedOrigin(selectedDestination);
    setSelectedDestination(tempOrigin);
    setFormData((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: tempOriginCode,
    }));
  }, [selectedOrigin, selectedDestination, formData.origin]);

  return {
    formData,
    selectedOrigin,
    selectedDestination,
    errors,
    isLoading,
    updateField,
    handleOriginChange,
    handleDestinationChange,
    handleTripTypeChange,
    handlePassengersChange,
    handleSubmit,
    swapLocations,
  };
};
