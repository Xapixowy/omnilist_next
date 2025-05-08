import Hyperlink from '@/components/ui/hyperlink';
import { cn } from '@/functions/cn';
import { useNavigationContext } from '@/layouts/home-layout/features/navigation/contexts/navigation';
import { TbChevronDown } from 'react-icons/tb';
import { NAVIGATION_COLLAPSE_ITEM_DATA_ATTRIBUTE } from '../navigation';
import { NavigationSection as NavigationSectionType } from '../types/navigation-section';
import { MobileNavigationItem, NavigationItem } from './navigation-item';

export const NavigationSection = ({ id, title, items }: NavigationSectionType) => {
  const { navigationCollapsedItem, setNavigationCollapsedItem } = useNavigationContext();

  const isThisItemCollapsed = navigationCollapsedItem === id;
  const dynamicAttributes = {
    [`data-${NAVIGATION_COLLAPSE_ITEM_DATA_ATTRIBUTE}`]: id,
  };

  const collapseItemHandler = (): void => {
    const newCollapsedItemValue = navigationCollapsedItem === null ? id : isThisItemCollapsed ? null : id;

    setNavigationCollapsedItem(newCollapsedItemValue);
  };

  return (
    <div className='relative' {...dynamicAttributes}>
      <Hyperlink className='flex items-center gap-1 hover:no-underline' onClick={collapseItemHandler}>
        {title} <TbChevronDown className={`${isThisItemCollapsed ? 'rotate-180' : ''} transition-transform`} />
      </Hyperlink>
      <div
        className={cn(
          'absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-[calc(120%)] place-items-center rounded-md bg-zinc-950/80 px-4 py-2 whitespace-nowrap',
          {
            block: isThisItemCollapsed,
            hidden: !isThisItemCollapsed,
          },
        )}
      >
        {items.map((item) => (
          <NavigationItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
};

export const MobileNavigationSection = ({ id, title, items }: NavigationSectionType) => {
  const { navigationCollapsedItem, setNavigationCollapsedItem } = useNavigationContext();

  const isThisItemCollapsed = navigationCollapsedItem === id;
  const dynamicAttributes = {
    [`data-${NAVIGATION_COLLAPSE_ITEM_DATA_ATTRIBUTE}`]: id,
  };

  const collapseItemHandler = (): void => {
    const newCollapsedItemValue = navigationCollapsedItem === null ? id : isThisItemCollapsed ? null : id;

    setNavigationCollapsedItem(newCollapsedItemValue);
  };

  return (
    <div className='relative' {...dynamicAttributes}>
      <Hyperlink
        className='flex items-center justify-between px-8 py-6 hover:no-underline'
        onClick={collapseItemHandler}
      >
        {title} <TbChevronDown className={`${isThisItemCollapsed ? 'rotate-180' : ''} transition-transform`} />
      </Hyperlink>
      <div
        className={cn('transition-grid grid', {
          'grid-rows-[1fr]': isThisItemCollapsed,
          'grid-rows-[0fr]': !isThisItemCollapsed,
        })}
      >
        <div className='overflow-hidden'>
          {items.map((item) => (
            <MobileNavigationItem className='px-8 py-4 pl-10 last:pb-6' key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};
