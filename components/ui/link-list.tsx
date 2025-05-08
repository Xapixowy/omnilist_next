import { cn } from '@/functions/cn';
import Link, { LinkProps, LinkVariant } from './link';

const DEFAULT_VARIANT = 'default';

type HyperlinkListProps = {
  className?: string;
  links: LinkProps[];
  variant?: LinkVariant;
};

export default function LinkList({ className = '', links, variant = DEFAULT_VARIANT, ...props }: HyperlinkListProps) {
  return (
    <ul className={cn('flex items-center gap-2', className)} {...props}>
      {links.map((link, index) => (
        <li className='flex gap-2' key={index}>
          <Link variant={variant} {...link}>
            {link.children}
          </Link>
          {index < links.length - 1 && <span className='text-zinc-400'>&bull;</span>}
        </li>
      ))}
    </ul>
  );
}
