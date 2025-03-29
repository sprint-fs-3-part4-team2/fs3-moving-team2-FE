'use client';
import cn from '@/utils/cn';
import socket from '@/utils/socket';
import { useState, useRef, useEffect, type PropsWithChildren } from 'react';
import CommonButton from '../common/commonBtn/commonBtn';
import MessageItem from './message';
import { MessageResponse, RowProps } from './types/chat.type';
import { FixedSizeList as List } from 'react-window';

const userId = 'cm8sek5v90000iu2xvmmm1j35';

export default function ChatBox({ children }: PropsWithChildren) {
  const containerRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<MessageResponse[]>([]);
  const [input, setInput] = useState<string>('');

  const chatEnter = () => {
    socket.emit(
      'chatRoom',
      {
        targetId: 'cm8sdyggr0001iucfgpbj3p08',
      },
      (res: any) => {
        if (res.ok) {
          setMessage([...res.chatRoom.ChatMessage]);
          setIsOpen((prev) => !prev);
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
            userId,
            createdAt: new Date(),
          };
          setMessage((prev) => [...prev, newMsg]);
          setInput('');
        }
      });
  };

  const Row = ({ index, style }: RowProps) => {
    const msg = message[index];
    return (
      <div style={style}>
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
  return (
    <div>
      <div onClick={chatEnter}>{children ? children : '클릭'}</div>
      {isOpen && (
        <div
          className={cn(
            'chat',
            'w-full max-w-[325px] bg-line-100 overflow-hidden rounded-xl border',
          )}
        >
          <List
            className={cn('chat-msg', 'custom-scroll')}
            height={320}
            itemCount={message.length}
            itemSize={60}
            width={'100%'}
            ref={containerRef}
          >
            {({ index, style }) => (
              <Row
                index={index}
                style={style}
              />
            )}
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
                'w-full border-0 outline-none ring-0 resize-none h-20 mb-2 custom-scroll',
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
            >
              전송
            </CommonButton>
          </div>
        </div>
      )}
    </div>
  );
}
