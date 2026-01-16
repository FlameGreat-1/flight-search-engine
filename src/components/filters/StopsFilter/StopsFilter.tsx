import { clsx } from 'clsx';

export const filterByStops = (flights: Flight[], stopsFilter: StopsFilter): Flight[] => {
  console.log('🔍 filterByStops called:', {
    totalFlights: flights.length,
    stopsFilter,
    flightStops: flights.map(f => ({ id: f.id, totalStops: f.totalStops }))
  });

  if (!stopsFilter.direct && !stopsFilter.oneStop && !stopsFilter.twoPlusStops) {
    return flights;
  }

  const filtered = flights.filter((flight) => {
    const stops = flight.totalStops;
    if (stopsFilter.direct && stops === 0) return true;
    if (stopsFilter.oneStop && stops === 1) return true;
    if (stopsFilter.twoPlusStops && stops >= 2) return true;
    return false;
  });

  console.log('✅ Filtered results:', {
    originalCount: flights.length,
    filteredCount: filtered.length,
    filtered: filtered.map(f => ({ id: f.id, totalStops: f.totalStops }))
  });

  return filtered;
};

export interface StopsFilterProps {
  direct: boolean;
  oneStop: boolean;
  twoPlusStops: boolean;
  onToggle: (stops: 'direct' | 'oneStop' | 'twoPlusStops') => void;
  counts?: {
    direct: number;
    oneStop: number;
    twoPlusStops: number;
  };
  disabled?: boolean;
}

export const StopsFilter = ({
  direct,
  oneStop,
  twoPlusStops,
  onToggle,
  counts,
  disabled = false,
}: StopsFilterProps) => {
  const options = [
    {
      id: 'direct' as const,
      label: 'Direct',
      checked: direct,
      count: counts?.direct,
    },
    {
      id: 'oneStop' as const,
      label: '1 Stop',
      checked: oneStop,
      count: counts?.oneStop,
    },
    {
      id: 'twoPlusStops' as const,
      label: '2+ Stops',
      checked: twoPlusStops,
      count: counts?.twoPlusStops,
    },
  ];

  return (
    <div className={clsx('space-y-3', disabled && 'opacity-50 pointer-events-none')}>
      <h3 className="text-sm font-semibold text-text-primary">Stops</h3>

      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            className={clsx(
              'flex items-center justify-between p-3 rounded-lg cursor-pointer transition-smooth',
              'hover:bg-dark-bg',
              option.checked && 'bg-dark-bg border border-accent'
            )}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={option.checked}
                onChange={() => onToggle(option.id)}
                disabled={disabled}
                className="w-4 h-4 rounded border-dark-border text-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark-surface cursor-pointer"
              />
              <span className="text-sm text-text-primary">{option.label}</span>
            </div>
            {option.count !== undefined && (
              <span className="text-xs text-text-muted">({option.count})</span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};
