'use client';
import { useState, useRef } from 'react';
import ImageUpload from '@/components/profile/ImageUpload';
import BtGrid from '@/components/profile/BtGrid';
import CommonButton from '@/components/common/commonBtn/commonBtn';

export default function Page() {
  // user 타입
  const userType: string = 'customer';

  const [formData, setFormData] = useState({
    image: null as string | null,
    selectedMoveTypes: [] as string[],
    selectedRegions: [] as string[],
  });

  const isFormValid =
    formData.image !== null &&
    formData.selectedMoveTypes.length > 0 &&
    formData.selectedRegions.length > 0;

  const moveType = ['소형 이사', '중형 이사', '대형 이사'];

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

  const updateFormData = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMoveType = (value: string) => {
    updateFormData(
      'selectedMoveTypes',
      formData.selectedMoveTypes.includes(value)
        ? formData.selectedMoveTypes.filter((v) => v !== value)
        : [...formData.selectedMoveTypes, value],
    );
  };

  const toggleRegion = (value: string) => {
    updateFormData(
      'selectedRegions',
      userType === 'mover'
        ? formData.selectedRegions.includes(value)
          ? formData.selectedRegions.filter((v) => v !== value)
          : [...formData.selectedRegions, value]
        : [value], // 단일 선택
    );
  };
  // 프로필 등록
  const handleSubmit = () => {
    console.log('등록 정보:', formData);
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
            <div className='flex flex-col sm:gap-5 xl:gap-8 w-full sm:max-w-[327px] xl:max-w-[640px]'>
              {/* 이미지 업로더 */}
              <div className='flex flex-col gap-6 '>
                <div className='sm:text-lg xl:text-xl font-semibold'>
                  프로필 이미지
                </div>
                <ImageUpload
                  image={formData.image}
                  onChange={(image) => updateFormData('image', image)}
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
                selectedOptions={formData.selectedMoveTypes}
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
                selectedOptions={formData.selectedRegions}
                onSelect={toggleRegion}
                columns={5}
              />
            </div>
          </div>
          <CommonButton
            widthType='half'
            heightType='primary'
            backgroundColorType='gray'
            borderColorsType='none'
            type='button'
            className={`sm:w-[327px] sm:h-[54px] xl:w-[640px] xl:h-[64px] ${
              isFormValid
                ? 'bg-blue-500 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            } `}
            onClick={handleSubmit}
          >
            시작하기
          </CommonButton>
        </div>
      </div>
    </>
  );
}
