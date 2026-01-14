import { SortOptions } from '../SortOptions';
import { useUIStore } from '@/store';
import { clsx } from 'clsx';

export interface ResultsHeaderProps {
  count: number;
  isLoading?: boolean;
  onFilterToggle?: () => void;
  className?: string;
}

export const ResultsHeader = ({
  count,
  isLoading = false,
  onFilterToggle,
  className,
}: ResultsHeaderProps) => {
  const { sortBy, setSortBy } = useUIStore();

  return (
    <div className={clsx('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4', className)}>
      <div className="flex items-center gap-4">
        {onFilterToggle && (
          <button
            onClick={onFilterToggle}
            className="lg:hidden btn-secondary flex items-center gap-2"
            aria-label="Toggle filters"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filters</span>
          </button>
        )}

        <div>
          <h2 className="text-xl font-bold text-text-primary">
            {isLoading ? 'Searching...' : `${count} Flight${count !== 1 ? 's' : ''} Found`}
          </h2>
          {!isLoading && count > 0 && (
            <p className="text-sm text-text-secondary">
              Showing all available options
            </p>
          )}
        </div>
      </div>

      <div className="w-full sm:w-auto sm:min-w-[200px]">
        <SortOptions value={sortBy} onChange={setSortBy} disabled={isLoading || count === 0} />
      </div>
    </div>
  );
};
