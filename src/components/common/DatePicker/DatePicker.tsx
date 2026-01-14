import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { formatDateForAPI, getMinDate, getMaxDate } from '@/utils/date';

export interface DatePickerProps {
  label?: string;
  error?: string;
  helperText?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  id?: string;
  className?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      label,
      error,
      helperText,
      value,
      onChange,
      minDate,
      maxDate,
      disabled = false,
      fullWidth = false,
      placeholder,
      id,
      className,
    },
    ref
  ) => {
    const inputId = id || `datepicker-${Math.random().toString(36).substr(2, 9)}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const dateValue = e.target.value;
      if (dateValue) {
        onChange(new Date(dateValue));
      } else {
        onChange(null);
      }
    };

    const formattedValue = value ? formatDateForAPI(value) : '';
    const formattedMinDate = minDate ? formatDateForAPI(minDate) : formatDateForAPI(getMinDate());
    const formattedMaxDate = maxDate ? formatDateForAPI(maxDate) : formatDateForAPI(getMaxDate());

    return (
      <div className={clsx('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={inputId} className="label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type="date"
          id={inputId}
          value={formattedValue}
          onChange={handleChange}
          min={formattedMinDate}
          max={formattedMaxDate}
          disabled={disabled}
          placeholder={placeholder}
          className={clsx(
            'input',
            error && 'border-error focus:border-error focus:ring-error',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-error">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
