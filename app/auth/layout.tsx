import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='grid min-h-screen w-full place-items-center overflow-hidden'>
      <MaxWidthWrapper className='grid place-items-center p-2 md:p-8'>{children}</MaxWidthWrapper>
    </div>
  );
}
