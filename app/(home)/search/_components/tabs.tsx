'use client';

import { cn } from '@/functions/cn';
import { useTranslations } from 'next-intl';
import { PAGE_CONFIG } from '../_configs/page-config';
import { useTabs } from '../_hooks/use-tabs';

type TabsProps = {
  className?: string;
};

export default function Tabs({ className = '', ...props }: TabsProps) {
  const t = useTranslations('pages.search.tabs');
  const { tab, changeTab } = useTabs();

  return (
    <div className={cn('flex', className)} {...props}>
      {PAGE_CONFIG.tabs.map(({ icon: Icon, name, value }) => (
        <button
          key={value}
          className={cn(
            'flex gap-2 items-center rounded-lg font-semibold px-4 py-2 cursor-pointer text-zinc-400 hover:text-zinc-50 transition-colors',
            tab === value && 'text-zinc-50 bg-my-primary-700',
          )}
          onClick={() => changeTab(value)}
        >
          <Icon />
          <span className='text-sm'>{t(name)}</span>
        </button>
      ))}
    </div>
  );
}
