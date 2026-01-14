import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PriceGraph } from './PriceGraph';

vi.mock('./usePriceGraphData', () => ({
  usePriceGraphData: () => ({
    data: [
      { price: 300, count: 5, range: '$200-$400', displayPrice: '$300', displayCount: '5 flights' },
      { price: 500, count: 8, range: '$400-$600', displayPrice: '$500', displayCount: '8 flights' },
      { price: 700, count: 3, range: '$600-$800', displayPrice: '$700', displayCount: '3 flights' },
    ],
    priceRange: { min: 200, max: 800 },
    averagePrice: 500,
    lowestPrice: 300,
    trend: { trend: 'down', percentageChange: -5, lowest: 300, highest: 700 },
    insights: ['Prices are trending down by 5%', '3 great deals available'],
    hasData: true,
    isEmpty: false,
  }),
}));

describe('PriceGraph', () => {
  it('renders price trends heading', () => {
    render(<PriceGraph />);
    expect(screen.getByText(/price trends/i)).toBeInTheDocument();
  });

  it('displays lowest and average prices', () => {
    render(<PriceGraph />);
    expect(screen.getByText(/lowest/i)).toBeInTheDocument();
    expect(screen.getByText(/average/i)).toBeInTheDocument();
    expect(screen.getByText('$300')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
  });

  it('shows trend indicator', () => {
    render(<PriceGraph />);
    expect(screen.getByText(/trending down 5%/i)).toBeInTheDocument();
  });

  it('displays insights', () => {
    render(<PriceGraph />);
    expect(screen.getByText(/prices are trending down by 5%/i)).toBeInTheDocument();
    expect(screen.getByText(/3 great deals available/i)).toBeInTheDocument();
  });
});

describe('PriceGraph - Empty State', () => {
  it('shows empty state when no data', () => {
    vi.mock('./usePriceGraphData', () => ({
      usePriceGraphData: () => ({
        data: [],
        priceRange: { min: 0, max: 1000 },
        averagePrice: 0,
        lowestPrice: 0,
        trend: null,
        insights: [],
        hasData: false,
        isEmpty: true,
      }),
    }));

    render(<PriceGraph />);
    expect(screen.getByText(/no price data/i)).toBeInTheDocument();
    expect(screen.getByText(/search for flights to see price trends/i)).toBeInTheDocument();
  });
});
