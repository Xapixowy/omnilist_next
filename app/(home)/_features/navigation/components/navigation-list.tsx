import { isNavigationItem, NavigationItem as NavigationItemType } from '../types/navigation-item';
import { NavigationSection as NavigationSectionType } from '../types/navigation-section';
import { MobileNavigationItem, NavigationItem } from './navigation-item';
import { MobileNavigationSection, NavigationSection } from './navigation-section';

export const NavigationList = ({ items }: { items: (NavigationItemType | NavigationSectionType)[] }) => (
  <ul className='flex items-center gap-4'>
    {items.map((item, index) => (
      <li key={index}>{isNavigationItem(item) ? <NavigationItem {...item} /> : <NavigationSection {...item} />}</li>
    ))}
  </ul>
);

export const MobileNavigationList = ({ items }: { items: (NavigationItemType | NavigationSectionType)[] }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>
        {isNavigationItem(item) ? <MobileNavigationItem {...item} /> : <MobileNavigationSection {...item} />}
      </li>
    ))}
  </ul>
);
