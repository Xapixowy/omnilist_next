'use client';

import Button from '@/components/ui/button';
import { cn } from '@/functions/cn';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useFilters } from '../_hooks/use-filters';
import { useTabs } from '../_hooks/use-tabs';
import { Filter } from '../_types/filter';
import FilterGroup from './filter-group';

type FiltersProps = {
  className?: string;
};

export default function Filters({ className = '', ...props }: FiltersProps) {
  const t = useTranslations('pages.search');
  const { filters, setFilters } = useFilters();
  const { tab } = useTabs();

  const [newFilters, setNewFilters] = useState<Filter[]>(filters);

  const handleFilterChange = (filter: string, value: string | null): void => {
    setNewFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      const index = newFilters.findIndex((item) => item.filter === filter);

      if (index !== -1) {
        newFilters[index] = { ...newFilters[index], value };
      }

      return newFilters;
    });
  };

  const handleFilterReset = (): void => {
    setNewFilters(filters);
  };

  const handleFilterApply = (): void => {
    setFilters(newFilters);
  };

  useEffect(() => {
    setNewFilters(filters);
  }, [tab]);

  return (
    <div className={cn('flex flex-col gap-4 ', className)} {...props}>
      {newFilters.map((filter) => (
        <FilterGroup key={filter.filter} {...filter} setFilter={handleFilterChange} />
      ))}
      <div className='flex items-center gap-4 justify-center'>
        <Button onClick={handleFilterReset}>{t('reset')}</Button>
        <Button variant='primary' onClick={handleFilterApply}>
          {t('apply')}
        </Button>
      </div>
    </div>
  );
}
