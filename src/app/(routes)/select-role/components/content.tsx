import { PropsWithChildren } from 'react';
import s from '../styles/select-role.module.css';
import cn from '@/utils/cn';

interface ContentProps extends PropsWithChildren {
  className?: string;
  title: string;
  comment: string;
}
export default function Content({
  className,
  children,
  title,
  comment,
}: ContentProps) {
  return (
    <div className={cn(`${s.content}`, !!className && className)}>
      <div className={s.move}>
        <h2 className={s.title}>{title}</h2>
        <p className={s.comment}>{comment}</p>
        {children}
      </div>
    </div>
  );
}
