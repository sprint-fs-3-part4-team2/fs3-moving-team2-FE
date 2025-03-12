import Image from 'next/image';

export default function StarIcon(): JSX.Element {
  return (
    <Image
      src='/icons/star/filled.svg'
      alt='star icon'
      width={20}
      height={20}
    />
  );
}
