import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FlightList } from './FlightList';

const mockUseFilteredFlights = vi.fn();

vi.mock('@/features/filters', () => ({
  useFilteredFlights: () => mockUseFilteredFlights(),
}));

const mockFlight = {
  id: '1',
  airlines: ['American Airlines'],
  price: { total: 500, perAdult: 500, currency: 'USD', base: 450, fees: 50 },
  itineraries: [
    {
      duration: 300,
      segments: [
        {
          id: 'seg1',
          departure: { iataCode: 'JFK', at: new Date('2024-01-15T10:00:00') },
          arrival: { iataCode: 'LAX', at: new Date('2024-01-15T13:00:00') },
          carrierName: 'American Airlines',
          flightNumber: '100',
          aircraft: 'Boeing 737',
          duration: 300,
          numberOfStops: 0,
        },
      ],
      departureTime: new Date('2024-01-15T10:00:00'),
      arrivalTime: new Date('2024-01-15T13:00:00'),
      totalStops: 0,
    },
  ],
  cabinClass: 'ECONOMY',
  totalStops: 0,
  totalDuration: 300,
  numberOfBookableSeats: 5,
  instantTicketingRequired: false,
  validatingAirlineCodes: ['AA'],
  departureDate: new Date('2024-01-15T10:00:00'),
  arrivalDate: new Date('2024-01-15T13:00:00'),
};

describe('FlightList', () => {
  beforeEach(() => {
    mockUseFilteredFlights.mockReturnValue({
      flights: [mockFlight],
      isEmpty: false,
      stats: { count: 1, lowestPrice: 500, highestPrice: 500, averagePrice: 500 },
      priceData: [],
      priceTrend: null,
    });
  });

  it('renders flight cards', () => {
    render(<FlightList />);
    
    const airlineElements = screen.getAllByText(/american airlines/i);
    expect(airlineElements.length).toBeGreaterThan(0);
  });

  it('shows loading skeleton when loading', () => {
    render(<FlightList isLoading />);
    
    const skeletons = document.querySelectorAll('.skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('opens flight details when card is clicked', async () => {
    const user = userEvent.setup();
    render(<FlightList />);

    const selectButton = screen.getByRole('button', { name: /select flight/i });
    await user.click(selectButton);
    
    expect(screen.getAllByText(/american airlines/i).length).toBeGreaterThan(1);
  });
});

describe('FlightList - Empty State', () => {
  beforeEach(() => {
    mockUseFilteredFlights.mockReturnValue({
      flights: [],
      isEmpty: true,
      stats: { count: 0, lowestPrice: 0, highestPrice: 0, averagePrice: 0 },
      priceData: [],
      priceTrend: null,
    });
  });

  it('shows empty state when no flights', () => {
    render(<FlightList />);
    expect(screen.getByText(/no flights match your filters/i)).toBeInTheDocument();
  });

  it('calls onClearFilters when clear button is clicked', async () => {
    const handleClearFilters = vi.fn();
    const user = userEvent.setup();

    render(<FlightList onClearFilters={handleClearFilters} />);

    const clearButton = screen.getByRole('button', { name: /clear all filters/i });
    await user.click(clearButton);
    expect(handleClearFilters).toHaveBeenCalledTimes(1);
  });
});
