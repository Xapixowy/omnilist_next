import { cn } from '@/functions/cn';
import { HTMLAttributes } from 'react';

const DEFAULT_VARIANT = 'default';
const DEFAULT_SIZE = 'medium';
const DEFAULT_ROUNDED = false;

const LOADER_CLASSES = {
  default: 'inline-block animate-spin',
  variants: {
    primary: 'opacity-70',
  },
  sizes: {
    medium: 'h-3 w-3',
    large: 'h-4 w-4',
  },
};
const BUTTON_CLASSES: {
  default: string;
  variants: {
    [key in Exclude<ButtonVariant, 'default'>]: string;
  };
  sizes: {
    [key in ButtonSize]: string;
  };
  rounded: string;
} = {
  default: `group h-min cursor-pointer rounded-lg bg-default-background px-4 py-1 text-sm text-default-text outline outline-default-background transition-colors hover:bg-default-background-hover hover:text-default-text-hover hover:outline-default-background-hover disabled:cursor-auto disabled:bg-default-background-disabled disabled:text-default-text-disabled disabled:outline-default-background-disabled`,
  variants: {
    primary:
      'bg-zinc-100 outline-zinc-100 hover:bg-zinc-100 hover:outline-zinc-100 disabled:bg-zinc-200/70 disabled:outline-zinc-200/70',
    secondary:
      'text-zinc-200 outline-zinc-100/20 hover:text-zinc-50 hover:outline-zinc-100/50 disabled:outline-zinc-500/20',
    success:
      'bg-success-background text-success-text outline-success-background hover:bg-success-background-hover hover:text-succcess-text-hover hover:outline-success-background-hover disabled:bg-success-background-disabled disabled:text-success-text-disabled disabled:outline-success-background-disabled',
    warning:
      'bg-warning-background text-warning-text outline-warning-background hover:bg-warning-background-hover hover:text-succcess-text-hover hover:outline-warning-background-hover disabled:bg-warning-background-disabled disabled:text-warning-text-disabled disabled:outline-warning-background-disabled',
    danger:
      'bg-danger-background text-danger-text outline-danger-background hover:bg-danger-background-hover hover:text-succcess-text-hover hover:outline-danger-background-hover disabled:bg-danger-background-disabled disabled:text-danger-text-disabled disabled:outline-danger-background-disabled',
    info: 'bg-info-background text-info-text outline-info-background hover:bg-info-background-hover hover:text-succcess-text-hover hover:outline-info-background-hover disabled:bg-info-background-disabled disabled:text-info-text-disabled disabled:outline-info-background-disabled',
  },
  sizes: {
    medium: '',
    large: 'px-5 py-2 text-base',
  },
  rounded: 'rounded-full',
};
const BUTTON_TITLE_CLASSES: {
  default: string;
  variants: {
    [key in Exclude<ButtonVariant, 'default'>]: string;
  };
} = {
  default: 'inline-flex items-center gap-1 whitespace-nowrap',
  variants: {
    primary:
      'from-my-accent-500 to-my-secondary-500 bg-gradient-to-r from-20% to-80% bg-clip-text text-transparent transition-colors group-hover:from-my-accent-700 group-hover:to-my-secondary-700 group-disabled:from-my-accent-500/70 group-disabled:to-my-secondary-500/70',
    secondary: '',
    success: '',
    warning: '',
    danger: '',
    info: '',
  },
};

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
type ButtonSize = 'medium' | 'large';

type LoaderProps = {
  size?: ButtonSize;
  isPrimary?: boolean;
};
type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

const Loader = ({ size = DEFAULT_SIZE, isPrimary }: LoaderProps) => {
  const classes = cn(LOADER_CLASSES.default, LOADER_CLASSES.sizes[size], {
    [LOADER_CLASSES.variants.primary]: isPrimary,
  });

  return (
    <svg
      className={classes}
      viewBox='0 0 24 24'
      fill='none'
      stroke={isPrimary ? 'url(#loader-gradient)' : 'currentColor'}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <linearGradient id='loader-gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' stopColor='var(--color-my-accent-500)' />
          <stop offset='100%' stopColor='var(--color-my-secondary-500)' />
        </linearGradient>
      </defs>
      <path d='M12 3a9 9 0 1 0 9 9' />
    </svg>
  );
};

const Button = ({
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  rounded = DEFAULT_ROUNDED,
  loading = false,
  disabled = false,
  className = '',
  children,
  ...rest
}: ButtonProps) => {
  const classes = cn(
    BUTTON_CLASSES.default,
    variant !== 'default' ? BUTTON_CLASSES.variants[variant] : '',
    size !== 'medium' ? BUTTON_CLASSES.sizes[size] : '',
    rounded ? BUTTON_CLASSES.rounded : '',
    className,
  );

  return (
    <button {...rest} className={classes} disabled={loading || disabled} {...rest}>
      <span
        className={cn(
          BUTTON_TITLE_CLASSES.default,
          variant !== 'default' ? BUTTON_TITLE_CLASSES.variants[variant] : '',
        )}
      >
        {loading && <Loader size={size} isPrimary={variant === 'primary'} />} {children}
      </span>
    </button>
  );
};
export default Button;
