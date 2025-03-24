'use client';

import { useEffect } from 'react';

/**
 * 커스텀 훅: ESC 키를 눌렀을 때 특정 동작을 수행
 *
 * - 모달이나 사이드 메뉴를 닫는 동작 처리
 * - 특정 UI 상태를 ESC 키로 변경해야 할 때
 * 
 * @example
 * import useEscapeKey from '@/hooks/useEscapeKey';
 * 
 * useEscapeKey(() => {
    setIsOpen(false);
  });

 * ESC 키로 상태를 바꾸고 싶을 때 위와 같이 사용하면 됩니다
 * setter 함수를 콜백 함수에 넣어 작동 시킴
 *
 * @param {() => void} onEscape - ESC 키가 눌렸을 때 실행되는 콜백 함수
 */
export default function useEscapeKey(onEscape: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscape(); // ESC 키를 누르면 실행
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown); // 이벤트 제거
    };
  }, [onEscape]);
}
