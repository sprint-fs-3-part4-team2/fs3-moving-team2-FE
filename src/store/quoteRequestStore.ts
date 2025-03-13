import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RegisterData {
  moveType: string;
  moveDate: Date | null;
  moveTime: string;
  moveFrom: string;
  moveTo: string;
}

interface QuoteRequestStoreState {
  registerData: RegisterData;
  setRegisterData: (data: Partial<RegisterData>) => void;
}

const useQuoteRequestStore = create<QuoteRequestStoreState>()(
  persist(
    (set) => ({
      registerData: {
        moveType: '',
        moveDate: null,
        moveTime: '',
        moveFrom: '',
        moveTo: '',
      },
      setRegisterData: (data: Partial<RegisterData>) =>
        set((state) => ({
          registerData: { ...state.registerData, ...data },
        })),
    }),
    {
      name: 'quote-request-store', // localStorage key
    },
  ),
);

export default useQuoteRequestStore;
