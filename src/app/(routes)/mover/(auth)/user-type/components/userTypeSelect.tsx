'use client';
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { C1 } from '../types/type';

interface UserTypeProps extends C1 {
  src: string | StaticImageData;
  width?: number;
  height?: number;
}
export default function UserTypeSelect({ src, width, height }: UserTypeProps) {
  const att = {
    src: src || '',
    width: width || 300,
    height: height || 250,
  };
  return (
    <li>
      <Image
        {...att}
        alt='유저타입'
      />
    </li>
  );
}
