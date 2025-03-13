import cn from '@/utils/cn';

interface RequestMessageProps {
  children: React.ReactNode;
  align?: 'left' | 'right';
  color?: 'white' | 'blue';
  onEdit?: () => void;
  onExitEdit?: () => void;
  className?: string;
}

export default function RequestMessage({
  children,
  align = 'left',
  color = 'white',
  className,
  onEdit,
  onExitEdit,
}: RequestMessageProps) {
  return (
    // 메시지 위치 조정
    <div
      className={cn(
        'w-full flex flex-col mb-6 text-md  xl:text-2lg',
        align === 'left' ? 'items-start' : 'items-end',
      )}
    >
      {/* 메시지 박스 */}
      <div
        className={cn(
          'py-5 flex items-center px-10',
          align === 'left'
            ? 'rounded-tr-3xl rounded-br-3xl rounded-bl-3xl '
            : 'rounded-tl-3xl rounded-br-3xl rounded-bl-3xl ',
          color === 'white' ? 'bg-white' : 'bg-primary-blue-300 text-white',
          className,
        )}
      >
        <div>{children}</div>
      </div>
      {/* 수정하기 버튼 */}
      {onEdit && !onExitEdit && (
        <div className='mt-2'>
          <button
            onClick={onEdit}
            className='underline underline-offset-2 text-grayscale-500 '
          >
            수정하기
          </button>
        </div>
      )}
      {/* 수정 취소하기 버튼 */}
      {onExitEdit && (
        <div className='mt-2'>
          <button
            onClick={() => {
              onExitEdit();
            }}
            className='underline underline-offset-2 text-grayscale-500 '
          >
            수정 취소하기
          </button>
        </div>
      )}
    </div>
  );
}
