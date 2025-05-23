import { cn } from '@/functions/cn';
import { forwardRef, InputHTMLAttributes } from 'react';

const INPUT_CLASSES = {
  default:
    'text-sm p-2 border border-zinc-100/20 rounded-lg bg-zinc-700/20 text-zinc-50 placeholder:text-zinc-100/50 hover:border-zinc-100/50 outline-none focus:border-my-primary-400 disabled:hover:border-zinc-100/10 disabled:border-zinc-100/10 disabled:placeholder:text-zinc-600 disabled:text-zinc-600 accent-my-primary-400 appearance-none transition-colors',
  types: {
    file: 'file:bg-zinc-100/20 file:rounded-lg file:px-2 file:mr-2 disabled:file:text-zinc-400',
  },
} as const;

type AvailableInputTypes = keyof typeof INPUT_CLASSES.types;

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ className = '', ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      INPUT_CLASSES.default,
      INPUT_CLASSES.types[(props.type as AvailableInputTypes) ?? 'text'] ?? '',
      className,
    )}
    {...props}
  />
));

Input.displayName = 'Input';

export default Input;
