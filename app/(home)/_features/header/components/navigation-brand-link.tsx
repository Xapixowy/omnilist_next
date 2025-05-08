import BrandLink from '@/components/global/brand-link';
import { useHeaderMobileDrawerContext } from '../contexts/header-mobile-drawer';

export default function NavigationBrandLink() {
  const { setIsOpen } = useHeaderMobileDrawerContext();

  return <BrandLink onClick={() => setIsOpen(false)} />;
}
