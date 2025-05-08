import { cn } from '@/functions/cn';
import { ReactNode } from 'react';

type MaxWidthWrapperProps = {
  children: ReactNode;
  className?: string;
};

export default function MaxWidthWrapper({ children, className = '' }: MaxWidthWrapperProps) {
  return <div className={cn('max-width-wrapper mr-auto ml-auto max-w-[var(--max-width)]', className)}>{children}</div>;
}
