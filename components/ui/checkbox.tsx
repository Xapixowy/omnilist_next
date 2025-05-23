import { cn } from '@/functions/cn';
import { forwardRef, InputHTMLAttributes } from 'react';
import { TbCheck } from 'react-icons/tb';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  className?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ id, className = '', ...props }, ref) => (
  <label
    htmlFor={id}
    className={cn(
      'inline-block relative w-6 h-6 text-md cursor-pointer rounded-md transition-colors text-zinc-50 bg-zinc-700/20 border border-zinc-100/20 hover:border-zinc-100/50',
      {
        'cursor-auto text-zinc-600 border-zinc-100/10 hover:border-zinc-100/10': props.disabled,
      },
      className,
    )}
  >
    <input ref={ref} id={id} type='checkbox' className='peer appearance-none' {...props} />
    <TbCheck className='absolute top-1/2 left-1/2 -translate-1/2 hidden peer-checked:block transition-transform' />
  </label>
));

Checkbox.displayName = 'Checkbox';

export default Checkbox;
