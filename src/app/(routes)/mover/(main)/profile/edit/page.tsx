'use client';
import { useState, useEffect } from 'react';
import ImageUpload from '@/components/profile/ImageUpload';
import BtGrid from '@/components/profile/BtGrid';
import CommonButton from '@/components/common/commonBtn/commonBtn';
import FormInput from '@/components/common/inputSection/atoms/customInput/inputs/formInput';
import { useForm } from 'react-hook-form';
import { updateMoverProfile } from '@/services/profileService';
import { useRouter } from 'next/navigation';
import { useToaster } from '@/hooks/useToaster';
import useUserProfile from '@/hooks/auth/useUserProfile';
import { useQueryClient } from '@tanstack/react-query';

type FormData = {
  experience: number;
  shortIntro: string;
  description: string;
  profileImage: string | null;
  selectedMoveTypes: string[];
  selectedRegions: string[];
};

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: userProfile } = useUserProfile();
  const defaultUrl = userProfile?.profile?.profileImage;

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onTouched',
    defaultValues: {
      experience: 0,
      shortIntro: '',
      description: '',
      profileImage: '',
      selectedMoveTypes: [],
      selectedRegions: [],
    },
  });

  useEffect(() => {
    if (userProfile) {
      setValue('experience', userProfile.profile?.experienceYears || 0);
      setValue('shortIntro', userProfile.profile?.introduction || '');
      setValue('description', userProfile.profile?.description || '');
      setValue('profileImage', defaultUrl || null);
    }
  }, [userProfile, setValue]);

  // user 타입
  const userType: string = 'mover';

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

  // 리액트 훅 폼 지켜보기이..
  const experience = watch('experience');
  const shortIntro = watch('shortIntro');
  const description = watch('description');
  const selectedMoveTypes = watch('selectedMoveTypes', []);
  const selectedRegions = watch('selectedRegions', []);
  const profileImage = watch('profileImage');

  const isValid =
    experience !== undefined &&
    experience >= 0 &&
    shortIntro.trim().length >= 8 &&
    description.trim().length >= 10 &&
    selectedMoveTypes.length > 0 &&
    selectedRegions.length > 0 &&
    profileImage !== null;

  // 이사 유형 바뀌나아
  const toggleMoveType = (value: string) => {
    setValue(
      'selectedMoveTypes',
      selectedMoveTypes.includes(value)
        ? selectedMoveTypes.filter((v) => v !== value)
        : [...selectedMoveTypes, value],
      { shouldValidate: true },
    );
  };

  // 지역 바뀌나아
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
  // 프로필 수정
  const onSubmit = async (data: FormData) => {
    if (!isValid) return; // 유효하지 않으면 제출 차단
    try {
      console.log('Submitted data:', data);
      const response = await updateMoverProfile(data);
      console.log('프로필 수정 성공', response);
      queryClient.invalidateQueries({ queryKey: ['userProfile'] }); // 프로필 정보 바로 반영
      queryClient.invalidateQueries({ queryKey: ['customerRequests'] }); // 기사님 받은 요청, 프로필 수정 바로 반영(서비스 가능 지역, 이사 유형)
      toaster('info', '수정 성공!');
    } catch (error: unknown) {
      console.error('프로필 수정 실패:', error);
      if (typeof error === 'string') {
        toaster('warn', error); // errorMessage가 string이면 그대로 사용
      } else if (error instanceof Error) {
        toaster('warn', error.message); // 일반적인 Error 객체라면 메시지 출력
      } else {
        toaster('warn', '알 수 없는 오류 발생');
      }
    }
  };

  // 취소 버튼
  const cancel = () => {
    router.back(); // 이전 페이지로 이동
  };

  return (
    <>
      <div className='flex justify-center h-screen items-start'>
        <div className='flex flex-col align-center items-center gap-[56px] sm:w-[375px] md:w-[744px] lg:w-[1400px] p-8'>
          <div className='flex flex-col sm:items-center md:items-center xl:items-start sm:gap-[24px] xl:gap-[48px] '>
            <div className='flex flex-col sm:gap-[16px] xl:gap-[32px] sm:w-[327px] xl:w-[640px]'>
              <div className='sm:text-2lg md:text-2lg xl:text-3xl xl:font-semibold sm:font-bold'>
                프로필 수정
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-[48px]'
            >
              <div className='border-b border-solid border-gray-200 sm:w-[327px] xl:w-[1352px]'></div>

              <div className='flex sm:gap-4 sm:flex-col xl:items-start xl:flex-row xl:justify-between sm:items-center md:items-center xl:w-[1352px]'>
                {/* 왼쪽 */}
                <div className='flex flex-col sm:gap-5 xl:gap-8 sm:w-[327px] xl:w-[640px]'>
                  {/* 이미지 업로더 */}
                  <div className='flex flex-col gap-6 '>
                    <div className='w-auto text-xl font-semibold'>
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

                  {/* 경력 */}
                  <div className='flex flex-col gap-4 text-xl'>
                    <div className='flex gap-1'>
                      <span className='sm:text-lg xl:text-xl font-semibold'>
                        경력
                      </span>
                      <span className='text-blue-500'>*</span>
                    </div>
                    <FormInput
                      register={register}
                      errors={errors}
                      placeholder='기사님의 경력을 입력해 주세요'
                      name='experience'
                      type='number'
                      validation={{
                        required: '숫자를 입력해주세요.',
                        min: {
                          value: 0,
                          message: '음수는 입력할 수 없습니다.',
                        },
                      }}
                      inputType='input'
                      styleVariant='primary'
                      inputVariant='form'
                    />
                  </div>
                  <div className='border-b border-solid border-gray-200'></div>
                  {/* 한 줄 소개 */}
                  <div className='flex flex-col gap-4 text-xl'>
                    <div className='flex gap-1'>
                      <span className='sm:text-lg xl:text-xl font-semibold'>
                        한 줄 소개
                      </span>
                      <span className='text-blue-500'>*</span>
                    </div>
                    <FormInput
                      register={register}
                      errors={errors}
                      placeholder='한 줄 소개를 입력해 주세요'
                      name='shortIntro'
                      type='text'
                      validation={{
                        required: '8자 이상 입력해주세요.',
                        minLength: {
                          value: 8,
                          message: '8자 이상 입력해주세요.', // 8자 미만일 때 표시될 메시지
                        },
                      }}
                      inputType='input'
                      styleVariant='primary'
                      inputVariant='form'
                    />
                  </div>
                  <div className='border-b border-solid border-gray-200'></div>
                  {/* 상세 설명 */}
                  <div className='flex flex-col gap-4 text-xl'>
                    <div className='flex gap-1'>
                      <span className='sm:text-lg xl:text-xl font-semibold'>
                        상세설명
                      </span>
                      <span className='text-blue-500'>*</span>
                    </div>
                    <FormInput
                      register={register}
                      errors={errors}
                      placeholder='상세 내용을 입력해 주세요'
                      name='description'
                      type='text'
                      rows={5}
                      validation={{
                        required: '8자 이상 입력해주세요.',
                        minLength: {
                          value: 10,
                          message: '10자 이상 입력해주세요.', // 10자 미만일 때 표시될 메시지
                        },
                      }}
                      inputType='textarea'
                      styleVariant='primary'
                      inputVariant='form'
                    />
                  </div>
                </div>
                {/* 오른쪽 */}
                <div className='flex flex-col sm:gap-5  xl:gap-8 sm:w-[327px] xl:w-[640px]'>
                  {/* 제공 서비스 선택 */}

                  <div className='flex gap-1'>
                    <span className='sm:text-lg xl:text-xl font-semibold'>
                      제공 서비스
                    </span>
                    <span className='text-blue-500'>*</span>
                  </div>
                  <input
                    type='hidden'
                    {...register('selectedMoveTypes')}
                  />
                  <BtGrid
                    options={moveType}
                    selectedOptions={selectedMoveTypes}
                    onSelect={toggleMoveType}
                    columns={3}
                  />
                  <div className='border-b border-solid border-gray-200'></div>

                  {/* 지역 선택 */}
                  <div className='flex gap-1'>
                    <span className='sm:text-lg xl:text-xl font-semibold'>
                      서비스 가능 지역
                    </span>
                    <span className='text-blue-500'>*</span>
                  </div>
                  <BtGrid
                    options={regions}
                    selectedOptions={selectedRegions}
                    onSelect={toggleRegion}
                    columns={5}
                  />
                </div>
              </div>
              <div className='flex xl:flex-row-reverse sm:flex-col sm:gap-2 xl:gap-8 a w-full'>
                <CommonButton
                  widthType='half'
                  heightType='primary'
                  backgroundColorType='gray'
                  borderColorsType='none'
                  type='submit'
                  disabled={!isValid}
                  className={`sm:w-[327px] sm:h-[54px] xl:w-[660px] xl:h-[64px] ${
                    isValid
                      ? 'bg-blue-500 cursor-pointer'
                      : 'bg-gray-300 cursor-not-allowed'
                  } `}
                >
                  수정하기
                </CommonButton>
                <CommonButton
                  widthType='half'
                  heightType='primary'
                  backgroundColorType='gray'
                  borderColorsType='gray'
                  type='button'
                  className='text-gray-400 sm:w-[327px] sm:h-[54px] xl:w-[660px] xl:h-[64px]'
                  onClick={cancel}
                >
                  취소
                </CommonButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
