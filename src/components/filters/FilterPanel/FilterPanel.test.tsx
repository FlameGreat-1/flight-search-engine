import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterPanel } from './FilterPanel';

vi.mock('@/features/filters', () => ({
  useFlightFilters: () => ({
    filters: {
      priceRange: {
        min: 100,
        max: 1000,
        currentMin: 100,
        currentMax: 1000,
      },
      stops: {
        direct: false,
        oneStop: false,
        twoPlusStops: false,
      },
      airlines: [
        { code: 'AA', name: 'American Airlines', count: 10, selected: false },
        { code: 'UA', name: 'United Airlines', count: 8, selected: false },
      ],
      departureTime: {
        earlyMorning: { label: 'Early Morning', range: '00:00 - 06:00', selected: false },
        morning: { label: 'Morning', range: '06:00 - 12:00', selected: false },
        afternoon: { label: 'Afternoon', range: '12:00 - 18:00', selected: false },
        evening: { label: 'Evening', range: '18:00 - 24:00', selected: false },
      },
      arrivalTime: {
        earlyMorning: { label: 'Early Morning', range: '00:00 - 06:00', selected: false },
        morning: { label: 'Morning', range: '06:00 - 12:00', selected: false },
        afternoon: { label: 'Afternoon', range: '12:00 - 18:00', selected: false },
        evening: { label: 'Evening', range: '18:00 - 24:00', selected: false },
      },
      duration: {
        maxDuration: 1200,
        currentMax: null,
      },
    },
    activeFilters: [],
    actions: {
      updatePrice: vi.fn(),
      toggleStops: vi.fn(),
      toggleAirline: vi.fn(),
      toggleDepartureTime: vi.fn(),
      toggleArrivalTime: vi.fn(),
      updateDuration: vi.fn(),
      removeFilter: vi.fn(),
      clearAll: vi.fn(),
    },
  }),
}));

describe('FilterPanel', () => {
  it('renders all filter sections', () => {
    render(<FilterPanel />);

    expect(screen.getByText(/price range/i)).toBeInTheDocument();
    
    const stopsElements = screen.getAllByText(/stops/i);
    expect(stopsElements.length).toBeGreaterThan(0);
    
    const airlinesElements = screen.getAllByText(/airlines/i);
    expect(airlinesElements.length).toBeGreaterThan(0);
    
    expect(screen.getByText(/departure time/i)).toBeInTheDocument();
    expect(screen.getByText(/max duration/i)).toBeInTheDocument();
  });

  it('renders mobile header when isMobile is true', () => {
    render(<FilterPanel isMobile />);

    const filtersElements = screen.getAllByText(/filters/i);
    expect(filtersElements.length).toBeGreaterThan(0);
    
    expect(screen.getByLabelText(/close filters/i)).toBeInTheDocument();
  });

  it('renders mobile footer buttons when isMobile is true', () => {
    render(<FilterPanel isMobile />);

    expect(screen.getByRole('button', { name: /clear all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /apply filters/i })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    render(<FilterPanel isMobile onClose={handleClose} />);

    await user.click(screen.getByLabelText(/close filters/i));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not render mobile elements when isMobile is false', () => {
    render(<FilterPanel isMobile={false} />);

    expect(screen.queryByLabelText(/close filters/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /apply filters/i })).not.toBeInTheDocument();
  });

  it('renders stops filter options', () => {
    render(<FilterPanel />);

    expect(screen.getByText(/direct/i)).toBeInTheDocument();
    expect(screen.getByText(/1 stop/i)).toBeInTheDocument();
    expect(screen.getByText(/2\+ stops/i)).toBeInTheDocument();
  });

  it('renders airline filter options', () => {
    render(<FilterPanel />);

    const americanElements = screen.getAllByText(/american airlines/i);
    expect(americanElements.length).toBeGreaterThan(0);
    
    const unitedElements = screen.getAllByText(/united airlines/i);
    expect(unitedElements.length).toBeGreaterThan(0);
  });

  it('renders departure time options', () => {
    render(<FilterPanel />);

    const earlyMorningElements = screen.getAllByText(/early morning/i);
    expect(earlyMorningElements.length).toBeGreaterThan(0);
    
    const morningElements = screen.getAllByText(/morning/i);
    expect(morningElements.length).toBeGreaterThan(0);
    
    const afternoonElements = screen.getAllByText(/afternoon/i);
    expect(afternoonElements.length).toBeGreaterThan(0);
    
    const eveningElements = screen.getAllByText(/evening/i);
    expect(eveningElements.length).toBeGreaterThan(0);
  });
});
