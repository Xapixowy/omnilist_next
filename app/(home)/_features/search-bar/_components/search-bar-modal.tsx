'use client';

import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { cn } from '@/functions/cn';
import { MOVIES_AND_TV_SHOWS_API } from '@/hooks/api/movies-and-tv-shows-api';
import { useDebounce } from '@/hooks/use-debounce';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { TbSearch, TbX } from 'react-icons/tb';
import { transformSearchResponseMoviesToSearchBarEntertainmentObjectCardProps } from '../_functions/transform-search-response-to-search-bar-entertainment-object-card-props';
import { useSearchBarContext } from '../_hooks/use-search-bar';
import SearchBarEntertainmentSection from './search-bar-entertainment-section';

export const QUERY_DEBOUNCE_DELAY = 500;

export default function SearchBarModal() {
  const t = useTranslations('layouts.home');
  const { isOpen, setIsOpen } = useSearchBarContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query, QUERY_DEBOUNCE_DELAY);
  const { data: moviesAndTVShowsData } = MOVIES_AND_TV_SHOWS_API.movies.useSearch(debouncedQuery);
  const { data: tvShowsData } = MOVIES_AND_TV_SHOWS_API.tvShows.useSearch(debouncedQuery);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
      inputRef.current?.blur();
      setQuery('');
    }
  }, [isOpen]);

  return (
    <div
      className={cn('fixed inset-0 z-1000 bg-zinc-950/90 backdrop-blur-sm', {
        hidden: !isOpen,
      })}
    >
      <MaxWidthWrapper className='relative flex flex-col gap-5 h-full p-5'>
        <header className='sticky top-0'>
          <div className='border-b border-zinc-50/10 flex items-center'>
            <span className='p-5 text-xl'>
              <TbSearch />
            </span>
            <Input
              ref={inputRef}
              className='flex-1 border-0 bg-transparent'
              placeholder={t('search-movies-and-tv-shows-and-more')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className='p-5 text-2xl cursor-pointer' onClick={() => setIsOpen(false)}>
              <TbX />
            </button>
          </div>
        </header>
        <main className='flex-1 flex flex-col gap-5 items-center overflow-y-auto p-5'>
          <SearchBarEntertainmentSection
            items={
              moviesAndTVShowsData?.data
                ? transformSearchResponseMoviesToSearchBarEntertainmentObjectCardProps(
                    moviesAndTVShowsData.data.results,
                  )
                : []
            }
          />
          <Button variant='secondary' size='large'>
            {t('show-more-results')}
          </Button>
        </main>
      </MaxWidthWrapper>
    </div>
  );
}
