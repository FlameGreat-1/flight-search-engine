import { clsx } from 'clsx';
import type { PriceTrend } from '@/types';

export interface PriceTrendIndicatorProps {
  trend: PriceTrend | null;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  className?: string;
}

export const PriceTrendIndicator = ({
  trend,
  size = 'md',
  showPercentage = true,
  className,
}: PriceTrendIndicatorProps) => {
  if (!trend) {
    return null;
  }

  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const getTrendColor = () => {
    switch (trend.trend) {
      case 'up':
        return 'text-error';
      case 'down':
        return 'text-success';
      case 'stable':
        return 'text-text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const getTrendIcon = () => {
    switch (trend.trend) {
      case 'up':
        return (
          <svg
            className={iconSizes[size]}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        );
      case 'down':
        return (
          <svg
            className={iconSizes[size]}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
          </svg>
        );
      case 'stable':
        return (
          <svg
            className={iconSizes[size]}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h14"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTrendText = () => {
    const percentage = showPercentage ? ` ${Math.abs(trend.percentageChange)}%` : '';
    switch (trend.trend) {
      case 'up':
        return `Up${percentage}`;
      case 'down':
        return `Down${percentage}`;
      case 'stable':
        return 'Stable';
      default:
        return '';
    }
  };

  return (
    <div
      className={clsx(
        'inline-flex items-center gap-1 font-medium',
        sizes[size],
        getTrendColor(),
        className
      )}
    >
      {getTrendIcon()}
      <span>{getTrendText()}</span>
    </div>
  );
};
