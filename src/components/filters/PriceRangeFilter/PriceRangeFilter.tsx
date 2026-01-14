import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { formatCurrency } from '@/utils/currency';

export interface PriceRangeFilterProps {
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
  onChange: (min: number, max: number) => void;
  disabled?: boolean;
}

export const PriceRangeFilter = ({
  min,
  max,
  currentMin,
  currentMax,
  onChange,
  disabled = false,
}: PriceRangeFilterProps) => {
  const [localMin, setLocalMin] = useState(currentMin);
  const [localMax, setLocalMax] = useState(currentMax);

  useEffect(() => {
    setLocalMin(currentMin);
    setLocalMax(currentMax);
  }, [currentMin, currentMax]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setLocalMin(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setLocalMax(value);
  };

  const handleMouseUp = () => {
    if (localMin !== currentMin || localMax !== currentMax) {
      onChange(localMin, localMax);
    }
  };

  const percentage = ((localMax - min) / (max - min)) * 100;
  const leftPercentage = ((localMin - min) / (max - min)) * 100;

  return (
    <div className={clsx('space-y-4', disabled && 'opacity-50 pointer-events-none')}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Price Range</h3>
        <span className="text-sm text-text-secondary">
          {formatCurrency(localMin)} - {formatCurrency(localMax)}
        </span>
      </div>

      <div className="relative pt-2 pb-6">
        <div className="relative h-1 bg-dark-border rounded-full">
          <div
            className="absolute h-1 bg-accent rounded-full"
            style={{
              left: `${leftPercentage}%`,
              right: `${100 - percentage}%`,
            }}
          />
        </div>

        <input
          type="range"
          min={min}
          max={max}
          value={localMin}
          onChange={handleMinChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          disabled={disabled}
          className="absolute w-full h-1 top-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-dark-bg [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-dark-bg"
          style={{ zIndex: localMin > max - 100 ? 5 : 3 }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={localMax}
          onChange={handleMaxChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          disabled={disabled}
          className="absolute w-full h-1 top-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-dark-bg [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-dark-bg"
          style={{ zIndex: 4 }}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <label className="text-xs text-text-muted mb-1 block">Min</label>
          <div className="text-sm font-medium text-text-primary">
            {formatCurrency(localMin)}
          </div>
        </div>
        <div className="flex-1">
          <label className="text-xs text-text-muted mb-1 block">Max</label>
          <div className="text-sm font-medium text-text-primary">
            {formatCurrency(localMax)}
          </div>
        </div>
      </div>
    </div>
  );
};
