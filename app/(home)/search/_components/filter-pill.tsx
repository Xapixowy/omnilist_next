'use client';

import { cn } from '@/functions/cn';
import { useTranslations } from 'next-intl';
import { TbX } from 'react-icons/tb';
import { ChosenFilter } from '../_types/chosen-filter';

type FilterPillProps = ChosenFilter & {
  clickHandler: () => void;
  className?: string;
};

export default function FilterPill({ name, value, clickHandler, className = '', ...props }: FilterPillProps) {
  const t = useTranslations('pages.search.filters');

  const formattedValue = (): string => {
    if (value === null) {
      return '-';
    }

    if (value === 'true' || value === 'false') {
      return value === 'true' ? t('yes') : t('no');
    }

    if (value.includes(',')) {
      return value.split(',').join(', ');
    }

    return value;
  };

  return (
    <div
      onClick={clickHandler}
      className={cn(
        'bg-my-primary-700/30 hover:bg-my-primary-700/50 rounded-full px-2 inline-flex gap-1 items-center text-sm text-zinc-400 hover:text-zinc-50 transition-colors cursor-pointer',
        className,
      )}
      {...props}
    >
      <span className='font-semibold'>{t(name)}:</span>
      <span>{formattedValue()}</span>
      <TbX className='text-xs' />
    </div>
  );
}
