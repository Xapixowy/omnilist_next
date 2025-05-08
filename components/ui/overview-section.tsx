import { ReactNode } from 'react';
import Heading from './heading';

type OverviewSectionProps = {
  title: string;
  heading: ReactNode;
  children: ReactNode;
};

export default function OverviewSection({ title, heading, children }: OverviewSectionProps) {
  return (
    <section className='flex w-full flex-col gap-2 p-8'>
      <p className='text-gradient text-gradient--inverse w-max font-medium'>{title}</p>
      <Heading variant='h2' className='max-w-150 font-normal'>
        {heading}
      </Heading>
      {children}
    </section>
  );
}
