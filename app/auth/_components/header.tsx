import BrandLink from '@/components/global/brand-link';
import Heading from '@/components/ui/heading';
import { cn } from '@/functions/cn';

type HeaderProps = {
  title?: string;
  className?: string;
};

export default function Header({ title, className = '' }: HeaderProps) {
  return (
    <header className={cn('grid place-items-center gap-2', className)}>
      <BrandLink />
      {title && (
        <Heading variant='h1' style='h6' className='text-center font-normal'>
          {title}
        </Heading>
      )}
    </header>
  );
}
