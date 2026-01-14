import { clsx } from 'clsx';
import type { TripType } from '@/types';

export interface TripTypeSelectorProps {
  value: TripType;
  onChange: (tripType: TripType) => void;
  disabled?: boolean;
}

export const TripTypeSelector = ({
  value,
  onChange,
  disabled = false,
}: TripTypeSelectorProps) => {
  const options: Array<{ value: TripType; label: string }> = [
    { value: 'round-trip', label: 'Round Trip' },
    { value: 'one-way', label: 'One Way' },
  ];

  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          disabled={disabled}
          className={clsx(
            'flex-1 px-4 py-2 rounded-lg font-medium transition-smooth',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark-bg',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            value === option.value
              ? 'bg-accent text-dark-bg'
              : 'bg-dark-surface text-text-secondary hover:bg-dark-bg hover:text-text-primary border border-dark-border'
          )}
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
