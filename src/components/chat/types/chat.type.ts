import { PropsWithChildren } from 'react';
import { UserType } from '@/components/authPage/common.types';
export interface MessageResponse {
  content: string;
  createdAt: Date;
  userId: string;
}

export interface RowProps {
  index: number;
  style?: React.CSSProperties;
}

export interface ChatList extends PropsWithChildren {
  isOpen?: boolean;
}
export interface ChatRoomType {
  conversationPartner: {
    joinedAt: Date;
    userId: string;
    role: string;
    user: {
      name: string;
      userType: UserType;
    };
  }[];
  id: string;
  roomCreatedAt: Date;
  lastMessage: LastMessageType;
}

export interface LastMessageType {
  id: string;
  content: string;
  updatedAt: Date;
  user: {
    name: string;
    userType: UserType;
  };
}
