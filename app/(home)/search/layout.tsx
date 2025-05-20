import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import { ReactNode } from 'react';

export default function SearchLayout({ children }: { children: ReactNode }) {
  return <MaxWidthWrapper className='p-8'>{children}</MaxWidthWrapper>;
}
