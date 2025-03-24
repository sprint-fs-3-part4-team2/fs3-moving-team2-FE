import { Address } from '@/services/types/quotesDetail/common.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuoteRequestRegisterData {
  moveType: string;
  moveDate: Date | null;
  moveTime: string;
  moveFrom: Address;
  moveTo: Address;
}

interface QuoteRequestStoreState {
  registerData: QuoteRequestRegisterData;
  setRegisterData: (data: Partial<QuoteRequestRegisterData>) => void;
}

const useQuoteRequestStore = create<QuoteRequestStoreState>()(
  persist(
    (set) => ({
      registerData: {
        moveType: '',
        moveDate: null,
        moveTime: '',
        moveFrom: {
          sido: '',
          sigungu: '',
          street: '',
          fullAddress: '',
        },
        moveTo: {
          sido: '',
          sigungu: '',
          street: '',
          fullAddress: '',
        },
      },
      setRegisterData: (data: Partial<QuoteRequestRegisterData>) =>
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
