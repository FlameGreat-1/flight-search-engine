import { useState } from 'react';
import { FlightCard } from '../FlightCard';
import { FlightDetails } from '../FlightDetails';
import { EmptyState } from '../EmptyState';
import { LoadingSpinner, Button } from '@/components/common';
import { useFilteredFlights } from '@/features/filters';
import { clsx } from 'clsx';
import type { Flight } from '@/types';

export interface FlightListProps {
  isLoading?: boolean;
  onClearFilters?: () => void;
  className?: string;
}

const FLIGHTS_PER_PAGE = 10;

export const FlightList = ({
  isLoading = false,
  onClearFilters,
  className,
}: FlightListProps) => {
  const { flights, isEmpty } = useFilteredFlights();
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [visibleCount, setVisibleCount] = useState(FLIGHTS_PER_PAGE);

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
  };

  const handleCloseDetails = () => {
    setSelectedFlight(null);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + FLIGHTS_PER_PAGE);
  };

  const visibleFlights = flights.slice(0, visibleCount);
  const hasMore = visibleCount < flights.length;

  if (isLoading) {
    return (
      <div className={clsx('flex items-center justify-center py-20', className)}>
        <LoadingSpinner size="xl" label="Searching for flights..." />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <EmptyState
        icon="filter"
        title="No Flights Match Your Filters"
        message="Try adjusting your filters to see more results"
        action={
          onClearFilters
            ? {
                label: 'Clear All Filters',
                onClick: onClearFilters,
              }
            : undefined
        }
        className={className}
      />
    );
  }

  return (
    <>
      <div className={clsx('space-y-4', className)}>
        {visibleFlights.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            onSelect={handleSelectFlight}
            isSelected={selectedFlight?.id === flight.id}
          />
        ))}

        {hasMore && (
          <div className="flex justify-center pt-4">
            <Button variant="secondary" onClick={handleLoadMore}>
              Load More ({flights.length - visibleCount} remaining)
            </Button>
          </div>
        )}
      </div>

      {selectedFlight && (
        <div className="fixed inset-0 z-50 lg:hidden bg-dark-bg overflow-y-auto">
          <FlightDetails flight={selectedFlight} onClose={handleCloseDetails} />
        </div>
      )}

      {selectedFlight && (
        <div className="hidden lg:block fixed right-0 top-16 bottom-0 w-[500px] border-l border-dark-border overflow-y-auto z-40 animate-slide-in-right">
          <FlightDetails flight={selectedFlight} onClose={handleCloseDetails} />
        </div>
      )}
    </>
  );
};
