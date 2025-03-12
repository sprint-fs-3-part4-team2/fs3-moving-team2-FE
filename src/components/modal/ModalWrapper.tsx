'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface ModalWrapperProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClose: () => void; // 부모에게 닫기 이벤트를 전달받음 ex) () => setModalOpen(false)
}

export default function ModalWrapper({
  title,
  children,
  onClose,
  className,
}: ModalWrapperProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // 모달 열릴 때 스크롤 비활성화, 닫힐 때 복원
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // backdrop 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className='fixed inset-0 flex items-center justify-center bg-[#141414] bg-opacity-60 z-50 w-full h-full'
      open
    >
      <div
        className={cn(
          'bg-white rounded-3xl p-6 w-11/12 max-w-md animate-slideUp',
          className,
        )}
      >
        <div className='flex justify-between items-center'>
          <h2 className='font-bold text-xl'>{title}</h2>
          <button
            onClick={onClose}
            className='text-gray-500 text-2xl leading-none'
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
