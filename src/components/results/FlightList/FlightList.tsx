import { useState, useMemo, useEffect } from 'react';
import { FlightCard } from '../FlightCard';
import { FlightDetails } from '../FlightDetails';
import { EmptyState } from '../EmptyState';
import { Button, Skeleton } from '@/components/common';
import { useFilteredFlights } from '@/features/filters';
import { clsx } from 'clsx';
import type { Flight } from '@/types';

export interface FlightListProps {
  isLoading?: boolean;
  onClearFilters?: () => void;
  className?: string;
}

const FLIGHTS_PER_PAGE = 20;

export const FlightList = ({
  isLoading = false,
  onClearFilters,
  className,
}: FlightListProps) => {
  const { flights, isEmpty } = useFilteredFlights();
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [visibleCount, setVisibleCount] = useState(FLIGHTS_PER_PAGE);

  useEffect(() => {
    setVisibleCount(FLIGHTS_PER_PAGE);
  }, [flights.length]);

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
  };

  const handleCloseDetails = () => {
    setSelectedFlight(null);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + FLIGHTS_PER_PAGE, flights.length));
  };

  const visibleFlights = useMemo(
    () => flights.slice(0, visibleCount),
    [flights, visibleCount]
  );

  const hasMore = visibleCount < flights.length;
  const remainingCount = flights.length - visibleCount;

  if (isLoading) {
    return (
      <div className={clsx('space-y-4', className)}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="card p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-24" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>
        ))}
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
              Load More ({remainingCount} remaining)
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
