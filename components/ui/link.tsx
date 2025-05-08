import { cn } from '@/functions/cn';
import NextLink from 'next/link';
import { AnchorHTMLAttributes, ReactNode } from 'react';
import { TbExternalLink } from 'react-icons/tb';

const LINK_DEFAULTS: {
  variant: LinkVariant;
  target: string;
} = {
  variant: 'default',
  target: '_blank',
};
const LINK_CLASSES: Record<LinkVariant, string> = {
  default:
    'inline-flex items-center gap-1 cursor-pointer text-zinc-400 transition-colors hover:text-zinc-50 hover:underline [&.active]:text-zinc-50 [&.active]:underline',
  primary: 'text-my-primary-400 hover:text-my-primary-200',
  secondary: 'text-my-secondary-400 hover:text-my-secondary-200',
  accent: 'text-my-accent-400 hover:text-my-accent-200',
};

export type LinkType = 'internal' | 'external' | 'blank';
export type LinkVariant = 'default' | 'primary' | 'secondary' | 'accent';
export type LinkProps = {
  href?: string;
  icon?: boolean;
  children?: ReactNode;
  type?: LinkType;
  variant?: LinkVariant;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Link({
  href,
  icon,
  children,
  type,
  variant = LINK_DEFAULTS.variant,
  target = LINK_DEFAULTS.target,
  className = '',
  ...props
}: LinkProps) {
  const calculatedType: LinkType = type ?? (href ? 'internal' : 'blank');
  const calculatedIcon: boolean = icon ?? calculatedType === 'external';
  const classes = cn(
    LINK_CLASSES.default,
    variant !== 'default' ? LINK_CLASSES[variant] : '',
    {
      'cursor-auto': calculatedType === 'blank',
    },
    className,
  );

  if (calculatedType === 'internal' && href) {
    return (
      <NextLink className={classes} href={href} {...props}>
        {children}
        {calculatedIcon && <TbExternalLink />}
      </NextLink>
    );
  }

  if (calculatedType === 'external' && href) {
    return (
      <a className={classes} href={href} target={target} {...props}>
        {children}
        {calculatedIcon && <TbExternalLink />}
      </a>
    );
  }

  return (
    <span className={classes} {...props}>
      {children}
      {calculatedIcon && <TbExternalLink />}
    </span>
  );
}
