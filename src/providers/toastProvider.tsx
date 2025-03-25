'use client';
import { type PropsWithChildren, useState } from 'react';
import {
  type ToastObject,
  type ToastType,
} from '@/components/toast@hook/types/type';
import { ToasterContext } from '@/hooks/useToaster';
import ToasterContainer, { Toast } from '@/components/toast@hook/toaster';

export default function ToasterProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastObject[]>([]);

  function addToast(type: ToastType, message: string) {
    const newToast = {
      id: Date.now(),
      type,
      message,
    };

    setToasts((prevToasts: ToastObject[]) => [...prevToasts, newToast]);
    return newToast;
  }

  function removeToast(id: number) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  function toaster(type: ToastType, message: string) {
    const newToast = addToast(type, message);

    setTimeout(() => removeToast(newToast.id), 2000);
  }

  return (
    <ToasterContext.Provider value={{ toaster }}>
      {children}
      <ToasterContainer>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClick={() => removeToast(toast.id)}
          />
        ))}
      </ToasterContainer>
    </ToasterContext.Provider>
  );
}
