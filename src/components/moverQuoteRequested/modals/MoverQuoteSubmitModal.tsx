import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import CommonButton from '../../common/commonBtn/commonBtn';
import ModalWrapper from '../../modal/ModalWrapper';
import CustomerInfo from '../../common/customerInfo/templates/customerInfo';
import FormInput from '../../common/inputSection/atoms/customInput/inputs/formInput';
import { CustomerRequest } from '@/services/types/allQuotes/allQuoteRequests.types';
import { useQueryClient } from '@tanstack/react-query';
import { useSubmitQuoteByMoverMutation } from '@/hooks/useSubmitQuoteByMoverMutation';
import { useSessionStorage } from '@/hooks/useStorage';

interface MoverQuoteSubmitModalProps {
  selectedCustomer: CustomerRequest | null;
  setShowSubmitModal: Dispatch<SetStateAction<boolean>>;
}

export default function MoverQuoteSubmitModal({
  selectedCustomer,
  setShowSubmitModal,
}: MoverQuoteSubmitModalProps) {
  const draftStorageKey = selectedCustomer?.quoteId
    ? `quote_draft_${selectedCustomer.quoteId}`
    : 'quote_draft_temp';

  // 세션 스토리지에서 저장된 데이터 가져오기 (있다면)
  const [draftData, setDraftData, removeDraftData] = useSessionStorage<{
    quotePrice?: string;
    quoteComment?: string;
  }>(draftStorageKey, {});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FieldValues>({ mode: 'onChange', defaultValues: draftData });

  const quotePrice = watch('quotePrice');
  const quoteComment = watch('quoteComment') || '';

  // 폼 값이 변경될 때마다 세션 스토리지에 저장
  useEffect(() => {
    if (quotePrice || quoteComment) {
      setDraftData({ quotePrice, quoteComment });
    }
  }, [draftStorageKey, quotePrice, quoteComment]);

  const submitMutation = useSubmitQuoteByMoverMutation(() => {
    // 제출 성공 시 임시 저장 데이터 삭제
    removeDraftData();
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

  // 모달 닫기 전 확인 (작성 중인 데이터가 있는 경우)
  const handleCloseModal = () => {
    const hasUnsavedChanges =
      (quotePrice || quoteComment) && !submitMutation.isSuccess;

    if (hasUnsavedChanges) {
      if (window.confirm('작성 중인 견적이 있습니다. 정말 닫으시겠습니까?')) {
        setShowSubmitModal(false);
      }
    } else {
      setShowSubmitModal(false);
    }
  };

  return (
    <ModalWrapper
      title='견적 보내기'
      onClose={handleCloseModal}
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
          {quoteComment.length} / 10자 이상
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
