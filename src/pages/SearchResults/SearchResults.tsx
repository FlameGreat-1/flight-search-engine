import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/layout';
import { FilterPanel } from '@/components/filters';
import { ResultsHeader, FlightList } from '@/components/results';
import { PriceGraph } from '@/components/charts';
import { LoadingSpinner } from '@/components/common';
import { useSearchStore, useFilterStore, useUIStore } from '@/store';
import { useFilteredFlights } from '@/features/filters';

export const SearchResults = () => {
  const navigate = useNavigate();
  const { hasSearched, isLoading } = useSearchStore();
  const { clearAllFilters } = useFilterStore();
  const { isMobileFilterOpen, toggleMobileFilter } = useUIStore();
  const { stats } = useFilteredFlights();

  useEffect(() => {
    if (!hasSearched && !isLoading) {
      navigate('/');
    }
  }, [hasSearched, isLoading, navigate]);

  if (!hasSearched) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <LoadingSpinner size="xl" label="Loading..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Container className="section-padding">
        <div className="space-y-8">
          <PriceGraph />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-20">
                <FilterPanel />
              </div>
            </aside>

            <main className="lg:col-span-3 space-y-6">
              <ResultsHeader
                count={stats.count}
                isLoading={isLoading}
                onFilterToggle={toggleMobileFilter}
              />

              <FlightList isLoading={isLoading} onClearFilters={clearAllFilters} />
            </main>
          </div>
        </div>
      </Container>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-dark-bg">
          <FilterPanel isMobile onClose={toggleMobileFilter} />
        </div>
      )}
    </div>
  );
};
