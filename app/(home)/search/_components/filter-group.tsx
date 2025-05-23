import Checkbox from '@/components/ui/checkbox';
import Label from '@/components/ui/label';
import { cn } from '@/functions/cn';
import { useTranslations } from 'next-intl';
import { Filter } from '../_types/filter';

type FilterGroupProps = Filter & {
  setFilter: (filter: string, value: string | null) => void;
  className?: string;
};

export default function FilterGroup({
  name,
  filter,
  value,
  type,
  setFilter,
  className = '',
  ...props
}: FilterGroupProps) {
  const t = useTranslations('pages.search.filters');

  const getInput = () => {
    switch (type) {
      case 'checkbox':
        return (
          <Checkbox
            id={filter}
            checked={value === 'true'}
            onChange={(e) => setFilter(filter, e.target.checked ? 'true' : 'false')}
          />
        );
      case 'input-number':
        return (
          <input type='number' id={filter} value={value ?? ''} onChange={(e) => setFilter(filter, e.target.value)} />
        );
    }
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 justify-between',
        {
          'items-start flex-col': type !== 'checkbox',
        },
        className,
      )}
      {...props}
    >
      <Label htmlFor={filter}>{t(name)}</Label>
      {getInput()}
    </div>
  );
}
