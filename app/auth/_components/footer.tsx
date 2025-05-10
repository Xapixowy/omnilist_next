import { cn } from '@/functions/cn';
import { ReactNode } from 'react';

type FooterProps = {
  className?: string;
  children?: ReactNode;
};

export default function Footer({ children, className = '' }: FooterProps) {
  return <footer className={cn('flex flex-col text-center', className)}>{children}</footer>;
}
