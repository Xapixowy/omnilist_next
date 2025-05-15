import { cn } from '@/functions/cn';
import { TbPhotoOff } from 'react-icons/tb';

type ImagePlaceholderProps = {
  className?: string;
};

export default function ImagePlaceholder({ className = '' }: ImagePlaceholderProps) {
  return (
    <div className={cn('w-full h-full bg-zinc-950/70 grid place-items-center text-4xl', className)}>
      <TbPhotoOff />
    </div>
  );
}
