import { ReactNode } from 'react';

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative border-t border-t-zinc-700'>
      {children}
      <div className='background-pattern-dots absolute inset-0 -z-1 [mask-image:radial-gradient(40%_80%_at_top_left,white,transparent)]' />
      <div className='background-pattern-dots absolute inset-0 -z-1 [mask-image:radial-gradient(40%_80%_at_top_right,white,transparent)]' />
    </div>
  );
}
