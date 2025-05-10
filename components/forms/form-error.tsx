import { cn } from '@/functions/cn';
import { useTranslations } from 'next-intl';

type FormErrorProps = {
  message?: string;
  translate?: boolean;
  className?: string;
};

const FormError = ({ message, translate = false, className = '', ...props }: FormErrorProps) => {
  const t = useTranslations();

  return (
    message && (
      <span className={cn('text-xs text-red-500', className)} {...props}>
        {translate ? t(message) : message}
      </span>
    )
  );
};

export default FormError;
