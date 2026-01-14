import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { formatDuration } from '@/utils/duration';

export interface DurationFilterProps {
  maxDuration: number;
  currentMax: number | null;
  onChange: (duration: number | null) => void;
  disabled?: boolean;
}

export const DurationFilter = ({
  maxDuration,
  currentMax,
  onChange,
  disabled = false,
}: DurationFilterProps) => {
  const [localValue, setLocalValue] = useState(currentMax || maxDuration);

  useEffect(() => {
    setLocalValue(currentMax || maxDuration);
  }, [currentMax, maxDuration]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setLocalValue(value);
  };

  const handleMouseUp = () => {
    if (localValue !== currentMax) {
      onChange(localValue === maxDuration ? null : localValue);
    }
  };

  const percentage = (localValue / maxDuration) * 100;

  return (
    <div className={clsx('space-y-4', disabled && 'opacity-50 pointer-events-none')}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Max Duration</h3>
        <span className="text-sm text-text-secondary">
          {formatDuration(localValue)}
        </span>
      </div>

      <div className="relative pt-2 pb-6">
        <div className="relative h-1 bg-dark-border rounded-full">
          <div
            className="absolute h-1 bg-accent rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <input
          type="range"
          min={0}
          max={maxDuration}
          step={30}
          value={localValue}
          onChange={handleChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          disabled={disabled}
          className="absolute w-full h-1 top-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-dark-bg [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-dark-bg"
        />
      </div>

      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>Any</span>
        <span>{formatDuration(maxDuration)}</span>
      </div>
    </div>
  );
};
