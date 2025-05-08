import { ROUTES_CONFIG } from '@/configs/routes';
import { cn } from '@/functions/cn';
import Link from 'next/link';

type BrandLinksProps = {
  onClick?: () => void;
  className?: string;
};

export default function BrandLink({ onClick, className = '' }: BrandLinksProps) {
  return (
    <Link
      href={ROUTES_CONFIG.default}
      className={cn('text-2xl font-extrabold text-zinc-50 no-underline', className)}
      onClick={onClick}
    >
      OmniList
    </Link>
  );
}
