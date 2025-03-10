import cn from '@/utils/cn';
import { PriceInfoProps } from './priceInfo.types';
import { INFO_STYLE } from '../constants';

export default function PriceInfo({ price }: PriceInfoProps) {
  const formattedPrice = price.toLocaleString();

  return <span className={cn(INFO_STYLE)}>{formattedPrice}원</span>;
}
