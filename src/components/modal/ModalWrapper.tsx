'use client';

import cn from '@/utils/cn';
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

  // 모달 열릴 때 스크롤 비활성화, 닫힐 때 복원 및 패딩을 줘서 스크롤바가 사라지는 것 방지(좌우 흔들림 방지)
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = '0px';
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
        className={cn('bg-white rounded-3xl p-6 animate-slideUp', className)}
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
