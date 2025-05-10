import { cn } from '@/functions/cn';
import { ReactElement } from 'react';
import toast, { useToasterStore } from 'react-hot-toast';
import { TbAlertTriangle, TbCircleCheck, TbExclamationCircle, TbHelpCircle, TbX } from 'react-icons/tb';

const TOAST_CLASSES: {
  type: {
    [key in ToastType]: string;
  };
} = {
  type: {
    success:
      'text-success-text outline-success-background shadow-success-background hover:outline-success-background-hover hover:text-success-text-hover hover:shadow-success-background-hover',
    error:
      'text-danger-text outline-danger-background shadow-danger-background hover:outline-danger-background-hover hover:text-danger-text-hover hover:shadow-danger-background-hover',
    info: 'text-info-text outline-info-background shadow-info-background hover:outline-info-background-hover hover:text-info-text-hover hover:shadow-info-background-hover',
    warning:
      'text-warning-text outline-warning-background shadow-warning-background hover:outline-warning-background-hover hover:text-warning-text-hover hover:shadow-warning-background-hover',
  },
};
const TOAST_PROGRESS_BAR_CLASSES: {
  type: {
    [key in ToastType]: string;
  };
} = {
  type: {
    success: 'bg-success-background group-hover:bg-success-background-hover',
    error: 'bg-danger-background group-hover:bg-danger-background-hover',
    info: 'bg-info-background group-hover:bg-info-background-hover',
    warning: 'bg-warning-background group-hover:bg-warning-background-hover',
  },
};

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type ToastProps = {
  id: string;
  title: string;
  message: string;
  type: ToastType;
  dismissed: boolean;
  duration?: number;
};

const getToastIcon = (type: ToastType): ReactElement | null => {
  switch (type) {
    case 'success':
      return <TbCircleCheck />;
    case 'error':
      return <TbExclamationCircle />;
    case 'info':
      return <TbHelpCircle />;
    case 'warning':
      return <TbAlertTriangle />;
    default:
      return null;
  }
};

const ToastProgressBar = ({
  type,
  duration,
  isPaused = false,
}: {
  type: ToastType;
  duration: number;
  isPaused: boolean;
}) => {
  return (
    <div className='absolute bottom-0 left-0 h-2 w-full overflow-hidden'>
      <div
        className={cn(
          `h-full w-full transition-colors`,
          `animate-slide-left-[5s]`,
          TOAST_PROGRESS_BAR_CLASSES.type[type],
        )}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
          animationDuration: `${duration}ms`,
        }}
      ></div>
    </div>
  );
};

export default function Toast({ id, title, message, type, dismissed, duration }: ToastProps) {
  const icon = getToastIcon(type);
  const { pausedAt } = useToasterStore();

  const dismissHandler = (): void => {
    toast.dismiss(id);
  };

  return (
    <div
      className={cn(
        'group relative h-full w-96 overflow-hidden rounded-lg bg-zinc-950 p-4 pb-6 shadow outline transition-colors',
        TOAST_CLASSES.type[type],
        {
          hidden: dismissed,
        },
      )}
    >
      <div className='absolute top-0 right-0 grid cursor-pointer place-items-center p-2' onClick={dismissHandler}>
        <TbX />
      </div>
      <p className='mb-1 flex items-center gap-2 font-semibold'>
        <span className='text-lg'>{icon}</span>
        <span>{title}</span>
      </p>
      <p className='text-sm text-zinc-200'>{message}</p>
      {duration && <ToastProgressBar type={type} duration={duration} isPaused={!!pausedAt} />}
    </div>
  );
}
