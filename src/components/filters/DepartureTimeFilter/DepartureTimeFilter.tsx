import { clsx } from 'clsx';
import type { TimeRange } from '@/types';

export interface DepartureTimeFilterProps {
  timeRanges: Record<string, TimeRange & { selected: boolean }>;
  onToggle: (timeRange: string) => void;
  disabled?: boolean;
}

export const DepartureTimeFilter = ({
  timeRanges,
  onToggle,
  disabled = false,
}: DepartureTimeFilterProps) => {
  const ranges = Object.entries(timeRanges);

  return (
    <div className={clsx('space-y-3', disabled && 'opacity-50 pointer-events-none')}>
      <h3 className="text-sm font-semibold text-text-primary">Departure Time</h3>

      <div className="grid grid-cols-2 gap-2">
        {ranges.map(([key, range]) => (
          <button
            key={key}
            type="button"
            onClick={() => onToggle(key)}
            disabled={disabled}
            className={clsx(
              'p-3 rounded-lg border transition-smooth text-left',
              'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark-surface',
              range.selected
                ? 'bg-accent/10 border-accent text-accent'
                : 'bg-dark-surface border-dark-border text-text-secondary hover:bg-dark-bg hover:border-accent/50'
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs font-medium">{range.label}</span>
            </div>
            <div className="text-xs opacity-75">{range.range}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
