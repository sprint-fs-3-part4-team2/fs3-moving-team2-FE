'use client';

import MovingInfo from '@/components/common/moverInfo/organisms/movingInfo';
import MovingTypeGroup from '../../../shared/molecules/movingTypeGroup';
import CustomerName from '../../atoms/customerName';
import HorizontalDivider from '../../atoms/horizontalDivider';
import { CustomerInfoProps } from './customerInfo.types';
import RequestedQuoteButtons from '../../molecules/requestedQuoteButtons';
import QuotePriceForList from '@/components/common/shared/atoms/quotePriceForList';
import IsCompletedQuote from '../../molecules/isCompletedQuote';
import IsDeclinedQuote from '../../molecules/isDeclinedQuote';

export default function CustomerInfo(props: CustomerInfoProps) {
  return (
    <div className='relative flex flex-col gap-4 shadow-primary px-4 md:px-4 xl:px-6 py-4 md:py-4 xl:py-5 rounded-[16px] bg-white'>
      {props.variant === 'submitted' && props.completed && (
        <IsCompletedQuote quoteId={props.quoteId} />
      )}
      {props.variant === 'submitted' && props.declined && <IsDeclinedQuote />}
      <div className='flex justify-between'>
        <MovingTypeGroup
          isCustomQuote={props.isCustomQuote}
          movingType={props.movingType}
          quoteState={props.quoteState}
        />
      </div>
      <CustomerName name={props.customerName} />
      <HorizontalDivider />
      <MovingInfo
        movingDate={props.movingDate}
        departure={props.departure}
        arrival={props.arrival}
        showDayOfWeek={true}
      />
      {props.variant === 'requested' && (
        <RequestedQuoteButtons
          onSubmit={props.onSubmit}
          onDecline={props.onDecline}
          isCustomQuote={props.isCustomQuote}
        />
      )}
      {props.variant === 'submitted' && props.quotePrice && (
        <div className='w-full flex justify-end'>
          <QuotePriceForList price={props.quotePrice} />
        </div>
      )}
    </div>
  );
}
