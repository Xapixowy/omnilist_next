import { cn } from '@/functions/cn';

type ResultsContainerProps = {
  className?: string;
};

export default function ResultsContainer({ className = '', ...props }: ResultsContainerProps) {
  return (
    <div className={cn(className)} {...props}>
      ResultsContainer
    </div>
  );
}
