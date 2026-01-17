import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClientProvider } from '@tanstack/react-query';
import { SearchForm } from './SearchForm';
import { queryClient } from '@/lib';

vi.mock('@/features/search', () => ({
  useFlightSearch: () => ({
    searchFlights: vi.fn(),
    isLoading: false,
    error: null,
    isSuccess: false,
  }),
  useSearchHistory: () => ({
    addToHistory: vi.fn(),
    history: [],
    removeFromHistory: vi.fn(),
    clearHistory: vi.fn(),
    getRecentSearches: vi.fn(() => []),
  }),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('SearchForm', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('renders all form fields', () => {
    render(<SearchForm />, { wrapper });

    const searchFlightsElements = screen.getAllByText(/search/i);
    expect(searchFlightsElements.length).toBeGreaterThan(0);
    
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/departure date/i)).toBeInTheDocument();
    
    const passengersElements = screen.getAllByText(/passengers/i);
    expect(passengersElements.length).toBeGreaterThan(0);
    
    expect(screen.getByLabelText(/cabin class/i)).toBeInTheDocument();
  });

  it('renders trip type selector with both options', () => {
    render(<SearchForm />, { wrapper });

    expect(screen.getByRole('button', { name: /round trip/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /one way/i })).toBeInTheDocument();
  });

  it('shows return date field for round trip', () => {
    render(<SearchForm />, { wrapper });

    expect(screen.getByLabelText(/return date/i)).toBeInTheDocument();
  });

  it('hides return date field for one way trip', async () => {
    const user = userEvent.setup();
    render(<SearchForm />, { wrapper });

    const oneWayButton = screen.getByRole('button', { name: /one way/i });
    await user.click(oneWayButton);

    await waitFor(() => {
      expect(screen.queryByLabelText(/return date/i)).not.toBeInTheDocument();
    });
  });

  it('renders swap locations button', () => {
    render(<SearchForm />, { wrapper });

    const swapButton = screen.getByLabelText(/swap origin and destination/i);
    expect(swapButton).toBeInTheDocument();
  });

  it('renders search button', () => {
    render(<SearchForm />, { wrapper });

    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('displays cabin class options', () => {
    render(<SearchForm />, { wrapper });

    const select = screen.getByLabelText(/cabin class/i);
    expect(select).toBeInTheDocument();
  });
});
