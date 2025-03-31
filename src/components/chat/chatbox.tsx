'use client';
import cn from '@/utils/cn';
import socket from '@/utils/socket';
import { useState, useRef, useEffect, useCallback } from 'react';
import CommonButton from '../common/commonBtn/commonBtn';
import MessageItem from './message';
import { type MessageResponse } from './types/chat.type';
import { VariableSizeList as List } from 'react-window';

const userId = 'cm8sek5v90000iu2xvmmm1j35';

export default function ChatBox({
  targetId,
  isOpen = false,
}: {
  targetId?: string;
  isOpen: boolean;
}) {
  const containerRef = useRef<any>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<MessageResponse[]>([]);
  const [input, setInput] = useState<string>('');

  const chatEnter = () => {
    console.log('채팅방 입장');
    socket.emit(
      'chatRoom',
      {
        targetId: targetId || 'cm8sdyggr0001iucfgpbj3p08',
      },
      (res: any) => {
        if (res.ok) {
          setMessage([...res.chatRoom.ChatMessage]);
        }
      },
    );
  };

  const chatMsg = () => {
    if (!!input)
      socket.emit('chatMsg', { message: input }, (res: any) => {
        if (res.ok) {
          const newMsg = {
            content: input,
            userId: res.message.userId,
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
    if (isOpen) {
      if (!socket.connected) {
        socket.connect();
      }
      chatEnter();
    } else {
      socket.disconnect();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          ref={targetRef}
          className={cn(
            'chat',
            'absolute bottom-0 left-0 w-[332px] bg-line-100 overflow-hidden z-[100]',
          )}
        >
          <List
            className={cn('chat-msg', 'custom-scroll')}
            height={270}
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
                e.preventDefault();
                e.stopPropagation();

                const { currentTarget } = e;
                setInput(currentTarget.value);
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  chatMsg();
                }
              }}
              placeholder='메세지 입력'
            />
            <CommonButton
              className={cn('block h-10')}
              widthType={'full'}
              heightType={'dynamic'}
              onClick={chatMsg}
            >
              전송
            </CommonButton>
          </div>
        </div>
      )}
    </>
  );
}
