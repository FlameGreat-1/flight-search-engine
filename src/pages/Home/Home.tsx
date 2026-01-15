import { Container } from '@/components/layout';
import { SearchForm } from '@/components/search';
import { FilterPanel } from '@/components/filters';
import { ResultsHeader, FlightList } from '@/components/results';
import { PriceGraph } from '@/components/charts';
import { useSearchStore, useFilterStore, useUIStore } from '@/store';
import { useFilteredFlights } from '@/features/filters';

export const Home = () => {
  const { hasSearched, isLoading } = useSearchStore();
  const { clearAllFilters } = useFilterStore();
  const { isMobileFilterOpen, toggleMobileFilter } = useUIStore();
  const { stats } = useFilteredFlights();

  return (
    <div className="min-h-screen bg-dark-bg">
      <Container className="section-padding">
        <div className="space-y-8">
          <SearchForm />

          {hasSearched && (
            <>
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
            </>
          )}

          {!hasSearched && (
            <div className="card p-12 text-center">
              <div className="max-w-2xl mx-auto space-y-4">
                <svg
                  className="mx-auto h-20 w-20 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <h2 className="text-3xl font-bold text-text-primary">
                  Find Your Perfect Flight
                </h2>
                <p className="text-lg text-text-secondary">
                  Search thousands of flights to find the best deals for your next trip
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                      <svg
                        className="w-6 h-6 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-text-primary">Easy Search</h3>
                    <p className="text-sm text-text-secondary">
                      Find flights with our intuitive search interface
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                      <svg
                        className="w-6 h-6 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-text-primary">Price Trends</h3>
                    <p className="text-sm text-text-secondary">
                      Visualize price trends to find the best deals
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                      <svg
                        className="w-6 h-6 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-text-primary">Smart Filters</h3>
                    <p className="text-sm text-text-secondary">
                      Filter by price, stops, airlines, and more
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
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
