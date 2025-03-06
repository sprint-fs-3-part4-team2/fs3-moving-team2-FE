'use client';
import React, { useEffect, useState } from 'react';
import cn from '@/utils/cn';
import Image from 'next/image';
import { type C1 } from '../types/type';

interface RoleImgProps extends C1 {
  src: string;
}
export default function RoleImg({ src, className = '' }: RoleImgProps) {
  const [playing, setPlaying] = useState(false);
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMount(true);
    }, 100);
  }, []);

  if (!isMount) return null;

  function onMouseEnterHandler(e: React.MouseEvent<HTMLLIElement>) {
    e.preventDefault();
    setPlaying(true);
  }

  function onMouseLeaveHandler(e: React.MouseEvent<HTMLLIElement>) {
    e.preventDefault();
    setPlaying(false);
  }

  return (
    <li
      className={cn(
        `bg-white rounded-md group w-[300px] relative flex items-center justify-center`,
        !!className && className,
      )}
      onMouseOver={onMouseEnterHandler}
      onMouseOut={onMouseLeaveHandler}
    >
      <div
        className={cn(
          `flex items-center justify-center w-[300px] overflow-hidden rounded-lg`,
        )}
      >
        <div className={`transition-all duration-500`}>
          <Image
            className={``}
            src={src}
            alt='이미지'
            width={300}
            height={200}
          />
        </div>
      </div>
    </li>
  );
}
