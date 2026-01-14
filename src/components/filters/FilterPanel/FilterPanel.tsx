import { useFlightFilters } from '@/features/filters';
import { PriceRangeFilter } from '../PriceRangeFilter';
import { StopsFilter } from '../StopsFilter';
import { AirlineFilter } from '../AirlineFilter';
import { DepartureTimeFilter } from '../DepartureTimeFilter';
import { DurationFilter } from '../DurationFilter';
import { ActiveFilters } from '../ActiveFilters';
import { Button } from '@/components/common';
import { clsx } from 'clsx';

export interface FilterPanelProps {
  className?: string;
  onClose?: () => void;
  isMobile?: boolean;
}

export const FilterPanel = ({ className, onClose, isMobile = false }: FilterPanelProps) => {
  const { filters, activeFilters, actions } = useFlightFilters();

  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className={clsx('flex flex-col h-full', className)}>
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-dark-border">
          <h2 className="text-lg font-bold text-text-primary">Filters</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-smooth"
            aria-label="Close filters"
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
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {hasActiveFilters && (
          <ActiveFilters
            filters={activeFilters}
            onRemove={actions.removeFilter}
            onClearAll={actions.clearAll}
          />
        )}

        <PriceRangeFilter
          min={filters.priceRange.min}
          max={filters.priceRange.max}
          currentMin={filters.priceRange.currentMin}
          currentMax={filters.priceRange.currentMax}
          onChange={actions.updatePrice}
        />

        <div className="divider" />

        <StopsFilter
          direct={filters.stops.direct}
          oneStop={filters.stops.oneStop}
          twoPlusStops={filters.stops.twoPlusStops}
          onToggle={actions.toggleStops}
        />

        <div className="divider" />

        {filters.airlines.length > 0 && (
          <>
            <AirlineFilter airlines={filters.airlines} onToggle={actions.toggleAirline} />
            <div className="divider" />
          </>
        )}

        <DepartureTimeFilter
          timeRanges={filters.departureTime}
          onToggle={actions.toggleDepartureTime}
        />

        <div className="divider" />

        {filters.duration.maxDuration && (
          <DurationFilter
            maxDuration={filters.duration.maxDuration}
            currentMax={filters.duration.currentMax}
            onChange={actions.updateDuration}
          />
        )}
      </div>

      {isMobile && (
        <div className="p-4 border-t border-dark-border bg-dark-surface">
          <div className="flex gap-3">
            <Button variant="secondary" onClick={actions.clearAll} fullWidth disabled={!hasActiveFilters}>
              Clear All
            </Button>
            <Button variant="primary" onClick={onClose} fullWidth>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
