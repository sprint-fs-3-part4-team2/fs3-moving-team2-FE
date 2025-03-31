// 'use client';
import React from 'react';
import cn from '@/utils/cn';

interface MessageItemProps {
  msg: {
    content: string;
    userId: string;
  };
  userId: string;
}
const MessageItem = React.memo(({ msg, userId }: MessageItemProps) => (
  <p
    className={cn(
      'px-3 py-2 rounded-xl max-w-[60%] text-md shadow-md',
      msg.userId === userId
        ? 'ml-auto bg-primary-blue-50'
        : 'bg-primary-blue-50',
    )}
  >
    {msg.content}
  </p>
));

export default MessageItem;
