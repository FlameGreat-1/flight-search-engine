import { useState, useRef } from 'react';
import { clsx } from 'clsx';
import { useOnClickOutside } from '@/hooks';
import { Button } from '@/components/common';
import { PASSENGER_LIMITS } from '@/utils/constants';
import type { PassengerCount } from '@/types';

export interface PassengerSelectorProps {
  value: PassengerCount;
  onChange: (passengers: PassengerCount) => void;
  error?: string;
  disabled?: boolean;
}

export const PassengerSelector = ({
  value,
  onChange,
  error,
  disabled = false,
}: PassengerSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setIsOpen(false));

  const total = value.adults + value.children + value.infants;

  const handleIncrement = (type: keyof PassengerCount) => {
    const newValue = { ...value };
    const currentTotal = total;

    if (currentTotal >= PASSENGER_LIMITS.MAX_TOTAL) return;

    if (type === 'adults' && value.adults < PASSENGER_LIMITS.MAX_ADULTS) {
      newValue.adults += 1;
    } else if (type === 'children' && value.children < PASSENGER_LIMITS.MAX_CHILDREN) {
      newValue.children += 1;
    } else if (type === 'infants' && value.infants < PASSENGER_LIMITS.MAX_INFANTS) {
      if (value.infants < value.adults) {
        newValue.infants += 1;
      }
    }

    onChange(newValue);
  };

  const handleDecrement = (type: keyof PassengerCount) => {
    const newValue = { ...value };

    if (type === 'adults' && value.adults > PASSENGER_LIMITS.MIN_ADULTS) {
      newValue.adults -= 1;
      if (newValue.infants > newValue.adults) {
        newValue.infants = newValue.adults;
      }
    } else if (type === 'children' && value.children > PASSENGER_LIMITS.MIN_CHILDREN) {
      newValue.children -= 1;
    } else if (type === 'infants' && value.infants > PASSENGER_LIMITS.MIN_INFANTS) {
      newValue.infants -= 1;
    }

    onChange(newValue);
  };

  const getPassengerLabel = () => {
    const parts = [];
    if (value.adults > 0) parts.push(`${value.adults} Adult${value.adults > 1 ? 's' : ''}`);
    if (value.children > 0) parts.push(`${value.children} Child${value.children > 1 ? 'ren' : ''}`);
    if (value.infants > 0) parts.push(`${value.infants} Infant${value.infants > 1 ? 's' : ''}`);
    return parts.join(', ') || '0 Passengers';
  };

  return (
    <div ref={containerRef} className="relative">
      <div>
        <label className="label">Passengers</label>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className={clsx(
            'input w-full text-left flex items-center justify-between',
            error && 'border-error',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className="text-text-primary">{getPassengerLabel()}</span>
          <svg
            className={clsx(
              'w-5 h-5 text-text-muted transition-transform',
              isOpen && 'rotate-180'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {error && <p className="mt-1.5 text-sm text-error">{error}</p>}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-dark-surface border border-dark-border rounded-lg shadow-lg p-4 animate-slide-down">
          <div className="space-y-4">
            <PassengerControl
              label="Adults"
              description="12+ years"
              value={value.adults}
              onIncrement={() => handleIncrement('adults')}
              onDecrement={() => handleDecrement('adults')}
              canIncrement={value.adults < PASSENGER_LIMITS.MAX_ADULTS && total < PASSENGER_LIMITS.MAX_TOTAL}
              canDecrement={value.adults > PASSENGER_LIMITS.MIN_ADULTS}
            />

            <PassengerControl
              label="Children"
              description="2-11 years"
              value={value.children}
              onIncrement={() => handleIncrement('children')}
              onDecrement={() => handleDecrement('children')}
              canIncrement={value.children < PASSENGER_LIMITS.MAX_CHILDREN && total < PASSENGER_LIMITS.MAX_TOTAL}
              canDecrement={value.children > PASSENGER_LIMITS.MIN_CHILDREN}
            />

            <PassengerControl
              label="Infants"
              description="Under 2 years"
              value={value.infants}
              onIncrement={() => handleIncrement('infants')}
              onDecrement={() => handleDecrement('infants')}
              canIncrement={value.infants < PASSENGER_LIMITS.MAX_INFANTS && value.infants < value.adults && total < PASSENGER_LIMITS.MAX_TOTAL}
              canDecrement={value.infants > PASSENGER_LIMITS.MIN_INFANTS}
            />
          </div>

          <div className="mt-4 pt-4 border-t border-dark-border">
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={() => setIsOpen(false)}
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

interface PassengerControlProps {
  label: string;
  description: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  canIncrement: boolean;
  canDecrement: boolean;
}

const PassengerControl = ({
  label,
  description,
  value,
  onIncrement,
  onDecrement,
  canIncrement,
  canDecrement,
}: PassengerControlProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-text-primary">{label}</div>
        <div className="text-xs text-text-muted">{description}</div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrement}
          disabled={!canDecrement}
          className={clsx(
            'w-8 h-8 rounded-full border transition-smooth',
            'flex items-center justify-center',
            canDecrement
              ? 'border-accent text-accent hover:bg-accent hover:text-dark-bg'
              : 'border-dark-border text-text-muted cursor-not-allowed'
          )}
          aria-label={`Decrease ${label}`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="w-8 text-center font-medium text-text-primary">{value}</span>
        <button
          type="button"
          onClick={onIncrement}
          disabled={!canIncrement}
          className={clsx(
            'w-8 h-8 rounded-full border transition-smooth',
            'flex items-center justify-center',
            canIncrement
              ? 'border-accent text-accent hover:bg-accent hover:text-dark-bg'
              : 'border-dark-border text-text-muted cursor-not-allowed'
          )}
          aria-label={`Increase ${label}`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
};
