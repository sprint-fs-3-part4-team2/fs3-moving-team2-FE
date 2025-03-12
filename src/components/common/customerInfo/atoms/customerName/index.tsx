import { CustomerNameProps } from './customerName.types';

export default function CustomerName({ name }: CustomerNameProps) {
  return (
    <div className='flex gap-1 md:gap-1 xl:gap-2 xl:text-[20px] font-semibold'>
      <span>{name}</span>
      <span>고객님</span>
    </div>
  );
}
