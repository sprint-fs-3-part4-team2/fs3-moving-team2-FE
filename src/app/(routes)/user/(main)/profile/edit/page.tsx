'use client';
import ImageUpload from '@/components/profile/ImageUpload';
import BtGrid from '@/components/profile/BtGrid';
import CommonButton from '@/components/common/commonBtn/commonBtn';
import FormInput from '@/components/common/inputSection/atoms/customInput/inputs/formInput';
import { useForm } from 'react-hook-form';
import { updateCustomerProfile } from '@/services/profileService';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useToaster } from '@/hooks/useToaster';
import useUserProfile from '@/hooks/auth/useUserProfile';
import { useQueryClient } from '@tanstack/react-query';

type FormData = {
  name: string;
  email: string;
  phoneAddress: string;
  passwordCurrent: string;
  passwordNew: string;
  passwordConfirm: string;
  profileImage: string | null;
  selectedMoveTypes: string[];
  selectedRegions: string[];
};

export default function Page() {
  const router = useRouter();

  const { data: userProfile } = useUserProfile();
  const defaultUrl = userProfile?.profile?.profileImage;

  const queryClient = useQueryClient();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phoneAddress: '',
      passwordCurrent: '',
      passwordNew: '',
      passwordConfirm: '',
      profileImage: '',
      selectedMoveTypes: [],
      selectedRegions: [],
    },
  });

  useEffect(() => {
    if (userProfile) {
      setValue('name', userProfile.name);
      setValue('email', userProfile.email);
      setValue('phoneAddress', userProfile.phoneNumber);
      setValue('profileImage', defaultUrl || null);
    }
  }, [userProfile, setValue]);

  // user 타입
  const userType: string = 'user';

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
  const name = watch('name');
  const email = watch('email');
  const phoneAddress = watch('phoneAddress');
  const passwordCurrent = watch('passwordCurrent');
  const passwordNew = watch('passwordNew');
  const passwordConfirm = watch('passwordConfirm');
  const selectedMoveTypes = watch('selectedMoveTypes', []);
  const selectedRegions = watch('selectedRegions', []);
  const profileImage = watch('profileImage');

  const isValid =
    name?.trim() !== '' &&
    email?.trim() !== '' &&
    phoneAddress?.trim() !== '' &&
    passwordCurrent.trim() !== '' &&
    passwordNew.trim() !== '' &&
    passwordConfirm.trim() === passwordNew.trim() &&
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

  // 프로필 수정 버튼
  const onSubmit = async (data: FormData) => {
    if (!isValid) return; // 유효하지 않으면 제출 차단
    try {
      console.log('Submitted data:', data);
      const response = await updateCustomerProfile(data);
      console.log('프로필 수정 성공', response);
      toaster('info', '수정 성공!');

      queryClient.invalidateQueries({ queryKey: ['userProfile'] }); // 프로필 정보 바로 반영

      router.push('/user/quotes/requested');
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
        <div className='flex flex-col align-center items-center gap-[64px] sm:w-[375px] md:w-[744px] lg:w-[1400px] p-8'>
          <div className='flex flex-col gap-2 sm:items-center md:items-center xl:items-start sm:gap-[32px] xl:gap-[40px] '>
            <div className='flex flex-col sm:gap-[16px] xl:gap-[32px] sm:w-[327px] xl:w-[640px]'>
              <div className='sm:text-2lg md:text-2lg xl:text-3xl font-semibold sm:font-bold'>
                프로필 수정
              </div>
            </div>
            <div className='border-b border-solid border-gray-100 sm:w-[327px] xl:w-[1352px]'></div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-[48px]'
            >
              <div className='flex flex-col gap-1 sm:gap-4 sm:flex-col xl:items-start xl:flex-row xl:justify-between sm:items-center md:items-center xl:w-[1352px]'>
                {/* 왼쪽 */}
                <div className='flex flex-col gap-4 sm:gap-5 xl:gap-8 sm:w-[327px] xl:w-[640px]'>
                  {/* 이름 */}
                  <div className='flex flex-col gap-4 text-xl'>
                    <span className='sm:text-lg xl:text-xl font-semibold'>
                      이름
                    </span>

                    <FormInput
                      register={register}
                      errors={errors}
                      placeholder={watch('name') || '성함을 입력해 주세요.'}
                      name='name'
                      type='text'
                      validation={{ required: '성함을 입력해 주세요.' }}
                      inputType='input'
                      styleVariant='primary'
                      inputVariant='form'
                      disabled={true}
                    />
                  </div>
                  <div className='border-b border-solid border-gray-100'></div>
                  {/* 이메일 */}
                  <div className='flex flex-col gap-4 text-xl'>
                    <span className='sm:text-lg xl:text-xl font-semibold'>
                      이메일
                    </span>
                    <FormInput
                      register={register}
                      errors={errors}
                      placeholder={watch('email') || 'codeit@email.com'}
                      name='email'
                      type='text'
                      validation={{ required: '이메일을 입력해 주세요.' }}
                      inputType='input'
                      styleVariant='primary'
                      inputVariant='form'
                      disabled={true}
                    />
                  </div>
                  <div className='border-b border-solid border-gray-100'></div>
                  {/* 전화번호*/}
                  <div className='flex flex-col gap-4 text-xl'>
                    <span className='sm:text-lg xl:text-xl font-semibold'>
                      전화번호
                    </span>
                    <FormInput
                      register={register}
                      errors={errors}
                      placeholder={
                        watch('phoneAddress') || '전화번호를 입력해주세요'
                      }
                      name='phoneAddress'
                      type='text'
                      validation={{ required: '전화번호를 입력해 주세요.' }}
                      inputType='input'
                      styleVariant='primary'
                      inputVariant='form'
                      disabled={true}
                    />
                  </div>
                  <div className='border-b border-solid border-gray-100'></div>
                  {/* 현재 비밀번호 */}
                  <div className='flex flex-col gap-4 text-xl'>
                    <span className='sm:text-lg xl:text-xl font-semibold'>
                      현재 비밀번호
                    </span>
                    <FormInput
                      register={register}
                      errors={errors}
                      placeholder='현재 비밀번호를 입력해주세요'
                      name='passwordCurrent'
                      type='password'
                      validation={{ required: '현재 비밀번호를 입력해주세요.' }}
                      inputType='input'
                      styleVariant='primary'
                      inputVariant='form'
                    />
                  </div>

                  <div className='border-b border-solid border-gray-100'></div>

                  {/* 새 비밀번호 */}
                  <div className='flex flex-col gap-4 text-xl'>
                    <span className='sm:text-lg xl:text-xl font-semibold'>
                      새 비밀번호
                    </span>
                    <FormInput
                      register={register}
                      errors={errors}
                      placeholder='새 비밀번호를 입력해주세요'
                      name='passwordNew'
                      type='password'
                      validation={{ required: '새 비밀번호를 입력해 주세요.' }}
                      inputType='input'
                      styleVariant='primary'
                      inputVariant='form'
                    />
                  </div>

                  <div className='border-b border-solid border-gray-100'></div>

                  {/* 새 비밀번호 확인 */}
                  <div className='flex flex-col gap-4 text-xl'>
                    <span className='sm:text-lg xl:text-xl font-semibold'>
                      새 비밀번호 확인
                    </span>
                    <FormInput
                      register={register}
                      errors={errors}
                      placeholder='새 비밀번호를 다시 한번 입력해주세요'
                      name='passwordConfirm'
                      type='password'
                      validation={{
                        required: '비밀번호를 한번 더 입력해 주세요.',
                        validate: (value) =>
                          value === watch('passwordNew') ||
                          '비밀번호가 일치하지 않습니다.',
                      }}
                      inputType='input'
                      styleVariant='primary'
                      inputVariant='form'
                    />
                  </div>
                </div>

                {/* 오른쪽 */}
                <div className='flex flex-col gap-4 sm:gap-5  xl:gap-8 sm:w-[327px] xl:w-[640px]'>
                  {/* 이미지 업로더 */}
                  <div className='flex flex-col gap-6 '>
                    <div className='sm:text-lg xl:text-xl font-semibold'>
                      프로필 이미지
                    </div>
                    <ImageUpload
                      imageUrl={profileImage ?? defaultUrl ?? null}
                      onChange={(url) =>
                        setValue('profileImage', url, { shouldValidate: true })
                      }
                    />
                  </div>

                  <div className='border-b border-solid border-gray-100'></div>

                  {/* 이용 서비스 선택 */}
                  <div className='flex flex-col gap-2'>
                    <div className='sm:text-lg xl:text-xl font-semibold'>
                      이용 서비스
                    </div>
                    <div className='sm:text-xs xl:text-lg font-regular text-gray-400'>
                      *견적 요청 시 이용 서비스를 선택할 수 있어요.
                    </div>
                  </div>
                  <BtGrid
                    options={moveType}
                    selectedOptions={selectedMoveTypes}
                    onSelect={toggleMoveType}
                    columns={3}
                  />

                  <div className='border-b border-solid border-gray-100'></div>

                  {/* 지역 선택 */}
                  <div className='flex flex-col gap-2'>
                    <div className='sm:text-lg xl:text-xl font-semibold'>
                      내가 사는 지역
                    </div>
                    <div className='sm:text-xs xl:text-lg font-regular text-gray-400'>
                      *견적 요청 시 이용 서비스를 선택할 수 있어요.
                    </div>
                  </div>

                  <BtGrid
                    options={regions}
                    selectedOptions={selectedRegions}
                    onSelect={toggleRegion}
                    columns={5}
                  />
                </div>
              </div>

              <div className='flex flex-col gap-2 w-full xl:flex-row-reverse sm:flex-col sm:gap-2 xl:gap-8 '>
                <CommonButton
                  widthType='half'
                  heightType='primary'
                  backgroundColorType='gray'
                  borderColorsType='none'
                  type='submit'
                  className={` w-full sm:h-[54px] xl:w-[660px] xl:h-[64px] ${
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
                  className='text-gray-400 w-full sm:h-[54px] xl:w-[660px] xl:h-[64px]'
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
