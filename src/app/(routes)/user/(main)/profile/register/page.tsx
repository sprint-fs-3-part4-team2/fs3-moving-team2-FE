'use client';
import { useState, useRef } from 'react';
import ImageUpload from '@/components/profile/ImageUpload';
import BtGrid from '@/components/profile/BtGrid';
import CommonButton from '@/components/common/commonBtn/commonBtn';
import { useForm } from 'react-hook-form';
import { createCustomerProfile } from '@/services/profileService';
import { useRouter } from 'next/navigation';
import { useToaster } from '@/hooks/useToaster';

type FormData = {
  profileImage: string | null;
  selectedMoveTypes: string[];
  selectedRegions: string[];
};

export default function Page() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onTouched',
    defaultValues: {
      profileImage: null,
      selectedMoveTypes: [],
      selectedRegions: [],
    },
  });
  // user 타입 나중에 함수로 묶어서 사용할 예정
  const userType: string = 'customer';

  const moveType = ['소형이사', '가정이사', '사무실이사'];

  const regions = [
    '서울',
    '경기',
    '인천',
    '강원',
    '충북',
    '충남',
    '세종',
    '대전',
    '전북',
    '전남',
    '광주',
    '경북',
    '경남',
    '대구',
    '울산',
    '부산',
    '제주',
  ];

  const selectedMoveTypes = watch('selectedMoveTypes', []);
  const selectedRegions = watch('selectedRegions', []);
  const profileImage = watch('profileImage');

  const isValid =
    selectedMoveTypes.length > 0 &&
    selectedRegions.length > 0 &&
    profileImage !== null;

  // 이사 유형 바뀌나
  const toggleMoveType = (value: string) => {
    setValue(
      'selectedMoveTypes',
      selectedMoveTypes.includes(value)
        ? selectedMoveTypes.filter((v) => v !== value)
        : [...selectedMoveTypes, value],
      { shouldValidate: true },
    );
  };

  // 지역 바뀌나
  const toggleRegion = (value: string) => {
    setValue(
      'selectedRegions',
      userType === 'mover'
        ? selectedRegions.includes(value)
          ? selectedRegions.filter((v) => v !== value)
          : [...selectedRegions, value]
        : [value], // 단일 선택
      { shouldValidate: true },
    );
  };

  const toaster = useToaster();

  // 프로필 등록
  const onSubmit = async (data: FormData) => {
    if (!isValid) return; // 유효하지 않으면 제출 차단
    try {
      console.log('Submitted data:', data);
      const response = await createCustomerProfile(data);
      console.log('프로필 등록 성공', response);
      toaster('info', '프로필 등록 성공!');

      router.push('/user/quotes/request');
    } catch (error: unknown) {
      console.error('프로필 등록 실패:', error);
      if (typeof error === 'string') {
        toaster('warn', error); // errorMessage가 string이면 그대로 사용
      } else if (error instanceof Error) {
        toaster('warn', error.message); // 일반적인 Error 객체라면 메시지 출력
      } else {
        toaster('warn', '알 수 없는 오류 발생');
      }
    }
  };

  return (
    <>
      <div className='flex justify-center h-screen items-start'>
        <div className='flex flex-col align-center items-center gap-[56px] sm:w-[375px] md:w-[744px] lg:w-[1400px] p-[24px] pb-[40px]'>
          <div className='flex flex-col items-center sm:gap-[16px] xl:gap-[64px] xl:w-[1352px] '>
            <div className='flex flex-col sm:gap-[16px] xl:gap-[32px] w-full sm:max-w-[327px] xl:max-w-[640px]'>
              <div className='sm:text-2lg md:text-2lg xl:text-3xl xl:font-semibold sm:font-bold'>
                프로필 등록
              </div>
              <div className='sm:text-xs xl:text-xl font-regular text-black-200 '>
                추가 정보를 입력하여 회원가입을 완료해주세요.
              </div>
              <div className='border-b border-solid border-gray-200 sm:w-[327px] xl:w-[640px]'></div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-[48px]'
            >
              <div className='flex flex-col sm:gap-5 xl:gap-8 w-full sm:max-w-[327px] xl:max-w-[640px]'>
                {/* 이미지 업로더 */}
                <div className='flex flex-col gap-6 '>
                  <div className='sm:text-lg xl:text-xl font-semibold'>
                    프로필 이미지
                  </div>
                  <ImageUpload
                    imageUrl={profileImage}
                    onChange={(url) =>
                      setValue('profileImage', url, { shouldValidate: true })
                    }
                  />
                </div>
                <div className='border-b border-solid border-gray-200'></div>

                {/* 이용 서비스 선택 */}
                <div className='flex flex-col gap-2'>
                  <div className='sm:text-lg xl:text-xl font-semibold'>
                    이용 서비스
                  </div>
                  <div className='sm:text-xs xl:text-lg font-regular text-gray-400'>
                    *이용 서비스는 중복 선택 가능해요!
                  </div>
                </div>
                <BtGrid
                  options={moveType}
                  selectedOptions={selectedMoveTypes}
                  onSelect={toggleMoveType}
                  columns={3}
                />
                <div className='border-b border-solid border-gray-200'></div>

                {/* 지역 선택 */}
                <div className='flex flex-col gap-2'>
                  <div className='sm:text-lg xl:text-xl font-semibold'>
                    내가 사는 지역
                  </div>
                  <div className='sm:text-xs xl:text-lg font-regular text-gray-400'>
                    *내가 사는 지역은 언제든 수정 가능해요!
                  </div>
                </div>
                <BtGrid
                  options={regions}
                  selectedOptions={selectedRegions}
                  onSelect={toggleRegion}
                  columns={5}
                />
              </div>
              <CommonButton
                widthType='half'
                heightType='primary'
                backgroundColorType='gray'
                borderColorsType='none'
                type='submit'
                className={`sm:w-[327px] sm:h-[54px] xl:w-[640px] xl:h-[64px] ${
                  isValid
                    ? 'bg-blue-500 cursor-pointer'
                    : 'bg-gray-300 cursor-not-allowed'
                } `}
              >
                시작하기
              </CommonButton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
