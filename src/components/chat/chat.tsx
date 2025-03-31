'use client';
import Dropdown from '../dropdown/dropdown';
import cn from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';
import { CloseBtn } from '@/app/(routes)/select-role/components/tooltip';
import { formatDistanceToNow } from 'date-fns';
import {
  ko,
  FormatDistanceToken,
  FormatDistanceFnOptions,
} from 'date-fns/locale';
import { FixedSizeList as List } from 'react-window';
import { getChatRoomAPi } from './api/api';
import ChatBox from './chatbox';
import {
  LastMessageType,
  type ChatList,
  type ChatRoomType,
} from './types/chat.type';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

function ChatRoomList({ isOpen = false }: ChatList) {
  const [open, setOpen] = useState<boolean>(isOpen);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [chatInfo, setChatInfo] = useState({ targetId: '', targetName: '' });
  const [lastMessage, setLastMessage] = useState<LastMessageType[]>([]);
  const [data, setData] = useState<ChatRoomType[]>([]);
  const divRef = useRef<HTMLDivElement>(null);
  const { data: chatData, isFetched } = useQuery({
    queryKey: ['chat'],
    queryFn: getChatRoomAPi,
  });

  function close(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setOpen(false);
  }

  function openHandle(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setOpen((prev) => !prev);
  }

  useEffect(() => {
    if (chatData && isFetched) {
      console.log('fetched', chatData);
      setData(chatData.rooms ?? []);
      setLastMessage(
        chatData.rooms ?? [].map((room: ChatRoomType) => room.lastMessage),
      );
    }
  }, [chatData, isFetched]);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const chat = data[index];
    const target = chat.conversationPartner[0];
    const userType =
      target.user.userType.toLocaleLowerCase() === 'mover'
        ? '기사님'
        : '고객님';
    return (
      <div
        style={style}
        className={cn(
          'chatRoomItem',
          'flex flex-wrap border-b relative overflow-hidden py-2 cursor-pointer',
        )}
        onClick={(e) => {
          e.preventDefault();
          setChatOpen((prev) => !prev);
          setChatInfo({
            targetId: target.userId,
            targetName: `${target.user.name} ${userType}`,
          });
        }}
      >
        <p className={cn('w-full font-bold text-lg px-2 mb-1')}>
          {target.user.name}
          <span className={cn('ml-1 text-sm text-primary-blue-200')}>
            {userType}
          </span>
        </p>
        <div className={cn('w-full h-3/5 flex justify-between pl-3 pr-2')}>
          <p
            className={cn(
              'content',
              ' relative w-full text-md font-semibold text-black-100 truncate',
            )}
          >
            {lastMessage[index].content}
          </p>
          <p className={cn('time', 'w-[10ch] text-grayscale-300 text-xs')}>
            {isTime(lastMessage[index].updatedAt)}
          </p>
        </div>
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
          'fixed bottom-4 right-[60px] z-[100] rounded-full w-12 h-12',
        )}
        onClick={openHandle}
      >
        <Image
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          src='/icons/chat-icon.svg'
          alt='chat'
          width={30}
          height={30}
        />
      </div>
      <Dropdown
        isOpen={open}
        className={cn(
          'fixed block bottom-4 right-4 w-[332px] h-[450px] z-[110]',
          // 'xl:max-h-[450px] xl:w-[360px]',
          'overflow-hidden px-0 pl-0 shadow-2xl',
        )}
      >
        <div className='py-[14px] h-[54px] relative border-b'>
          <h2 className='text-lg lg:text-[18px] px-4 font-bold text-black-400'>
            {chatOpen && chatInfo.targetName} 채팅
          </h2>
          <div
            className={cn(
              'right-btn',
              'absolute top-1/2 right-5 transform -translate-y-1/2 flex justify-around',
            )}
          >
            {chatOpen ? (
              <div
                className={cn(
                  'back-btn',
                  'cursor-pointer group',
                  'w-[18px] h-[18px]',
                )}
                onClick={() => {
                  setChatOpen(false);
                }}
              >
                <div
                  className={cn(
                    'w-1/2 h-1/2 border-t-2 border-r-2 rotate-45 border-black-100 mt-1',
                    'group-hover:border-primary-blue-200 transition-all duration-100',
                  )}
                ></div>
              </div>
            ) : (
              <CloseBtn
                className={cn(
                  'w-4 h-4',
                  'relative cursor-pointer -translate-y-0 top-0',
                )}
                onClick={close}
              />
            )}
          </div>
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
            height={400}
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
        <ChatBox isOpen={chatOpen}></ChatBox>
      </Dropdown>
    </div>
  );
}

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
function isTime(date: Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: customKo,
  });
}

export default ChatRoomList;
