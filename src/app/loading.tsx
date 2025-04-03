'use client';
import { BounceLoader } from 'react-spinners';

export default function Loading({ loading = true }: { loading?: boolean }) {
  const color = '#4da9ff';
  return (
    <div className='relative w-full h-screen'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center w-[400px]'>
        <BounceLoader
          className=''
          color={color}
          loading={loading}
          speedMultiplier={0.8}
        />
        <p className='text-3xl mt-4'>
          로딩 중
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className='text-5xl font-bold'
              style={{
                animation: `blink 3s ${i}s infinite`,
              }}
            >
              .
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
