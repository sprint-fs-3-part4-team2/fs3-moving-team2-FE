import { CustomerRequest } from '@/app/(routes)/mover/(main)/quotes/requested/page';
import React, { Dispatch, SetStateAction } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import ModalWrapper from '../modal/ModalWrapper';
import CustomerInfo from '../common/customerInfo/templates/customerInfo';
import FormInput from '../common/inputSection/atoms/customInput/inputs/formInput';
import CommonButton from '../common/commonBtn/commonBtn';

interface MoverQuoteDeclineModalProps {
  selectedCustomer: CustomerRequest | null;
  setShowDeclineModal: Dispatch<SetStateAction<boolean>>;
}

export default function MoverQuoteDeclineModal(
  { selectedCustomer, setShowDeclineModal }: MoverQuoteDeclineModalProps,
  onSubmit: (data: FieldValues) => void,
) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FieldValues>({ mode: 'onChange' });

  const quoteCommentValue = watch('quoteComment') || '';

  return (
    <ModalWrapper
      title='요청 반려'
      onClose={() => setShowDeclineModal(false)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-6 xl:mb-10' />
        <CustomerInfo
          quoteId={selectedCustomer?.quoteId || ''}
          movingType={selectedCustomer?.movingType || []}
          isCustomQuote={selectedCustomer?.isCustomQuote || false}
          customerName={selectedCustomer?.customerName || ''}
          movingDate={selectedCustomer?.movingDate || new Date()}
          departure={selectedCustomer?.departure || ''}
          arrival={selectedCustomer?.arrival || ''}
          variant='submitted'
          completed={false}
          declined={false}
        />
        <div className='mb-8' />
        <h3 className='sm:text-lg xl:text-xl font-semibold mb-4'>
          반려 사유를 입력해 주세요
        </h3>

        <FormInput
          inputVariant='form'
          register={register}
          errors={errors}
          name='quoteComment'
          placeholder='반려 사유를 입력해 주세요'
          type='text'
          validation={{
            required: '반려 사유는 필수입니다.',
            minLength: {
              value: 10,
              message: '최소 10자 이상 입력해 주세요.',
            },
          }}
          inputType='textarea'
          styleVariant='primary'
        />
        <p className='text-xs text-gray-500 mt-1'>
          {quoteCommentValue.length} / 10자 이상
        </p>
        <CommonButton
          type='submit'
          className='mt-8'
          widthType='full'
          heightType='primary'
          backgroundColorType={isValid ? 'blue' : 'gray'}
        >
          반려하기
        </CommonButton>
      </form>
    </ModalWrapper>
  );
}
