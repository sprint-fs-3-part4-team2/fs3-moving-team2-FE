'use client';
import React, { useEffect, useState } from 'react';
import UserTypeSelect from '@/app/(routes)/type/components/userTypeSelect';
import { useRouter, useParams } from 'next/navigation';
import cn from '@/utils/cn';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const [title, setTitle] = useState('');

  useEffect(() => {
    switch (params.type) {
      case 'singup':
        setTitle('회원가입');
        break;
      case 'singin':
        setTitle('로그인');
        break;
      default:
    }
  }, [params.type]);

  return (
    <div className='w-full relative h-screen'>
      <div
        className={cn(
          `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`,
        )}
      >
        <h2 className={`text-4xl font-bold text-center mb-10`}>{title}</h2>
        <ul className='flex justify-between items-center w-[620px] h-[250px] '>
          <UserTypeSelect src={'/video/mover.mp4'} />
          <UserTypeSelect src={'/video/common.mp4'} />
        </ul>
      </div>
    </div>
  );
}
