import { cn } from '@/functions/cn';
import { useNavigationItems } from '../hooks/use-navigation-items';
import { isNavigationItem } from '../types/navigation-item';
import NavigationItem from './navigation-item';
import NavigationSection from './navigation-section';

type NavigationProps = {
  className?: string;
};

export default function Navigation({ className = '' }: NavigationProps) {
  const navigationItems = useNavigationItems();

  return (
    <nav className='w-full flex-1'>
      <ul className={cn('flex flex-col sm:flex-row sm:items-center sm:gap-6', className)}>
        {navigationItems.map((item, index) => (
          <li className='border-t last:border-b border-zinc-600 sm:border-none' key={index}>
            {isNavigationItem(item) ? <NavigationItem {...item} /> : <NavigationSection {...item} />}
          </li>
        ))}
      </ul>
    </nav>
  );
}
