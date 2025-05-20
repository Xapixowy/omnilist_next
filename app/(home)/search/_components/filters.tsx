import { cn } from '@/functions/cn';

type FiltersProps = {
  className?: string;
};

export default function Filters({ className = '', ...props }: FiltersProps) {
  return (
    <div className={cn(className)} {...props}>
      Filters
    </div>
  );
}
