import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FlightCard } from './FlightCard';
import type { Flight } from '@/types';

const mockFlight: Flight = {
  id: '1',
  itineraries: [
    {
      duration: 300,
      segments: [
        {
          id: 'seg1',
          departure: {
            iataCode: 'JFK',
            terminal: '4',
            at: new Date('2024-01-15T10:00:00'),
          },
          arrival: {
            iataCode: 'LAX',
            terminal: '1',
            at: new Date('2024-01-15T13:00:00'),
          },
          carrierCode: 'AA',
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
  price: {
    currency: 'USD',
    total: 500,
    base: 450,
    fees: 50,
    perAdult: 500,
  },
  validatingAirlineCodes: ['AA'],
  numberOfBookableSeats: 5,
  instantTicketingRequired: false,
  cabinClass: 'ECONOMY',
  departureDate: new Date('2024-01-15T10:00:00'),
  arrivalDate: new Date('2024-01-15T13:00:00'),
  totalDuration: 300,
  totalStops: 0,
  airlines: ['American Airlines'],
};

describe('FlightCard', () => {
  it('renders flight information', () => {
    render(<FlightCard flight={mockFlight} />);

    expect(screen.getByText(/american airlines/i)).toBeInTheDocument();
    expect(screen.getByText('JFK')).toBeInTheDocument();
    expect(screen.getByText('LAX')).toBeInTheDocument();
  });

  it('displays price correctly', () => {
    render(<FlightCard flight={mockFlight} />);

    expect(screen.getByText('$500')).toBeInTheDocument();
    expect(screen.getByText('$500 per adult')).toBeInTheDocument();
  });

  it('shows direct flight badge', () => {
    render(<FlightCard flight={mockFlight} />);

    expect(screen.getByText(/direct/i)).toBeInTheDocument();
  });

  it('calls onSelect when clicked', async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();
    render(<FlightCard flight={mockFlight} onSelect={handleSelect} />);

    await user.click(screen.getByRole('button', { name: /select flight/i }));
    expect(handleSelect).toHaveBeenCalledWith(mockFlight);
  });

  it('shows low seat warning when seats are limited', () => {
    const limitedFlight = { ...mockFlight, numberOfBookableSeats: 3 };
    render(<FlightCard flight={limitedFlight} />);

    expect(screen.getByText(/only 3 seats left/i)).toBeInTheDocument();
  });

  it('displays cabin class', () => {
    render(<FlightCard flight={mockFlight} />);

    expect(screen.getByText(/economy/i)).toBeInTheDocument();
  });
});
