import { useCallback, useState } from 'react';

type StorageType = 'local' | 'session';

export function useStorage<T>(
  key: string,
  initialValue: T,
  type: StorageType = 'local',
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const storage = type === 'local' ? localStorage : sessionStorage;

  // 초기 상태 설정
  const [storedValue, setStoredValue] = useState<T>(() => {
    // SSR을 고려하여 초기값 설정
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading ${type}Storage key "${key}":`, error);
      return initialValue;
    }
  });

  // 값 업데이트 함수
  const setValue: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (valueOrFn) => {
      try {
        // 새 상태값을 계산
        const newValue =
          valueOrFn instanceof Function ? valueOrFn(storedValue) : valueOrFn;

        // 상태 업데이트
        setStoredValue(newValue);

        // 스토리지에 저장
        if (typeof window !== 'undefined') {
          storage.setItem(key, JSON.stringify(newValue));
        }
      } catch (error) {
        console.error(`Error setting ${type}Storage key "${key}":`, error);
      }
    },
    [key, storedValue, storage, type],
  );

  // 값 삭제 함수
  const removeValue = () => {
    setStoredValue(initialValue);
    if (typeof window !== 'undefined') {
      storage.removeItem(key);
    }
  };

  return [storedValue, setValue, removeValue];
}

export const useLocalStorage = <T>(key: string, initialValue: T) =>
  useStorage<T>(key, initialValue, 'local');

export const useSessionStorage = <T>(key: string, initialValue: T) =>
  useStorage<T>(key, initialValue, 'session');
