'use client';
import { useState, useRef } from 'react';
import ImageUpload from '@/components/profile/ImageUpload';
import BtGrid from '@/components/profile/BtGrid';

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
              <div className='sm:text-2lg md:text-2lg xl:text-3xl font-semibold'>
                프로필 등록
              </div>
              <div className='sm:text-xs xl:text-xl font-regular text-black-200 '>
                추가 정보를 입력하여 회원가입을 완료해주세요.
              </div>
              <div className='border-b border-solid border-gray-400'></div>
            </div>
            <div className='flex flex-col sm:gap-5 xl:gap-8 w-full sm:max-w-[327px] xl:max-w-[640px]'>
              {/* 이미지 업로더 */}
              <div className='flex flex-col gap-6 '>
                <div className='w-auto text-xl font-semibold'>
                  프로필 이미지
                </div>
                <ImageUpload
                  image={formData.image}
                  onChange={(image) => updateFormData('image', image)}
                />
              </div>
              <div className='border-b border-solid border-gray-400'></div>

              {/* 이용 서비스 선택 */}
              <BtGrid
                title='이용 서비스'
                description='*이용 서비스는 중복 선택 가능해요!'
                options={moveType}
                selectedOptions={formData.selectedMoveTypes}
                onSelect={toggleMoveType}
                columns={4}
              />
              <div className='border-b border-solid border-gray-400'></div>

              {/* 지역 선택 */}
              <BtGrid
                title='내가 사는 지역'
                description='*내가 사는 지역은 언제든 수정 가능해요!'
                options={regions}
                selectedOptions={formData.selectedRegions}
                onSelect={toggleRegion}
                columns={5}
              />
            </div>
          </div>
          <button
            className={`sm:w-[327px] sm:h-[54px] xl:w-[640px] xl:h-[64px] rounded-2xl ${
              isFormValid
                ? 'bg-blue-500 cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            시작하기
          </button>
        </div>
      </div>
    </>
  );
}
