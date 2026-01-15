import { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { useCurrency } from '@/features/currency';
import { useOnClickOutside } from '@/hooks';
import { CURRENCY_SYMBOLS } from '@/types/currency';
import { getCurrencyName } from '@/utils/currency';
import { CURRENCY_TO_COUNTRY } from '@/utils/currencyFlags';

export interface CurrencySelectorProps {
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
}

export const CurrencySelector = ({
  className,
  showLabel = false,
  compact = false,
}: CurrencySelectorProps) => {
  const { selectedCurrency, exchangeRates, isLoading, changeCurrency, symbol } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const availableCurrencies = exchangeRates
    ? Object.keys(exchangeRates.rates).sort((a, b) => {
        const nameA = getCurrencyName(a);
        const nameB = getCurrencyName(b);
        return nameA.localeCompare(nameB);
      })
    : [selectedCurrency];

  const filteredCurrencies = availableCurrencies.filter((code) => {
    const name = getCurrencyName(code).toLowerCase();
    const query = searchQuery.toLowerCase();
    return code.toLowerCase().includes(query) || name.includes(query);
  });

  const handleSelect = (currency: string) => {
    changeCurrency(currency);
    setIsOpen(false);
    setSearchQuery('');
  };

  useEffect(() => {
    if (isOpen && searchQuery) {
      setSearchQuery('');
    }
  }, [isOpen]);

  const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR', 'AUD', 'CAD'];
  const isPopular = (code: string) => popularCurrencies.includes(code);

  return (
    <div className={clsx('relative', className)} ref={dropdownRef}>
      {showLabel && (
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          Currency
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className={clsx(
          'flex items-center gap-2 rounded-lg border border-dark-border',
          'bg-dark-surface text-text-primary transition-smooth',
          'hover:border-dark-border-hover focus:outline-none focus:ring-2 focus:ring-accent',
          isLoading && 'opacity-50 cursor-not-allowed',
          compact ? 'px-3 py-2 text-sm' : 'px-4 py-2.5'
        )}
        aria-label="Select currency"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {CURRENCY_TO_COUNTRY[selectedCurrency] && (
          <span className={`fi fi-${CURRENCY_TO_COUNTRY[selectedCurrency].toLowerCase()} ${compact ? 'text-base' : 'text-lg'}`}></span>
        )}
        <span className="font-medium">{symbol}</span>
        <span className={clsx('font-medium', compact && 'hidden sm:inline')}>
          {selectedCurrency}
        </span>
        <svg
          className={clsx('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={clsx(
            'absolute right-0 mt-2 w-80 rounded-lg border border-dark-border',
            'bg-dark-surface shadow-xl z-50 overflow-hidden'
          )}
          role="listbox"
        >
          <div className="p-3 border-b border-dark-border">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search currencies..."
              className={clsx(
                'w-full px-3 py-2 rounded-lg border border-dark-border',
                'bg-dark-bg text-text-primary placeholder-text-muted',
                'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
              )}
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredCurrencies.length === 0 ? (
              <div className="px-4 py-8 text-center text-text-muted">
                No currencies found
              </div>
            ) : (
              <>
                {!searchQuery && (
                  <div className="px-3 py-2 border-b border-dark-border">
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
                      Popular
                    </p>
                  </div>
                )}

                {filteredCurrencies
                  .filter((code) => !searchQuery && isPopular(code))
                  .map((code) => (
                    <CurrencyOption
                      key={code}
                      code={code}
                      isSelected={code === selectedCurrency}
                      onSelect={handleSelect}
                    />
                  ))}

                {!searchQuery && (
                  <div className="px-3 py-2 border-b border-dark-border">
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
                      All Currencies
                    </p>
                  </div>
                )}

                {filteredCurrencies
                  .filter((code) => searchQuery || !isPopular(code))
                  .map((code) => (
                    <CurrencyOption
                      key={code}
                      code={code}
                      isSelected={code === selectedCurrency}
                      onSelect={handleSelect}
                    />
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface CurrencyOptionProps {
  code: string;
  isSelected: boolean;
  onSelect: (code: string) => void;
}

const CurrencyOption = ({ code, isSelected, onSelect }: CurrencyOptionProps) => {
  const symbol = CURRENCY_SYMBOLS[code] || code;
  const name = getCurrencyName(code);
  const countryCode = CURRENCY_TO_COUNTRY[code];

  return (
    <button
      type="button"
      onClick={() => onSelect(code)}
      className={clsx(
        'w-full px-4 py-3 flex items-center justify-between gap-3',
        'hover:bg-dark-bg transition-smooth text-left',
        isSelected && 'bg-dark-bg'
      )}
      role="option"
      aria-selected={isSelected}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {countryCode ? (
          <span className={`fi fi-${countryCode.toLowerCase()} text-xl flex-shrink-0`}></span>
        ) : (
          <span className="w-6 h-4 bg-gray-600 rounded flex-shrink-0"></span>
        )}
        <span className="text-lg font-medium text-text-primary w-8 text-center flex-shrink-0">
          {symbol}
        </span>
        <p className="text-sm text-text-muted truncate">{name}</p>
      </div>
      {isSelected && (
        <svg
          className="w-5 h-5 text-accent flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
};
