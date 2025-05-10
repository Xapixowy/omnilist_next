import { cn } from '@/functions/cn';
import { LabelHTMLAttributes, ReactNode } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  className?: string;
  children?: ReactNode;
};

export default function Label({ className = '', children, ...props }: LabelProps) {
  return (
    <label className={cn('text-sm font-bold', className)} {...props}>
      {children}
    </label>
  );
}
