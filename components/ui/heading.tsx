import { cn } from '@/functions/cn';
import { ReactNode } from 'react';

const HEADING_CLASSES: Record<HeadingVariant, string> = {
  display: 'text-5xl lg:text-6xl font-bold',
  h1: 'text-4xl lg:text-5xl font-semibold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-semibold',
  h6: 'text-base font-semibold',
};

export type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'display';
export type HeadingProps = {
  variant: HeadingVariant;
  style?: HeadingVariant;
  className?: string;
  children?: ReactNode;
};

export default function Heading({ variant, style, className = '', children }: HeadingProps) {
  const classes = cn('scroll-m-20 tracking-tight', HEADING_CLASSES[style ?? variant], className);

  switch (variant) {
    case 'h6':
      return <h6 className={classes}>{children}</h6>;
    case 'h5':
      return <h5 className={classes}>{children}</h5>;
    case 'h4':
      return <h4 className={classes}>{children}</h4>;
    case 'h3':
      return <h3 className={classes}>{children}</h3>;
    case 'h2':
      return <h2 className={classes}>{children}</h2>;
    case 'h1':
    case 'display':
    default:
      return <h1 className={classes}>{children}</h1>;
  }
}
