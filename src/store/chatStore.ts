import {
  ChatRoomType,
  LastMessageType,
} from '@/components/chat/types/chat.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatStoreType {
  chatRoom: ChatRoomType[];
  //   lastMessage: LastMessageType[];
  setChat: (data: ChatRoomType[]) => void;
}
export const chatStore = create<ChatStoreType>((set) => ({
  chatRoom: [],
  setChat: (data: ChatRoomType[]) =>
    set({
      chatRoom: data,
      //   lastMessage: data.map((v) => v.lastMessage),
    }),
}));
