import { clsx } from 'clsx';
import type { ActiveFilter } from '@/types';

export interface ActiveFiltersProps {
  filters: ActiveFilter[];
  onRemove: (filterId: string) => void;
  onClearAll: () => void;
  className?: string;
}

export const ActiveFilters = ({
  filters,
  onRemove,
  onClearAll,
  className,
}: ActiveFiltersProps) => {
  if (filters.length === 0) {
    return null;
  }

  return (
    <div className={clsx('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">
          Active Filters ({filters.length})
        </h3>
        <button
          type="button"
          onClick={onClearAll}
          className="text-sm text-accent hover:text-accent-hover transition-smooth"
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <div
            key={filter.id}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-sm text-accent animate-scale-in"
          >
            <span className="font-medium">{filter.label}:</span>
            <span>{filter.value}</span>
            <button
              type="button"
              onClick={() => onRemove(filter.id)}
              className="ml-1 hover:bg-accent/20 rounded-full p-0.5 transition-smooth"
              aria-label={`Remove ${filter.label} filter`}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
