'use client';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { useEffect } from 'react';
import checkImage from './assets/check.svg';
import outImage from './assets/out.svg';
import styles from './styles/toasterProvider.module.css';
import Image from 'next/image';

const ICONS = {
  info: checkImage,
  warn: outImage,
};

function Toast({
  type,
  message,
  onClick,
}: {
  type: keyof typeof ICONS;
  message: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) {
  const isMounted = useIsMounted(100);
  const icon = ICONS[type];
  const className = `${styles.Toast} ${styles[type]} ${
    isMounted ? styles.mounted : ''
  }`;

  return (
    <div
      className={className}
      onClick={onClick}
    >
      {icon && (
        <Image
          className={styles.Icon}
          src={icon}
          alt={type}
          width={16}
          height={16}
        />
      )}
      {message}
    </div>
  );
}

const ToasterContext = createContext<
  { toaster: (type: ToastType, message: string) => void } | undefined
>(undefined);
type ToastType = keyof typeof ICONS; // "info" | "warn"

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}
function ToasterProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function addToast(type: ToastType, message: string) {
    const newToast = {
      id: Date.now(),
      type,
      message,
    };

    setToasts((prevToasts: Toast[]) => [...prevToasts, newToast]);
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
      <div className={styles.ToastContainer}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClick={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToasterContext.Provider>
  );
}
function useIsMounted(delay: number) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsMounted(true);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return isMounted;
}

export function useToaster() {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('ToastContext 안에서만 사용할 수 있습니다.');
  }
  const { toaster } = context;
  return toaster;
}

export default ToasterProvider;
