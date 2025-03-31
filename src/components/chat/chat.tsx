'use client';
import cn from '@/utils/cn';
import socket from '@/utils/socket';
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type PropsWithChildren,
} from 'react';
import CommonButton from '../common/commonBtn/commonBtn';
import MessageItem from './message';
import { MessageResponse } from './types/chat.type';
import { VariableSizeList as List } from 'react-window';

const userId = 'cm8sek5v90000iu2xvmmm1j35';

export default function ChatBox({
  children,
  targetId,
}: PropsWithChildren & { targetId?: string }) {
  const containerRef = useRef<any>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<MessageResponse[]>([]);
  const [input, setInput] = useState<string>('');

  const chatEnter = () => {
    if (!isOpen) {
      socket.emit(
        'chatRoom',
        {
          targetId: targetId || 'cm8sdyggr0001iucfgpbj3p08',
        },
        (res: any) => {
          if (res.ok) {
            setMessage([...res.chatRoom.ChatMessage]);
            setIsOpen((prev) => !prev);
          }
        },
      );
    }
  };

  const chatMsg = () => {
    if (!!input)
      socket.emit('chatMsg', { message: input }, (res: any) => {
        if (res.ok) {
          const newMsg = {
            content: input,
            userId,
            createdAt: new Date(),
          };
          setMessage((prev) => [...prev, newMsg]);
          setInput('');
        }
      });
  };

  // 메시지 높이를 계산하는 함수
  const getItemSize = useCallback(
    (index: number) => {
      const msg = message[index];
      // 기본 값: 한 줄에 들어갈 문자 수, 한 줄의 높이, 그리고 패딩
      const maxCharsPerLine = 20;
      const lineHeight = 30; // 한 줄 높이 (px)
      const verticalPadding = 25; // 위아래 패딩 합 (px)

      // 메시지 내용 길이에 따라 필요한 줄 수 계산
      const lines = Math.ceil(msg.content.length / maxCharsPerLine);
      // 최소 높이를 지정 (한 줄 높이 + 패딩)
      const minHeight = lineHeight + verticalPadding;
      const calculatedHeight = lines * lineHeight + verticalPadding;
      return Math.max(minHeight, calculatedHeight);
    },
    [message],
  );

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const msg = message[index];
    return (
      <div
        style={style}
        className={cn(
          'flex items-center',
          userId === msg.userId ? 'pr-2' : 'pl-2',
        )}
      >
        <MessageItem
          key={`${msg.content}-${index}`}
          msg={msg}
          userId={userId}
        />
      </div>
    );
  };

  useEffect(() => {
    if (containerRef.current && message.length) {
      containerRef.current.scrollToItem(message.length - 1, 'end');
    }
  }, [message]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={cn('chat-box w-full')}>
      <div onClick={chatEnter}>{children ? children : '클릭'}</div>
      {isOpen && (
        <div
          ref={targetRef}
          className={cn(
            'chat',
            'fixed bottom-3 right-4 w-[325px] bg-line-100 overflow-hidden rounded-xl border z-[100] shadow-lg',
          )}
        >
          <List
            className={cn('chat-msg', 'custom-scroll')}
            height={300}
            itemCount={message.length}
            itemSize={getItemSize}
            width={'100%'}
            ref={containerRef}
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
          <div
            className={cn(
              'chat-msg-input-area',
              'flex flex-wrap bg-white px-2 py-3',
            )}
          >
            <textarea
              className={cn(
                'chat-msg-input',
                'w-full border-0 outline-none ring-0 resize-none h-16 mb-2 custom-scroll',
                'focuse:outline-none focus:ring-0',
              )}
              value={input}
              onChange={(e) => {
                const { currentTarget } = e;
                setInput(currentTarget.value);
              }}
              placeholder='메세지 입력'
            />
            <CommonButton
              className={cn('block h-10')}
              widthType={'full'}
              heightType={'dynamic'}
              onClick={chatMsg}
              onKeyDown={(e) => {}}
            >
              전송
            </CommonButton>
          </div>
        </div>
      )}
    </div>
  );
}
