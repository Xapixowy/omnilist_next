import Heading from '@/components/ui/heading';
import { cn } from '@/functions/cn';
import { IconType } from 'react-icons';

export type AdvantageProps = {
  icon: IconType;
  title: string;
  description: string;
  className?: string;
};

export default function Advantage({ icon: Icon, title, description, className = '' }: AdvantageProps) {
  return (
    <div className={cn('flex flex-col gap-4 transition-transform hover:translate-x-1 hover:-translate-y-1', className)}>
      <div className='from-my-accent-500 to-my-secondary-500 aspect-square w-16 rounded-full bg-gradient-to-r p-1 text-4xl'>
        <div className='flex h-full w-full items-center justify-center rounded-full bg-zinc-950/50'>
          <Icon />
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <Heading variant='h3' style='h4'>
          {title}
        </Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}
