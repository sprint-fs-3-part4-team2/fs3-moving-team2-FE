import Image from 'next/image';
import search from '@/public/icons/search.svg';
import cn from '@/utils/cn';
import { SearchButtonProps } from './searchButton.types';

export default function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      type='button'
      className={cn('absolute cursor-pointer top-[14px] left-6')}
    >
      <Image
        src={search}
        alt='검색 버튼'
      />
    </button>
  );
}
