import { formatCurrency } from '@/utils/currency';
import type { TooltipProps } from 'recharts';

interface CustomTooltipPayload {
  price: number;
  count: number;
  range: string;
  displayPrice: string;
  displayCount: string;
}

export const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0].payload as CustomTooltipPayload;

  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg shadow-lg p-3 animate-fade-in">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-text-muted">Price Range</span>
          <span className="text-sm font-medium text-text-primary">{data.range}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-text-muted">Average Price</span>
          <span className="text-lg font-bold text-accent">{formatCurrency(data.price)}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-text-muted">Flights</span>
          <span className="text-sm font-medium text-text-primary">{data.count}</span>
        </div>
      </div>
    </div>
  );
};
