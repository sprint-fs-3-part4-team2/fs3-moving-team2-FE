'use client';
import Link from 'next/link';
import Dropdown, { DropdownProps } from '../dropdown';
import cn from '@/utils/cn';
import { useEffect, useState } from 'react';
import { CloseBtn } from '@/app/(routes)/select-role/components/tooltip';
import { formatDistanceToNow } from 'date-fns';
import {
  ko,
  FormatDistanceToken,
  FormatDistanceFnOptions,
} from 'date-fns/locale';

type AlarmData = {
  id: string;
  message: string;
  is_read: boolean;
  url: string;
  create_at: Date;
};
interface ReadAlarmProps {
  id: string;
}
// '약' 제거한 커스텀 로케일
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

function Alarm({
  isOpen = false,
  className,
  children,
}: Omit<DropdownProps, 'dispatch'>) {
  const [open, setOpen] = useState<boolean>(isOpen);
  const [alarms, setAlarms] = useState(dummy || []);

  useEffect(() => {
    setAlarms(dummy);
  }, []);

  function closeAlarm(e: React.MouseEvent<any>) {
    setOpen(false);
  }

  function readAlarm({ id }: ReadAlarmProps) {
    // read 상태 변경 api 추가
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
    <div className={cn('relative', className && className)}>
      <div
        className='w-full h-full cursor-pointer'
        onClick={openHandle}
      >
        {children}
      </div>
      <Dropdown
        isOpen={open}
        className={cn(
          'absolute block h-auto max-h-[314px] lg:max-h-[352px] max-w-[312px] lg:max-w-[360px] py-[6px] z-5',
        )}
      >
        <div className='py-[14px] pl-4 lg:pl-6 h-[54px] relative'>
          <h2 className='text-lg lg:text-[18px] font-bold text-black-400'>
            알람
          </h2>
          <CloseBtn
            className={cn(
              'top-1/2 right-5 transform -translate-y-1/2',
              'w-4 h-4',
            )}
            onClick={closeAlarm}
          />
        </div>
        <ul className='w-full'>
          {alarms.length > 0 ? (
            alarms.map((v, i) => {
              return (
                <li
                  key={v.id}
                  className={cn(
                    'h-[72px] lg:h-[84px] px-4 py-3 lg:px-6 lg:py-4',
                    i !== alarms.length - 1 && 'border-b border-line-200',
                  )}
                >
                  <Link
                    key={v.id}
                    className='block text-black-400 text-md lg:text-lg font-medium'
                    href={v.url}
                    onClick={() => {
                      readAlarm({ id: v.id });
                    }}
                  >
                    {v.message}
                    <p className='text-grayscale-300 text-[13px] lg:text-md font-medium'>
                      {isTime(v.create_at)}
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
const dummy: AlarmData[] = [
  {
    id: 'adsfklafgdf',
    message: 'test입니다. ',
    is_read: false,
    url: '/test/test',
    create_at: new Date('2025-03-07T12:00:00Z'),
  },
  {
    id: 'aadfgfkdfdla7fgdf',
    message: 'test입니다.2222 ',
    is_read: false,
    url: '/test/test',
    create_at: new Date('2024-03-07T12:00:00Z'),
  },
  {
    id: 'aadfgfkd3fdlafgdf',
    message: 'test입니다.2222 ',
    is_read: false,
    url: '/test/test',
    create_at: new Date('2024-03-07T12:00:00Z'),
  },
  {
    id: 'aadfgfkdf4dlafgdf',
    message: 'test입니다.2222 ',
    is_read: false,
    url: '/test/test',
    create_at: new Date('2022-03-07T12:00:00Z'),
  },
  {
    id: 'aadfgfkdf5dlafgdf',
    message: 'test입니다.2222 ',
    is_read: false,
    url: '/test/test',
    create_at: new Date('2025-03-07T13:00:00Z'),
  },
];
export default Alarm;
