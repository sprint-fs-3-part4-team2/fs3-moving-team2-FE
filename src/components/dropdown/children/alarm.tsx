'use client';
import Link from 'next/link';
import Dropdown, { DropdownProps } from '../dropdown';
import cn from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';
import { CloseBtn } from '@/app/(routes)/select-role/components/tooltip';
import { formatDistanceToNow } from 'date-fns';
import {
  ko,
  FormatDistanceToken,
  FormatDistanceFnOptions,
} from 'date-fns/locale';
import { usePathname } from 'next/navigation';

const HighlightText = ({ text, words }: { text: string; words: string[] }) => {
  // 정규식을 만들어 단어를 찾음 (g 플래그 추가)
  const regex = new RegExp(`(${words.join('|')})`, 'g');

  // 일치하는 부분을 <span> 태그로 감싸기
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        words.includes(part) ? (
          <span
            className={cn('text-primary-blue-200 font-bold')}
            key={index}
          >
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
};

export type AlarmData = {
  createdAt: Date;
  highlight: string[];
  id: string;
  isRead: boolean;
  message: string;
  url?: string;
  userId: string;
};

// '약' 제거
const customKo = {
  ...ko,
  formatDistance: (
    token: FormatDistanceToken,
    count: number,
    options?: FormatDistanceFnOptions,
  ) => {
    const result = ko.formatDistance(token, count, options);
    return result.replace(/^약\s/, '');
  },
};
interface AlarmProps extends Omit<DropdownProps, 'dispatch'> {
  data: AlarmData[];
  readFn: (id?: string) => void;
}

function Alarm({
  isOpen = false,
  className,
  children,
  data,
  readFn,
}: AlarmProps) {
  const [open, setOpen] = useState<boolean>(isOpen);
  const divRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  function closeAlarm(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setOpen(false);
  }

  function isTime(date: Date) {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: customKo,
    });
  }
  function openHandle(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setOpen((prev) => !prev);
  }

  return (
    <div
      className={cn('relative', className && className)}
      ref={divRef}
    >
      <div
        className='w-full h-full cursor-pointer'
        onClick={openHandle}
      >
        {children}
      </div>
      <Dropdown
        isOpen={open}
        className={cn(
          'fixed block left-1/2 -translate-x-1/2 top-[140%] w-[80%] max-w-[330px] h-auto max-h-[360px] z-[99]',
          'md:absolute md:right-0 md:-translate-x-0 md:left-auto md:w-[340px] md:max-w-[312px]',
          'xl:max-h-[352px] xl:w-[360px]',
          'overflow-hidden px-0 pl-0 shadow-2xl',
        )}
      >
        <div className='py-[14px] h-[54px] relative'>
          <h2 className='text-lg lg:text-[18px] px-4 font-bold text-black-400'>
            알림
          </h2>
          <CloseBtn
            className={cn(
              'top-1/2 right-5 transform -translate-y-1/2',
              'w-4 h-4',
              'cursor-pointer',
            )}
            onClick={closeAlarm}
          />
        </div>
        <ul
          className={cn(
            'w-full overflow-y-scroll h-[300px] custom-scroll',
            'md:h-[250px]',
          )}
        >
          {data.length > 0 ? (
            data.map((v, i) => {
              const { id, isRead, highlight, message } = v;

              return (
                <li
                  key={v.id + i}
                  className={cn(
                    'min-h-[72px] lg:min-h-[84px] px-4 py-3 lg:px-6 lg:py-4',
                    i !== data.length - 1 && 'border-b border-line-200',
                    isRead ? 'bg-line-100' : 'bg-white',
                  )}
                >
                  <Link
                    className={cn(
                      'block text-md lg:text-lg font-medium w-full truncate',
                      isRead ? 'text-grayscale-400' : 'text-black-400',
                    )}
                    href={v.url || '#'}
                    onClick={(e) => {
                      e.preventDefault();
                      readFn(id);
                    }}
                  >
                    <HighlightText
                      text={message}
                      words={highlight}
                    />
                    <p className='text-grayscale-300 text-[13px] lg:text-md font-medium'>
                      {isTime(v.createdAt)}
                    </p>
                  </Link>
                </li>
              );
            })
          ) : (
            <li
              className={cn(
                'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
                'text-lg text-grayscale-300',
              )}
            >
              알람이 없어요
            </li>
          )}
        </ul>
      </Dropdown>
    </div>
  );
}

export default Alarm;
