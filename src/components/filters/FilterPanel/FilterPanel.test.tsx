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
    expect(screen.getByText(/stops/i)).toBeInTheDocument();
    expect(screen.getByText(/airlines/i)).toBeInTheDocument();
    expect(screen.getByText(/departure time/i)).toBeInTheDocument();
    expect(screen.getByText(/max duration/i)).toBeInTheDocument();
  });

  it('renders mobile header when isMobile is true', () => {
    render(<FilterPanel isMobile />);

    expect(screen.getByText(/filters/i)).toBeInTheDocument();
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

    expect(screen.getByText(/american airlines/i)).toBeInTheDocument();
    expect(screen.getByText(/united airlines/i)).toBeInTheDocument();
  });

  it('renders departure time options', () => {
    render(<FilterPanel />);

    expect(screen.getByText(/early morning/i)).toBeInTheDocument();
    expect(screen.getByText(/morning/i)).toBeInTheDocument();
    expect(screen.getByText(/afternoon/i)).toBeInTheDocument();
    expect(screen.getByText(/evening/i)).toBeInTheDocument();
  });
});
