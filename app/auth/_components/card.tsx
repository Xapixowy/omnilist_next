import { cn } from '@/functions/cn';
import backgroundImage from '@/public/images/auth-background.webp';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ReactNode } from 'react';

type CardProps = {
  className?: string;
  children?: ReactNode;
};

export default function Card({ className = '', children }: CardProps) {
  const t = useTranslations('layouts.auth');

  return (
    <main className='before:from-my-accent-600/50 before:to-my-secondary-600/50 before:via-my-primary-600/30 relative my-12 grid min-h-48 w-86 place-items-center before:absolute before:inset-[-1px] before:-z-1 before:rounded-3xl before:bg-gradient-to-tr md:w-96'>
      <div className={cn('min-h-[inherit] w-full rounded-3xl bg-zinc-950 p-8', className)}>{children}</div>
      <Image
        className='animate-show-up absolute top-1/2 left-1/2 -z-1 w-[1000px] max-w-none -translate-1/2'
        src={backgroundImage}
        alt={t('abstract_background_with_color_blur')}
      />
    </main>
  );
}
