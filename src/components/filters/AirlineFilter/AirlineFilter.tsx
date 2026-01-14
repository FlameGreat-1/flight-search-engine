import { useState } from 'clsx';
import { clsx } from 'clsx';
import type { AirlineFilter as AirlineFilterType } from '@/types';

export interface AirlineFilterProps {
  airlines: AirlineFilterType[];
  onToggle: (airlineCode: string) => void;
  disabled?: boolean;
}

export const AirlineFilter = ({ airlines, onToggle, disabled = false }: AirlineFilterProps) => {
  const [showAll, setShowAll] = useState(false);

  const displayedAirlines = showAll ? airlines : airlines.slice(0, 5);
  const hasMore = airlines.length > 5;

  return (
    <div className={clsx('space-y-3', disabled && 'opacity-50 pointer-events-none')}>
      <h3 className="text-sm font-semibold text-text-primary">Airlines</h3>

      <div className="space-y-2">
        {displayedAirlines.map((airline) => (
          <label
            key={airline.code}
            className={clsx(
              'flex items-center justify-between p-3 rounded-lg cursor-pointer transition-smooth',
              'hover:bg-dark-bg',
              airline.selected && 'bg-dark-bg border border-accent'
            )}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <input
                type="checkbox"
                checked={airline.selected}
                onChange={() => onToggle(airline.code)}
                disabled={disabled}
                className="w-4 h-4 rounded border-dark-border text-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark-surface cursor-pointer flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-text-primary truncate">{airline.name}</div>
                <div className="text-xs text-text-muted">{airline.code}</div>
              </div>
            </div>
            <span className="text-xs text-text-muted ml-2 flex-shrink-0">
              ({airline.count})
            </span>
          </label>
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          disabled={disabled}
          className="text-sm text-accent hover:text-accent-hover transition-smooth"
        >
          {showAll ? 'Show less' : `Show all (${airlines.length})`}
        </button>
      )}
    </div>
  );
};
