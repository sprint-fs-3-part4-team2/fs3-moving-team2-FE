'use client';
import { createContext, useContext } from 'react';
import { type ToastType } from '@/components/toast@hook/types/type';

export const ToasterContext = createContext<
  { toaster: (type: ToastType, message: string) => void } | undefined
>(undefined);

export function useToaster() {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('ToastContext 안에서만 사용할 수 있습니다.');
  }
  const { toaster } = context;
  return toaster;
}
