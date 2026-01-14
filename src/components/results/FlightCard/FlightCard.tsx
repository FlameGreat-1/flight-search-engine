import { FlightSegment } from './FlightSegment';
import { formatCurrency } from '@/utils/currency';
import { formatDuration } from '@/utils/duration';
import { formatDate } from '@/utils/date';
import { Button } from '@/components/common';
import { clsx } from 'clsx';
import type { Flight } from '@/types';

export interface FlightCardProps {
  flight: Flight;
  onSelect?: (flight: Flight) => void;
  isSelected?: boolean;
  className?: string;
}

export const FlightCard = ({
  flight,
  onSelect,
  isSelected = false,
  className,
}: FlightCardProps) => {
  const handleSelect = () => {
    onSelect?.(flight);
  };

  const getBestDealBadge = () => {
    if (flight.price.total < flight.price.perAdult * 0.85) {
      return (
        <div className="badge badge-success">
          Best Deal
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={clsx(
        'card p-6 transition-smooth',
        isSelected && 'ring-2 ring-accent',
        onSelect && 'card-hover cursor-pointer',
        className
      )}
      onClick={onSelect ? handleSelect : undefined}
    >
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                {flight.airlines.map((airline, index) => (
                  <span key={index} className="text-sm font-medium text-text-primary">
                    {airline}
                  </span>
                ))}
              </div>
              {getBestDealBadge()}
              {flight.instantTicketingRequired && (
                <div className="badge badge-warning">
                  Instant Booking
                </div>
              )}
            </div>

            {flight.itineraries.map((itinerary, itineraryIndex) => (
              <div key={itineraryIndex} className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="font-medium">
                    {itineraryIndex === 0 ? 'Outbound' : 'Return'}
                  </span>
                  <span>•</span>
                  <span>{formatDate(itinerary.departureTime)}</span>
                </div>

                {itinerary.segments.map((segment, segmentIndex) => (
                  <FlightSegment
                    key={segment.id}
                    segment={segment}
                    isLast={segmentIndex === itinerary.segments.length - 1}
                  />
                ))}

                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Total: {formatDuration(itinerary.duration)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>
                      {itinerary.totalStops === 0
                        ? 'Direct'
                        : `${itinerary.totalStops} stop${itinerary.totalStops > 1 ? 's' : ''}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{flight.cabinClass}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:text-right space-y-3 lg:min-w-[200px]">
            <div>
              <div className="text-3xl font-bold text-accent">
                {formatCurrency(flight.price.total)}
              </div>
              <div className="text-sm text-text-muted">
                {formatCurrency(flight.price.perAdult)} per adult
              </div>
            </div>

            {flight.numberOfBookableSeats <= 5 && (
              <div className="text-sm text-warning">
                Only {flight.numberOfBookableSeats} seat{flight.numberOfBookableSeats > 1 ? 's' : ''} left
              </div>
            )}

            <Button variant="primary" size="lg" fullWidth onClick={handleSelect}>
              Select Flight
            </Button>

            <div className="text-xs text-text-muted">
              Includes taxes and fees
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
