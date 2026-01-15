import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { useCurrency } from '@/features/currency';

export interface PriceRangeFilterProps {
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
  onChange: (min: number, max: number) => void;
  disabled?: boolean;
  currency?: string;
}

export const PriceRangeFilter = ({
  min,
  max,
  currentMin,
  currentMax,
  onChange,
  disabled = false,
  currency = 'USD',
}: PriceRangeFilterProps) => {
  const { convert, format } = useCurrency();
  const [localMin, setLocalMin] = useState(currentMin);
  const [localMax, setLocalMax] = useState(currentMax);

  const convertedMin = convert(min, currency);
  const convertedMax = convert(max, currency);
  const convertedCurrentMin = convert(currentMin, currency);
  const convertedCurrentMax = convert(currentMax, currency);

  useEffect(() => {
    setLocalMin(convertedCurrentMin);
    setLocalMax(convertedCurrentMax);
  }, [convertedCurrentMin, convertedCurrentMax]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setLocalMin(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setLocalMax(value);
  };

  const handleMouseUp = () => {
    if (localMin !== convertedCurrentMin || localMax !== convertedCurrentMax) {
      onChange(localMin, localMax);
    }
  };

  const percentage = ((localMax - convertedMin) / (convertedMax - convertedMin)) * 100;
  const leftPercentage = ((localMin - convertedMin) / (convertedMax - convertedMin)) * 100;

  return (
    <div className={clsx('space-y-4', disabled && 'opacity-50 pointer-events-none')}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Price Range</h3>
        <span className="text-sm text-text-secondary">
          {format(localMin)} - {format(localMax)}
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
          min={convertedMin}
          max={convertedMax}
          value={localMin}
          onChange={handleMinChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          disabled={disabled}
          className="absolute w-full h-1 top-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-dark-bg [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-dark-bg"
          style={{ zIndex: localMin > convertedMax - 100 ? 5 : 3 }}
        />

        <input
          type="range"
          min={convertedMin}
          max={convertedMax}
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
            {format(localMin)}
          </div>
        </div>
        <div className="flex-1">
          <label className="text-xs text-text-muted mb-1 block">Max</label>
          <div className="text-sm font-medium text-text-primary">
            {format(localMax)}
          </div>
        </div>
      </div>
    </div>
  );
};
