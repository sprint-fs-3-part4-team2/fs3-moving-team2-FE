export type ToastType = 'info' | 'warn';
export interface ToastProps {
  type: ToastType;
  message: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
export interface ToastObject {
  id: number;
  type: ToastType;
  message: string;
}
