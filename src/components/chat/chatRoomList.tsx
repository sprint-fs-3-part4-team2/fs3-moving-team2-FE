'use client';
import Dropdown from '../dropdown/dropdown';
import cn from '@/utils/cn';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { CloseBtn } from '@/app/(routes)/select-role/components/tooltip';
import { formatDistanceToNow } from 'date-fns';
import {
  ko,
  FormatDistanceToken,
  FormatDistanceFnOptions,
} from 'date-fns/locale';
import { usePathname } from 'next/navigation';
import { FixedSizeList as List } from 'react-window';
import { getChatRoomAPi } from './api/api';
import { UserType } from '../authPage/common.types';
import ChatBox from './chat';

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
interface ChatList extends PropsWithChildren {
  isOpen?: boolean;
}
interface ChatRoomType {
  conversationPartner: {
    joinedAt: Date;
    userId: string;
    role: string;
    user: {
      name: string;
    };
  }[];
  id: string;
  roomCreatedAt: Date;
  lastMessage: {
    id: string;
    content: string;
    updatedAt: Date;
    user: {
      name: string;
      userType: UserType;
    };
  };
}
function ChatRoomList({ isOpen = false, children }: ChatList) {
  const [open, setOpen] = useState<boolean>(isOpen);
  const [data, setData] = useState<ChatRoomType[]>([]);
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

  function close(e: React.MouseEvent<HTMLDivElement>) {
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

  useEffect(() => {
    getChatRoomAPi().then((res) => {
      if (res.ok) {
        console.log(res.rooms);
        setData(res.rooms);
      }
    });
  }, []);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const chat = data[index];
    return (
      <div
        style={style}
        className={cn(
          'chatRoomItem',
          'flex flex-wrap border relative overflow-hidden py-2 cursor-pointer',
        )}
      >
        <ChatBox>
          <p className={cn('w-full font-bold text-lg px-2 mb-1')}>
            {chat.lastMessage.user.name}
            <span className={cn('')}>
              {chat.lastMessage.user.userType.toLocaleLowerCase() === 'mover'
                ? '기사님'
                : '고객님'}
            </span>
          </p>
          <div className={cn('w-full h-3/5 flex justify-between px-2')}>
            <p
              className={cn(
                'content',
                ' relative w-full text-black-400 text-md truncate',
              )}
            >
              {chat.lastMessage.content}
            </p>
            <p className={cn('time', 'w-[10ch] text-grayscale-300 text-xs')}>
              {isTime(chat.lastMessage.updatedAt)}
            </p>
          </div>
        </ChatBox>
      </div>
    );
  };

  return (
    <div
      className={cn('chatRoom', '')}
      ref={divRef}
    >
      <div
        className={cn(
          'chatRoomBtn',
          'fixed bottom-4 right-[60px] z-[100] border w-10 h-10 bg-primary-blue-200',
        )}
        onClick={openHandle}
      >
        채팅
      </div>
      <Dropdown
        isOpen={open}
        className={cn(
          'fixed block bottom-4 right-4 w-[312px] h-[350px] z-[110]',
          'xl:max-h-[352px] xl:w-[360px]',
          'overflow-hidden px-0 pl-0 shadow-2xl',
        )}
      >
        <div className='py-[14px] h-[54px] relative'>
          <h2 className='text-lg lg:text-[18px] px-4 font-bold text-black-400'>
            채팅
          </h2>
          <CloseBtn
            className={cn(
              'top-1/2 right-5 transform -translate-y-1/2',
              'w-4 h-4',
              'cursor-pointer',
            )}
            onClick={close}
          />
        </div>
        {data.length === 0 ? (
          <div
            className={cn(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -trnaslate-y-1/2 text-md',
            )}
          >
            채팅방이 없습니다.
          </div>
        ) : (
          <List
            className={cn('chat-msg', 'custom-scroll')}
            height={300}
            itemCount={data.length}
            itemSize={80}
            width={'100%'}
            // ref={containerRef}
          >
            {({ index, style }) => {
              return (
                <Row
                  index={index}
                  style={style}
                />
              );
            }}
          </List>
        )}
      </Dropdown>
    </div>
  );
}

export default ChatRoomList;
