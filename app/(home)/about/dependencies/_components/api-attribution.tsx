import Heading from '@/components/ui/heading';
import { cn } from '@/functions/cn';
import Image from 'next/image';
import { ReactNode } from 'react';

type ApiAttributionProps = {
  title: string;
  service: string;
  image: {
    alt: string;
    src?: string;
  };
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
};

export default function ApiAttribution({
  title,
  service,
  image,
  children,
  className = '',
  disabled = false,
}: ApiAttributionProps) {
  return (
    <div className='flex flex-col gap-6'>
      <Heading variant='h2' className='items-top flex gap-2'>
        {title} <span className='text-gradient text-base'>{service}</span>
      </Heading>
      <div className={cn('flex flex-col gap-8 md:flex-row', className)}>
        <div>
          <div
            className={cn('aspect-video w-60 rounded-xl p-8 text-zinc-500', {
              'bg-zinc-700/30': disabled,
              'bg-zinc-700/50': !disabled,
            })}
          >
            <div className='flex h-full w-full items-center justify-center relative'>
              {image.src ? <Image src={image.src} alt={image.alt} className='max-h-full max-w-full' fill /> : image.alt}
            </div>
          </div>
        </div>
        <div
          className={`flex flex-1 flex-col gap-4 ${disabled ? '[&>p]:text-zinc-400 [&>p.italic]:text-zinc-500' : ''}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
