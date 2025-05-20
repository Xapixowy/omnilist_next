'use client';

import { cn } from '@/functions/cn';
import { useTranslations } from 'next-intl';
import { TbSearch } from 'react-icons/tb';
import { useSearchBarContext } from '../_contexts/use-search-bar';

type SearchBarButtonProps = {
  onClick?: () => void;
  className?: string;
};

export default function SearchBarButton({ onClick, className = '' }: SearchBarButtonProps) {
  const t = useTranslations('layouts.home');
  const { setIsOpen } = useSearchBarContext();

  const clickHandler = (): void => {
    setIsOpen(true);
    onClick?.();
  };

  return (
    <div
      className={cn(
        'sm:h-10 sm:w-10 sm:p-0 lg:w-64 px-8 py-6 lg:px-3 lg:py-2 sm:rounded-full sm:outline outline-zinc-200/30 hover:outline-zinc-50/50 border-t border-zinc-600 sm:border-t-none flex items-center justify-center gap-2 cursor-pointer transition-colors',
        className,
      )}
      onClick={clickHandler}
    >
      <TbSearch className='text-xl' />
      <div className='block sm:hidden lg:block flex-1'>{t('search')}...</div>
    </div>
  );
}
