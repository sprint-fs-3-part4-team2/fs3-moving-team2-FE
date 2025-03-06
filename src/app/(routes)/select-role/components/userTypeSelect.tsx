'use client';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import type { C1 } from '../types/type';
import cn from '@/utils/cn';
import { flex_center } from '../styles/tailwind';
import Animate from './animate';

interface UserTypeProps extends C1 {
  src: string;
}
export default function UserTypeSelect({ src, className = '' }: UserTypeProps) {
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
        `${className} group w-[300px] relative ${flex_center}`,
      ).trim()}
      onMouseOver={onMouseEnterHandler}
      onMouseOut={onMouseLeaveHandler}
    >
      <Animate>
        <div
          className={cn(`${flex_center} w-[300px] overflow-hidden rounded-lg`)}
        >
          <div className={`transition-all duration-500`}>
            <ReactPlayer
              url={src}
              style={{ margin: 'auto', width: '100%' }}
              // playing={playing}
              playing={true}
              loop
              muted
              controls={false}
              width={`100%`}
              height={`200px`}
            />
          </div>
        </div>
      </Animate>
    </li>
  );
}
