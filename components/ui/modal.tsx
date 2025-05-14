'use client';

import { cn } from '@/functions/cn';
import { ReactNode } from 'react';
import { TbX } from 'react-icons/tb';

const ModalContainer = ({
  children,
  onClose,
  closeButton = true,
  className = '',
}: {
  children: ReactNode;
  onClose: () => void;
  closeButton: boolean;
  className?: string;
}) => (
  <div
    className={cn(
      'min-w-full min-h-full sm:min-w-120 sm:min-h-80 relative rounded-xl bg-zinc-950 p-5 shadow-zinc-800/50 outline outline-zinc-50/10 overflow-y-auto',
      className,
    )}
  >
    {closeButton && (
      <button
        className='w-6 aspect-square overflow-hidden absolute top-5 right-5 grid place-items-center cursor-pointer text-2xl'
        onClick={onClose}
      >
        <TbX />
      </button>
    )}
    {children}
  </div>
);

const ModalBackdrop = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className='absolute inset-0 bg-zinc-950/50 backdrop-blur-sm transition-opacity grid place-items-center'
      onClick={onClick}
    ></div>
  );
};

export default function Modal({
  children,
  onClose,
  open = false,
  closeButton = true,
  className = '',
}: {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  closeButton?: boolean;
  custom?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn('fixed inset-0 z-1000 flex items-center justify-center p-2', {
        hidden: !open,
      })}
    >
      <ModalBackdrop onClick={onClose} />
      <ModalContainer className={className} onClose={onClose} closeButton={closeButton}>
        {children}
      </ModalContainer>
    </div>
  );
}
