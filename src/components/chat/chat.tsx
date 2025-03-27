'use client';
import cn from '@/utils/cn';
import socket from '@/utils/socket';
import { useState } from 'react';
import CommonButton from '../common/commonBtn/commonBtn';

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState('');
  function chatEnter() {
    socket.emit(
      'chatRoom',
      {
        accessToken: 'cm8piyzri0000iungcqp4vkv6',
        targetId: 'cm8piyzri0001iungku3ooyjw',
      },
      (res: any) => {
        if (res.ok) {
          setIsOpen((prev) => !prev);
        }
      },
    );
  }
  function chatMsg() {
    socket.emit('chatMsg', msg, (res: any) => {
      console.log('chatMsg res', res);
    });
  }
  return (
    <div>
      <div onClick={chatEnter}>채팅방 입장</div>
      {isOpen && (
        <div className={cn('chat', '')}>
          <div className={cn('chat-msg', '')}></div>
          <div className={cn('chat-msg-input-area', '')}>
            <input
              type='text'
              className={cn('chat-msg-input', 'border-0 outline-none ring-0')}
              onChange={(e) => {
                const { currentTarget } = e;
                setMsg(currentTarget.value);
              }}
              placeholder='메세지 입력'
            />
            <CommonButton
              widthType={'half'}
              heightType={'tertiary'}
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
