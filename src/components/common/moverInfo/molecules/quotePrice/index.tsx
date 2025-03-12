import InfoContainer from '../../../shared/atoms/listInfos/infoContainer';
import PriceInfo from '../../../shared/atoms/listInfos/priceInfo';
import InfoTitle from '../../../shared/atoms/listInfoTitle';
import { quotePriceProps } from './quotePrice.types';

export default function QuotePrice({ price }: quotePriceProps) {
  return (
    <InfoContainer>
      <InfoTitle>견적가</InfoTitle>
      <PriceInfo price={price} />
    </InfoContainer>
  );
}
