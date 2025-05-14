import { cn } from '@/functions/cn';
import { useNavigationAuthItems } from '../hooks/use-navigation-auth-items';
import NavigationItem from './navigation-item';

type NavigationAuthButtonsProps = {
  className?: string;
};

export default function NavigationAuthButtons({ className = '' }: NavigationAuthButtonsProps) {
  const items = useNavigationAuthItems();

  return (
    <ul className={cn('flex flex-col sm:flex-row sm:items-center sm:gap-6', className)}>
      {items.map((item, index) => (
        <li key={index} className='border-b border-zinc-600 sm:border-none'>
          <NavigationItem {...item} />
        </li>
      ))}
    </ul>
  );
}
