import { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { useAirportSearch } from './useAirportSearch';
import { useOnClickOutside } from '@/hooks';
import { Input } from '@/components/common';
import type { Airport } from '@/types';

export interface AirportAutocompleteProps {
  label: string;
  value: Airport | null;
  onChange: (airport: Airport | null) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const AirportAutocomplete = ({
  label,
  value,
  onChange,
  error,
  placeholder = 'Search airports...',
  disabled = false,
}: AirportAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { keyword, updateKeyword, airports, isLoading } = useAirportSearch(
    value?.name || ''
  );

  useOnClickOutside(containerRef, () => setIsOpen(false));

  useEffect(() => {
    if (value && keyword !== value.name) {
      updateKeyword(value.name);
    }
  }, [value, keyword, updateKeyword]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    updateKeyword(newValue);
    setIsOpen(true);
    setSelectedIndex(-1);
    if (!newValue) {
      onChange(null);
    }
  };

  const handleSelect = (airport: Airport) => {
    onChange(airport);
    updateKeyword(airport.name);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || airports.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < airports.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < airports.length) {
          handleSelect(airports[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleFocus = () => {
    if (keyword.length >= 2) {
      setIsOpen(true);
    }
  };

  const showDropdown = isOpen && (airports.length > 0 || isLoading);

  return (
    <div ref={containerRef} className="relative">
      <Input
        ref={inputRef}
        label={label}
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        autoComplete="off"
        aria-autocomplete="list"
        aria-controls="airport-listbox"
        aria-expanded={isOpen}
      />

      {showDropdown && (
        <div
          id="airport-listbox"
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-dark-surface border border-dark-border rounded-lg shadow-lg max-h-60 overflow-auto animate-slide-down"
        >
          {isLoading && (
            <div className="px-4 py-3 text-sm text-text-muted">
              Searching airports...
            </div>
          )}

          {!isLoading && airports.length === 0 && keyword.length >= 2 && (
            <div className="px-4 py-3 text-sm text-text-muted">
              No airports found
            </div>
          )}

          {!isLoading &&
            airports.map((airport, index) => (
              <button
                key={airport.iataCode}
                role="option"
                aria-selected={index === selectedIndex}
                onClick={() => handleSelect(airport)}
                className={clsx(
                  'w-full px-4 py-3 text-left transition-smooth',
                  'hover:bg-dark-bg focus:bg-dark-bg focus:outline-none',
                  index === selectedIndex && 'bg-dark-bg'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-text-primary">
                        {airport.iataCode}
                      </span>
                      <span className="text-sm text-text-secondary truncate">
                        {airport.name}
                      </span>
                    </div>
                    <div className="text-xs text-text-muted mt-0.5">
                      {airport.cityName}, {airport.countryName}
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-text-muted flex-shrink-0 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
