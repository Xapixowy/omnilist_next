import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PAGE_CONFIG } from '../_configs/page-config';
import { Filter } from '../_types/filter';
import { useTabs } from './use-tabs';

export const FILTER_PREFIX = 'filter_';

export const useFilters = (): {
  filters: Filter[];
  setFilter: (filter: string, value: string | null) => void;
  setFilters: (filters: Filter[]) => void;
} => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { tab } = useTabs();

  const filters = PAGE_CONFIG.filters[tab].map((filter) => ({
    ...filter,
    value: searchParams.get(`${FILTER_PREFIX}${filter.filter}`) ?? filter.value,
  }));

  const setFilter = (filter: string, value: string | null): void => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (value === null) {
      newSearchParams.delete(`${FILTER_PREFIX}${filter}`);
    } else {
      newSearchParams.set(`${FILTER_PREFIX}${filter}`, value);
    }

    const newUrl = `${pathname}?${newSearchParams.toString()}`;

    router.push(newUrl);
  };

  const setFilters = (newFilters: Filter[]): void => {
    const newSearchParams = new URLSearchParams(searchParams);

    newFilters.forEach((filter) => {
      if (filter.value === null) {
        newSearchParams.delete(`${FILTER_PREFIX}${filter.filter}`);
      } else {
        newSearchParams.set(`${FILTER_PREFIX}${filter.filter}`, filter.value);
      }
    });

    const newUrl = `${pathname}?${newSearchParams.toString()}`;

    router.push(newUrl);
  };

  return {
    filters,
    setFilter,
    setFilters,
  };
};
