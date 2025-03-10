import InfoContainer from '../../atoms/infos/infoContainer';
import PriceInfo from '../../atoms/infos/priceInfo';
import InfoTitle from '../../atoms/infoTitle';
import { quotePriceProps } from './quotePrice.types';

export default function QuotePrice({ price }: quotePriceProps) {
  return (
    <InfoContainer>
      <InfoTitle>견적가</InfoTitle>
      <PriceInfo price={price} />
    </InfoContainer>
  );
}
