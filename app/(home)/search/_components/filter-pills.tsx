'use client';

import { cn } from '@/functions/cn';
import { useFilters } from '../_hooks/use-filters';
import FilterPill from './filter-pill';

type FilterPillsProps = {
  className?: string;
};

export default function FilterPills({ className = '', ...props }: FilterPillsProps) {
  const { filters, setFilter } = useFilters();

  const chosenFilters = filters.filter((filter) => filter.value !== null);

  const handleClick = (filter: string): (() => void) => {
    return () => setFilter(filter, null);
  };

  if (filters.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)} {...props}>
      {chosenFilters
        .filter((filter) => filter.value !== null)
        .map((item, index) => (
          <FilterPill
            key={index}
            filter={item.filter}
            name={item.name}
            value={item.value}
            clickHandler={handleClick(item.filter)}
          />
        ))}
    </div>
  );
}
