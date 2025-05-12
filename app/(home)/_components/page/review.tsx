'use client';

import { cn } from '@/functions/cn';
import Avvvatars from 'avvvatars-react';

export type ReviewProps = {
  title: string;
  message: string;
  author: string;
  avatar?: string;
  className?: string;
};

export default function Review({ title, message, author, className = '' }: ReviewProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-xl border border-zinc-400/10 p-6 transition-transform hover:translate-x-1 hover:-translate-y-1',
        className,
      )}
    >
      <p>&#8220;{message}&#8221;</p>
      <div className='flex items-center gap-4'>
        <Avvvatars value={author} size={48} style='shape' />
        <div className='flex flex-col gap-1'>
          <p className='font-semibold text-zinc-50'>{author}</p>
          <p className='text-sm'>{title}</p>
        </div>
      </div>
    </div>
  );
}
