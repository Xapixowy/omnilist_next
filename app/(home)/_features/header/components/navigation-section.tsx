'use client';

import { cn } from '@/functions/cn';
import { useEffect, useRef, useState } from 'react';
import { TbChevronDown } from 'react-icons/tb';
import NavigationItem, { NavigationItemProps } from './navigation-item';

export type NavigationSectionProps = {
  title: string;
  items: NavigationItemProps[];
  className?: string;
};

export default function NavigationSection({ title, items, className = '' }: NavigationSectionProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (event.target === null) {
      return;
    }

    const isButtonClicked = buttonRef.current?.contains(event.target as Node);

    if (!isButtonClicked) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
  });

  return (
    <div className={cn('relative', className)}>
      <button
        className='transition-colors w-full sm:w-auto flex items-center gap-2 text-zinc-400 hover:text-zinc-50 cursor-pointer px-8 py-6 sm:p-0'
        onClick={() => setIsDropdownOpen((prevValue) => !prevValue)}
        ref={buttonRef}
      >
        <span>{title}</span>
        <TbChevronDown className={cn('transition-transform', { 'rotate-180': isDropdownOpen })} />
      </button>
      <ul
        className={cn(
          'sm:absolute sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-[calc(100%_+_1rem)] sm:bg-zinc-950/80 sm:p-4 sm:rounded-md',
          {
            hidden: !isDropdownOpen,
          },
        )}
      >
        {items.map((item, index) => (
          <li key={index}>
            <NavigationItem className='sm:ml-0 ml-4 first:pt-2 sm:first:pt-0' {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
