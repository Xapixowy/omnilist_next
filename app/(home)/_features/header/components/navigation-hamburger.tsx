'use client';

import { cn } from '@/functions/cn';
import { TbMenu2, TbX } from 'react-icons/tb';
import { useHeaderMobileDrawerContext } from '../contexts/header-mobile-drawer';

export default function NavigationHamburger() {
  const { isOpen, setIsOpen } = useHeaderMobileDrawerContext();

  return (
    <button
      className='w-10 aspect-square relative text-4xl cursor-pointer sm:hidden'
      onClick={() => setIsOpen((prevValue) => !prevValue)}
    >
      <TbMenu2
        className={cn('absolute top-1/2 left-1/2 -translate-1/2 transition-opacity', {
          'opacity-0': isOpen,
          'opacity-100': !isOpen,
        })}
      />
      <TbX
        className={cn('absolute top-1/2 left-1/2 -translate-1/2 transition-opacity', {
          'opacity-100': isOpen,
          'opacity-0': !isOpen,
        })}
      />
    </button>
  );
}
