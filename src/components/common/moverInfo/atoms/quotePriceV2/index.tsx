import { QuotePriceV2Props } from './quotePriceV2.types';

export default function QuotePriceV2({ price }: QuotePriceV2Props) {
  return (
    <div className='flex text-black-400 gap-2 md:gap-2 xl:gap-4 items-center'>
      <span className='text-[14px] md:text-[14px] xl:text-[18px] font-medium'>
        견적 금액
      </span>
      <span className='text-[18px] md:text-[18px] xl:text-[24px] font-bold'>
        {price.toLocaleString()}원
      </span>
    </div>
  );
}
