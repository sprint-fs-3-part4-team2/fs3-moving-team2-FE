import Image from 'next/image';

export default function StarIcon(): JSX.Element {
  return (
    <div className='relative w-[14px] h-[14px] mr-1.5'>
      <Image
        src='/icons/star/filled.svg'
        alt='star icon'
        fill
        className='object-contain'
      />
    </div>
  );
}
