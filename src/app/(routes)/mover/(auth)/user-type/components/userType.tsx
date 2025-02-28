import Image, { StaticImageData } from 'next/image';
import { C1 } from '../types/type';

interface UserTypeProps extends C1 {
  src: string | StaticImageData;
  width?: number;
  height?: number;
}
export default function UserType({ src, width, height }: UserTypeProps) {
  const att = {
    src: src || '',
    alt: '유저타입',
    width: width || 300,
    height: height || 250,
  };
  return (
    <li>
      <Image className='' {...att} />
    </li>
  );
}
