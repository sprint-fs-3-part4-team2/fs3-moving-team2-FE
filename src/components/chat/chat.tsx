'use client';
import cn from '@/utils/cn';
import { useEffect, useRef, useState, ChangeEvent } from 'react';
import CommonButton from '../common/commonBtn/commonBtn';

export default function ChatComponent(): JSX.Element {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const connectWebSocket = () => {
    const ws = new WebSocket('ws://localhost:8080/chat');

    ws.onopen = () => {
      console.log('✅ 웹소켓 연결됨');
      // 재연결 타이머 초기화
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
        ws.send(JSON.stringify({ test: '' }));
      }
    };

    ws.onmessage = (event: MessageEvent) => {
      setMessages((prev) => [...prev, event.data]);
    };

    setTimeout(() => {
      ws.onclose = () => {
        console.log('❌ 웹소켓 연결 종료, 재연결 시도...');
        // 3초 후 재연결
        reconnectTimerRef.current = setTimeout(() => {
          connectWebSocket();
        }, 3000);
      };

      ws.onerror = (error) => {
        console.error('🚨 웹소켓 오류:', error);
      };
    }, 100);

    socketRef.current = ws;
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      console.log('컴포넌트 언마운트됨: 소켓 연결 종료 시도 중...');
      // 컴포넌트 언마운트 시 재연결 타이머 취소
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
      // 현재 소켓이 존재하면 닫기
      if (socketRef.current) {
        socketRef.current.close();
        console.log('소켓 연결 종료됨');
      }
    };
  }, []);

  // 새 메시지가 추가되면 스크롤을 아래로 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (): void => {
    if (socketRef.current && input && input.trim()) {
      socketRef.current.send(
        JSON.stringify({
          userId: [],
          message: input,
        }),
      ); // 📌 여기서 소켓으로 메시지 전송해야 함
      setInput('');
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setInput(e.target.value);
  };

  return (
    <div
      className={cn(
        'chat',
        'w-full max-w-[350px] bg-line-100 px-3 py-3 rounded-2xl shadow-md',
      )}
    >
      <div
        className={cn(
          'chat-msg',
          'h-[150px] flex flex-col-reverse overflow-y-auto p-2 custom-scroll',
        )}
      >
        {messages.map((msg, index) => {
          return (
            <p
              className={cn('')}
              key={index}
            >
              {msg}
            </p>
          );
        })}
      </div>
      <textarea
        className={cn(
          'chat-msg-input',
          'w-full border-0 resize-none bg-transparent',
        )}
        value={input}
        onChange={handleInputChange}
        placeholder='메시지 입력'
      />
      <div className={cn('btn-line', 'w-full ')}>
        <CommonButton
          onClick={sendMessage}
          className={cn('btn', 'block')}
          widthType={'full'}
          heightType={'tertiary'}
        >
          전송
        </CommonButton>
      </div>
    </div>
  );
}
