'use client';

import { cn } from '@/functions/cn';
import { useEffect } from 'react';
import { TbMenu2, TbX } from 'react-icons/tb';
import { useNavigationContext } from '../contexts/navigation';

export default function NavigationHamburger() {
  const { navigationMobileDrawerVisibility, setNavigationMobileDrawerVisibility } = useNavigationContext();

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', navigationMobileDrawerVisibility);
  }, [navigationMobileDrawerVisibility]);

  return (
    <div className='ml-8 flex flex-1 flex-row-reverse items-center text-4xl sm:hidden'>
      <button
        className='link relative cursor-pointer'
        onClick={() => setNavigationMobileDrawerVisibility(!navigationMobileDrawerVisibility)}
      >
        <TbMenu2
          className={cn('absolute top-1/2 left-1/2 -translate-1/2 transition-opacity', {
            'opacity-0': navigationMobileDrawerVisibility,
            'opacity-100': !navigationMobileDrawerVisibility,
          })}
        />
        <TbX
          className={cn('transition-opacity', {
            'opacity-100': navigationMobileDrawerVisibility,
            'opacity-0': !navigationMobileDrawerVisibility,
          })}
        />
      </button>
    </div>
  );
}
