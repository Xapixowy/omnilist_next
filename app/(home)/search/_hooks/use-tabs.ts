import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { PAGE_CONFIG } from '../_configs/page-config';
import { MediaType } from '../_enums/media-type';

export const DEFAULT_TAB = MediaType.ALL;

export const useTabs = (): {
  tab: MediaType;
  changeTab: (tab: MediaType) => void;
} => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentTab = searchParams?.get('tab') ?? '';
  const possibleTabs = PAGE_CONFIG.tabs.map(({ value }) => value.toString());
  const tab = possibleTabs.includes(currentTab) ? (currentTab as MediaType) : null;

  const changeTab = useCallback(
    (tab: MediaType): void => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('tab', tab);
      const newUrl = `${pathname}?${newSearchParams.toString()}`;

      router.push(newUrl);
    },
    [searchParams, pathname, router],
  );

  useEffect(() => {
    if (tab === null) {
      changeTab(DEFAULT_TAB);
    }
  }, [changeTab, tab]);

  return { tab: tab ?? DEFAULT_TAB, changeTab };
};
