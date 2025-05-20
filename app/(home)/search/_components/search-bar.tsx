'use client';

import Button from '@/components/ui/button';
import { cn } from '@/functions/cn';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { TbSearch } from 'react-icons/tb';
import { useQuery } from '../_hooks/use-query';

type SearchBarProps = {
  className?: string;
};

export default function SearchBar({ className = '', ...props }: SearchBarProps) {
  const t = useTranslations('pages.search');
  const { query: paramQuery, setQuery: setParamQuery } = useQuery();
  const [query, setQuery] = useState(paramQuery ?? '');

  const submitHandler = (): void => {
    setParamQuery(query);
  };

  return (
    <label
      className={cn(
        'cursor-pointer rounded-lg border border-zinc-700 flex items-center gap-3 focus-within:border-zinc-400 hover:border-zinc-400 transition-colors group',
        className,
      )}
      {...props}
    >
      <input
        type='text'
        placeholder={t('search_movies_tv_shows_and_more')}
        className='focus-visible:outline-0 flex-1 px-4 py-2'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Button
        variant='default'
        size='large'
        className='h-full grid place-items-center px-4 border-l border-l-zinc-700 group-hover:border-l-zinc-400 transition-colors group-focus-within:border-l-zinc-400'
        onClick={submitHandler}
      >
        <TbSearch />
      </Button>
    </label>
  );
}
