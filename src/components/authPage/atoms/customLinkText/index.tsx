import { Link } from 'lucide-react';
import cn from '@/utils/cn';
import { CustomLinkTextProps } from './customLinkText.type';

export default function CustomLinkText({ url, children }: CustomLinkTextProps) {
  return (
    <Link
      href={url}
      key={url}
    >
      <span className={cn('text-xs text-blue-300 font-semibold', 'xl:text-xl')}>
        {children}
      </span>
    </Link>
  );
}
