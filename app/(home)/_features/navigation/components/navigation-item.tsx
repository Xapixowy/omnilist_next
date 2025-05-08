import Button from '@/components/ui/button';
import Hyperlink from '@/components/ui/hyperlink';
import { cn } from '@/functions/cn';
import { useNavigationContext } from '@/layouts/home-layout/features/navigation/contexts/navigation';
import { NavLink } from 'react-router';
import { NavigationItem as NavigationItemType, NavigationItemVariant } from '../types/navigation-item';

const NAVIGATION_ITEM_DEFAULT_VARIANT: NavigationItemVariant = 'default';

type NavigationItemProps = NavigationItemType & {
  className?: string;
};

export const NavigationItem = ({
  title,
  link,
  variant = NAVIGATION_ITEM_DEFAULT_VARIANT,
  className = '',
}: NavigationItemProps) => {
  const { setNavigationCollapsedItem } = useNavigationContext();

  return (
    <NavLink end to={link} onClick={() => setNavigationCollapsedItem(null)}>
      {({ isActive }) =>
        variant !== 'default' ? (
          <Button className={className} variant={variant} size='large' rounded>
            {title}
          </Button>
        ) : (
          <Hyperlink
            className={cn(
              'cursor-pointer hover:no-underline',
              {
                'active [&.active]:no-underline': isActive,
              },
              className,
            )}
          >
            {title}
          </Hyperlink>
        )
      }
    </NavLink>
  );
};

export const MobileNavigationItem = ({
  title,
  link,
  variant = NAVIGATION_ITEM_DEFAULT_VARIANT,
  className = '',
}: NavigationItemProps) => {
  const { setNavigationCollapsedItem } = useNavigationContext();

  return (
    <NavLink end to={link} onClick={() => setNavigationCollapsedItem(null)}>
      {({ isActive }) =>
        variant !== 'default' ? (
          <Button
            className={cn('block w-full rounded-none px-8 py-6 text-left', className)}
            variant={variant}
            size='large'
          >
            {title}
          </Button>
        ) : (
          <Hyperlink
            className={cn(
              'flex cursor-pointer items-center justify-between px-8 py-6 hover:no-underline',
              {
                'active [&.active]:no-underline': isActive,
              },
              className,
            )}
          >
            {title}
          </Hyperlink>
        )
      }
    </NavLink>
  );
};
