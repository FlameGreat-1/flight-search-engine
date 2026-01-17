import { Select, DatePicker, Button } from '@/components/common';
import { AirportAutocomplete } from '../AirportAutocomplete';
import { TripTypeSelector } from '../TripTypeSelector';
import { PassengerSelector } from '../PassengerSelector';
import { useSearchForm } from './useSearchForm';
import { CABIN_CLASSES } from '@/utils/constants';
import { clsx } from 'clsx';
import type { CabinClass } from '@/types';

export const SearchForm = () => {
  const {
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
  } = useSearchForm();

  const cabinOptions = Object.entries(CABIN_CLASSES).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <form onSubmit={handleSubmit} className="card p-4 space-y-3">
      <div>
        <h2 className="text-lg font-bold text-text-primary mb-0">Search</h2>
        <p className="text-xs text-text-secondary leading-tight">Find the best deals for your next trip</p>
      </div>

      <TripTypeSelector value={formData.tripType} onChange={handleTripTypeChange} disabled={isLoading} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 relative">
        <div className="md:pr-4">
          <AirportAutocomplete
            label="From"
            value={selectedOrigin}
            onChange={handleOriginChange}
            error={errors.origin}
            placeholder="Origin airport"
            disabled={isLoading}
          />
        </div>

        <div className="md:pl-4">
          <AirportAutocomplete
            label="To"
            value={selectedDestination}
            onChange={handleDestinationChange}
            error={errors.destination}
            placeholder="Destination airport"
            disabled={isLoading}
          />
        </div>

        <button
          type="button"
          onClick={swapLocations}
          disabled={isLoading}
          className={clsx(
            'absolute',
            'top-[calc(50%-0.5rem)] left-1/2 -translate-x-1/2',
            'md:top-[70%] md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2',
            'md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2',
            'w-10 h-10 rounded-full bg-dark-surface border-2 border-dark-border',
            'flex items-center justify-center',
            'text-text-secondary hover:text-accent hover:border-accent',
            'transition-smooth z-10',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label="Swap origin and destination"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <DatePicker
          label="Departure Date"
          value={formData.departureDate ? new Date(formData.departureDate) : null}
          onChange={(date) => updateField('departureDate', date ? date.toISOString().split('T')[0] : '')}
          error={errors.departureDate}
          disabled={isLoading}
        />

        {formData.tripType === 'round-trip' && (
          <DatePicker
            label="Return Date"
            value={formData.returnDate ? new Date(formData.returnDate) : null}
            onChange={(date) => updateField('returnDate', date ? date.toISOString().split('T')[0] : '')}
            error={errors.returnDate}
            minDate={formData.departureDate ? new Date(formData.departureDate) : undefined}
            disabled={isLoading}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <PassengerSelector
          value={{
            adults: formData.adults,
            children: formData.children,
            infants: formData.infants,
          }}
          onChange={handlePassengersChange}
          error={errors.adults}
          disabled={isLoading}
        />

        <Select
          label="Cabin Class"
          options={cabinOptions}
          value={formData.cabinClass}
          onChange={(e) => updateField('cabinClass', e.target.value as CabinClass)}
          disabled={isLoading}
        />
      </div>

      <Button type="submit" variant="primary" size="md" fullWidth isLoading={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </Button>
    </form>
  );
};