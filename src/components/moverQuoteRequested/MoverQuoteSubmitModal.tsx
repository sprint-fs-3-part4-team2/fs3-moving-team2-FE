import React, { Dispatch, SetStateAction } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import CommonButton from '../common/commonBtn/commonBtn';
import ModalWrapper from '../modal/ModalWrapper';
import CustomerInfo from '../common/customerInfo/templates/customerInfo';
import FormInput from '../common/inputSection/atoms/customInput/inputs/formInput';
import { CustomerRequest } from '@/services/types/allQuotes/allQuoteRequests.types';
import { useQueryClient } from '@tanstack/react-query';
import { useSubmitQuoteByMoverMutation } from '@/hooks/useSubmitQuoteByMoverMutation';

interface MoverQuoteSubmitModalProps {
  selectedCustomer: CustomerRequest | null;
  setShowSubmitModal: Dispatch<SetStateAction<boolean>>;
}

export default function MoverQuoteSubmitModal({
  selectedCustomer,
  setShowSubmitModal,
}: MoverQuoteSubmitModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FieldValues>({ mode: 'onChange' });

  const quoteCommentValue = watch('quoteComment') || '';

  const queryClient = useQueryClient();

  const submitMutation = useSubmitQuoteByMoverMutation(() => {
    setShowSubmitModal(false);
  });

  const onSubmit = (data: FieldValues) => {
    if (selectedCustomer?.quoteId) {
      submitMutation.mutate({
        quoteId: selectedCustomer.quoteId,
        price: Number(data.quotePrice),
        comment: data.quoteComment,
      });
    } else {
      console.error('선택된 고객 정보가 없습니다.');
    }
  };

  return (
    <ModalWrapper
      title='견적 보내기'
      onClose={() => setShowSubmitModal(false)}
    >
      <div className='mb-7 xl:mb-10' />
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
      <hr className='mt-5 mb-5 xl:mt-8 xl:mb-8' />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className='sm:text-lg xl:text-xl font-semibold mb-4'>
          견적가를 입력해 주세요
        </h3>
        <FormInput
          inputVariant='form'
          register={register}
          errors={errors}
          name='quotePrice'
          placeholder='견적 금액을 입력해주세요'
          type='number'
          validation={{ required: '견적 금액은 필수입니다.' }}
          inputType='input'
          styleVariant='primary'
        />

        <hr className='mt-5 mb-5 xl:mt-8 xl:mb-8' />

        <h3 className='sm:text-lg xl:text-xl font-semibold mb-4'>
          코멘트를 입력해 주세요
        </h3>

        <FormInput
          inputVariant='form'
          register={register}
          errors={errors}
          name='quoteComment'
          placeholder='코멘트를 입력해 주세요'
          type='text'
          validation={{
            required: '코멘트는 필수입니다.',
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
          견적 보내기
        </CommonButton>
      </form>
    </ModalWrapper>
  );
}
