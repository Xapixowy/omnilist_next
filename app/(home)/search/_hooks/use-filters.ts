import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PAGE_CONFIG } from '../_configs/page-config';
import { ChosenFilter } from '../_types/chosen-filter';
import { Filter } from '../_types/filter';
import { useTabs } from './use-tabs';

export const FILTER_PREFIX = 'filter_';

export const useFilters = (): {
  filters: Filter[];
  chosenFilters: ChosenFilter[];
  setFilter: (filter: string, value: string | null) => void;
} => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { tab } = useTabs();
  const filters = tab ? PAGE_CONFIG.filters[tab] : [];
  const chosenFilters = filters
    .map(({ name, filter }) => ({
      name,
      filter,
      value: searchParams.get(`${FILTER_PREFIX}${filter}`) ?? null,
    }))
    .filter((filter) => filter.value !== null);

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

  return {
    filters,
    setFilter,
    chosenFilters,
  };
};
