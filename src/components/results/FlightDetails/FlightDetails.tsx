import { useCurrency } from '@/features/currency';
import { formatDuration } from '@/utils/duration';
import { formatDate, formatTime } from '@/utils/date';
import { Button } from '@/components/common';
import { clsx } from 'clsx';
import type { Flight } from '@/types';

export interface FlightDetailsProps {
  flight: Flight;
  onClose: () => void;
  onBook?: (flight: Flight) => void;
  className?: string;
}

export const FlightDetails = ({
  flight,
  onClose,
  onBook,
  className,
}: FlightDetailsProps) => {
  const { convertAndFormat } = useCurrency();

  const handleBook = () => {
    onBook?.(flight);
  };

  return (
    <div className={clsx('bg-dark-bg', className)}>
      <div className="sticky top-0 z-10 bg-dark-surface border-b border-dark-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-primary">Flight Details</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-smooth"
            aria-label="Close details"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-accent">
                {convertAndFormat(flight.price.total, flight.price.currency)}
              </h3>
              <p className="text-sm text-text-muted">
                {convertAndFormat(flight.price.perAdult, flight.price.currency)} per adult
              </p>
            </div>
            {onBook && (
              <Button variant="primary" size="lg" onClick={handleBook}>
                Book Now
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-muted">Base Fare:</span>
              <span className="ml-2 text-text-primary font-medium">
                {convertAndFormat(flight.price.base, flight.price.currency)}
              </span>
            </div>
            <div>
              <span className="text-text-muted">Taxes & Fees:</span>
              <span className="ml-2 text-text-primary font-medium">
                {convertAndFormat(flight.price.fees, flight.price.currency)}
              </span>
            </div>
            <div>
              <span className="text-text-muted">Cabin Class:</span>
              <span className="ml-2 text-text-primary font-medium">{flight.cabinClass}</span>
            </div>
            <div>
              <span className="text-text-muted">Available Seats:</span>
              <span className="ml-2 text-text-primary font-medium">
                {flight.numberOfBookableSeats}
              </span>
            </div>
          </div>
        </div>

        {flight.itineraries.map((itinerary, itineraryIndex) => (
          <div key={itineraryIndex} className="space-y-4">
            <h3 className="text-lg font-bold text-text-primary">
              {itineraryIndex === 0 ? 'Outbound Flight' : 'Return Flight'}
            </h3>
            <p className="text-sm text-text-secondary">{formatDate(itinerary.departureTime)}</p>

            {itinerary.segments.map((segment, segmentIndex) => (
              <div key={segment.id} className="card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary">
                        {segment.carrierName}
                      </div>
                      <div className="text-sm text-text-muted">
                        Flight {segment.flightNumber} • {segment.aircraft}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-text-secondary">
                    {formatDuration(segment.duration)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-text-muted mb-1">Departure</div>
                    <div className="text-2xl font-bold text-text-primary">
                      {formatTime(segment.departure.at)}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {segment.departure.iataCode}
                      {segment.departure.terminal && ` • Terminal ${segment.departure.terminal}`}
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      {formatDate(segment.departure.at)}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-text-muted mb-1">Arrival</div>
                    <div className="text-2xl font-bold text-text-primary">
                      {formatTime(segment.arrival.at)}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {segment.arrival.iataCode}
                      {segment.arrival.terminal && ` • Terminal ${segment.arrival.terminal}`}
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      {formatDate(segment.arrival.at)}
                    </div>
                  </div>
                </div>

                {segment.numberOfStops > 0 && (
                  <div className="pt-4 border-t border-dark-border">
                    <div className="flex items-center gap-2 text-sm text-warning">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <span>
                        {segment.numberOfStops} stop{segment.numberOfStops > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                )}

                {segmentIndex < itinerary.segments.length - 1 && (
                  <div className="pt-4 border-t border-dark-border">
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Layover before next flight</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="card p-4 bg-dark-surface/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">Total Travel Time:</span>
                <span className="font-semibold text-text-primary">
                  {formatDuration(itinerary.duration)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {flight.instantTicketingRequired && (
          <div className="card p-4 bg-warning/10 border-warning/20">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-warning flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <div className="font-semibold text-warning mb-1">Instant Ticketing Required</div>
                <div className="text-sm text-text-secondary">
                  This flight must be ticketed immediately upon booking.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
