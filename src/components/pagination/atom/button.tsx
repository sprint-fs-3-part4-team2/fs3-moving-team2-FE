import { MouseEvent, ReactNode } from 'react';

interface Props {
  className?: string;
  children?: ReactNode;
  onClick: (e: MouseEvent) => void;
}

export default function Button({ children, className = '', onClick }: Props) {
  const classNames = `w-[34px] h-[34px] text-lg text-black-400 font-semibold xl:w-[48px] xl:h-[48px] xl:text-2lg ${className}`;
  return (
    <button
      className={classNames}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
