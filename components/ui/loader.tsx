import { cn } from '@/functions/cn';

type LoaderProps = {
  className?: string;
};

export default function Loader({ className = '', ...props }: LoaderProps) {
  return (
    <div className={cn('relative w-10 aspect-square', className)} {...props}>
      <div className='absolute inset-0 bg-zinc-50/50 rounded-full animate-loader-1' />
      <div className='absolute inset-0 bg-zinc-50/50 rounded-full animate-loader-2' />
    </div>
  );
}
