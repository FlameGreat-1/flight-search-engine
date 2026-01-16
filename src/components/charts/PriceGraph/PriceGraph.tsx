import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { usePriceGraphData } from './usePriceGraphData';
import { CustomTooltip } from './CustomTooltip';
import { useCurrency } from '@/features/currency';
import { clsx } from 'clsx';

export interface PriceGraphProps {
  className?: string;
}

export const PriceGraph = ({ className }: PriceGraphProps) => {
  const { data, priceRange, averagePrice, lowestPrice, trend, insights, isEmpty } =
    usePriceGraphData();
  const { convertAndFormat, symbol } = useCurrency();

  if (isEmpty) {
    return (
      <div className={clsx('card p-8', className)}>
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-text-muted mb-4"
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
          <h3 className="text-lg font-semibold text-text-primary mb-2">No Price Data</h3>
          <p className="text-sm text-text-secondary">
            Search for flights to see price trends
          </p>
        </div>
      </div>
    );
  }

  const hasMultipleDataPoints = data.length > 1;
  const priceVariation = lowestPrice > 0 
    ? ((averagePrice - lowestPrice) / lowestPrice) * 100 
    : 0;
  const hasLowVariation = priceVariation < 5;

  return (
    <div className={clsx('card p-6 space-y-6', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-1">Price Trends</h2>
          <p className="text-sm text-text-secondary">
            {hasMultipleDataPoints 
              ? 'Price distribution across flight options (updates as you filter)'
              : 'Showing price for available flights'}
          </p>
        </div>

        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-xs text-text-muted mb-1">Lowest</div>
            <div className="text-lg font-bold text-success">
              {convertAndFormat(lowestPrice, 'USD')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-text-muted mb-1">Average</div>
            <div className="text-lg font-bold text-accent">
              {convertAndFormat(averagePrice, 'USD')}
            </div>
          </div>
        </div>
      </div>

      {!hasMultipleDataPoints && (
        <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
          <p className="text-xs text-accent-light">
            💡 Apply different filters to see price variations across flight options
          </p>
        </div>
      )}

      {trend && hasMultipleDataPoints && (
        <div className="flex items-center gap-2 text-sm">
          {trend.trend === 'up' && (
            <div className="flex items-center gap-1 text-error">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span>Trending up {trend.percentageChange}%</span>
            </div>
          )}
          {trend.trend === 'down' && (
            <div className="flex items-center gap-1 text-success">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
              <span>Trending down {Math.abs(trend.percentageChange)}%</span>
            </div>
          )}
          {trend.trend === 'stable' && (
            <div className="flex items-center gap-1 text-text-secondary">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14"
                />
              </svg>
              <span>Stable prices</span>
            </div>
          )}
        </div>
      )}

      {insights.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {insight}
            </div>
          ))}
        </div>
      )}

      {hasLowVariation && hasMultipleDataPoints && (
        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <p className="text-xs text-warning">
            ℹ️ Prices are very similar across options. Try adjusting filters to see more variation.
          </p>
        </div>
      )}

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" opacity={0.3} />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickLine={{ stroke: '#2a2a2a' }}
            />
            <YAxis
              domain={[priceRange.min, priceRange.max]}
              stroke="#6b7280"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickLine={{ stroke: '#2a2a2a' }}
              tickFormatter={(value) => `${symbol}${Math.round(value)}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#8b5cf6', strokeWidth: 1 }} />
            <ReferenceLine
              y={averagePrice}
              stroke="#8b5cf6"
              strokeDasharray="5 5"
              strokeOpacity={0.5}
              label={{
                value: 'Avg',
                fill: '#8b5cf6',
                fontSize: 11,
                position: 'right',
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="url(#priceGradient)"
              dot={{ fill: '#8b5cf6', r: 4 }}
              activeDot={{ r: 6, fill: '#a78bfa' }}
              animationDuration={300}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {trend && trend.goodDeals > 0 && hasMultipleDataPoints && (
        <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
          <p className="text-sm text-success">
            ✨ {trend.goodDeals} {trend.goodDeals === 1 ? 'great deal' : 'great deals'} available below average price
          </p>
        </div>
      )}
    </div>
  );
};
