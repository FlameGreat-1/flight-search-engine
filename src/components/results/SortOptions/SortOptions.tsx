import { Select } from '@/components/common';
import { SORT_OPTIONS } from '@/utils/constants';
import type { SortOption } from '@/types';

export interface SortOptionsProps {
  value: SortOption;
  onChange: (sortBy: SortOption) => void;
  disabled?: boolean;
}

export const SortOptions = ({ value, onChange, disabled = false }: SortOptionsProps) => {
  const options = Object.entries(SORT_OPTIONS).map(([key, label]) => ({
    value: key,
    label,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as SortOption);
  };

  return (
    <Select
      label="Sort by"
      options={options}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};
