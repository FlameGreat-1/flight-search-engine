import { formatTime } from '@/utils/date';
import { formatDuration } from '@/utils/duration';
import type { FlightSegment as FlightSegmentType } from '@/types';

export interface FlightSegmentProps {
  segment: FlightSegmentType;
  isLast: boolean;
}

export const FlightSegment = ({ segment, isLast }: FlightSegmentProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">
                {formatTime(segment.departure.at)}
              </div>
              <div className="text-sm text-text-secondary">{segment.departure.iataCode}</div>
              {segment.departure.terminal && (
                <div className="text-xs text-text-muted">Terminal {segment.departure.terminal}</div>
              )}
            </div>

            <div className="flex-1 flex flex-col items-center">
              <div className="text-xs text-text-muted mb-1">{formatDuration(segment.duration)}</div>
              <div className="w-full h-px bg-dark-border relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-dark-border" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
              </div>
              {segment.numberOfStops > 0 && (
                <div className="text-xs text-warning mt-1">
                  {segment.numberOfStops} stop{segment.numberOfStops > 1 ? 's' : ''}
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">
                {formatTime(segment.arrival.at)}
              </div>
              <div className="text-sm text-text-secondary">{segment.arrival.iataCode}</div>
              {segment.arrival.terminal && (
                <div className="text-xs text-text-muted">Terminal {segment.arrival.terminal}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-text-muted">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          <span>{segment.carrierName}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Flight {segment.flightNumber}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>{segment.aircraft}</span>
        </div>
      </div>

      {!isLast && (
        <div className="flex items-center gap-2 py-2 text-sm text-text-muted">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Layover</span>
        </div>
      )}
    </div>
  );
};
