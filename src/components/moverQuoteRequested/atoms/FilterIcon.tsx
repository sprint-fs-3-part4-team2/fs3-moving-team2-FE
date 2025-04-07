import Image from 'next/image';
import React from 'react';
import filterIcon from '@/public/icons/filter-blue.svg';

export function FilterIcon() {
  return (
    <Image
      src={filterIcon}
      alt='필터 아이콘'
    />
  );
}
