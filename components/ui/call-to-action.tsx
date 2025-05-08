import { cn } from '@/functions/cn';
import { ReactNode } from 'react';
import Heading from './heading';

type CallToActionProps = {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

export default function CallToAction({ title, description, children, className = '' }: CallToActionProps) {
  return (
    <div
      className={cn(
        'from-my-primary-800/10 via-my-primary-800/40 to-my-primary-800/10 hover:from-my-primary-800/20 hover:to-my-primary-800/20 hover:via-my-primary-800/50 flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl border border-zinc-400/10 bg-gradient-to-tr p-16 transition-colors lg:flex-row lg:gap-12',
        className,
      )}
    >
      <div className='flex flex-col gap-4'>
        <Heading variant='h2' style='h1'>
          {title}
        </Heading>
        <p className='text-xl'>{description}</p>
      </div>
      <div className='flex gap-4'>{children}</div>
    </div>
  );
}
