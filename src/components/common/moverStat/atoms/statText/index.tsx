import cn from '@/utils/cn';
import { TextProps } from './statText.types';

export default function StatText({ children, variant }: TextProps) {
  return (
    <span
      className={cn(
        variant === 'primary' ? 'text-black-300' : 'text-grayscale-300',
        'font-medium',
      )}
    >
      {children}
    </span>
  );
}
