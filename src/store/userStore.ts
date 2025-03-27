import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  imageUrl?: string;
  role: 'customer' | 'mover';
}

interface UserState {
  user: User | null;
  isAuthorized: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthorized: false,
  login: (user) => set({ user, isAuthorized: true }),
  logout: () => set({ user: null, isAuthorized: false }),
}));
