'use client';
import { useState, useRef } from 'react';
import ImageUpload from '@/components/profile/ImageUpload';
import BtGrid from '@/components/profile/BtGrid';
import CommonButton from '@/components/common/commonBtn/commonBtn';
import FormInput from '@/components/common/inputSection/atoms/customInput/inputs/formInput';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  phoneAddress: string;
  passwordCurrent: string;
  passwordNew: string;
  passwordNewCheck: string;
  profileImage: File;
};

export default function Page() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: 'onChange' });
  // user 타입
  const userType: string = 'user';

  const [formData, setFormData] = useState({
    image: null as string | null,
    name: '',
    email: '',
    phoneAddress: '',
    currentPw: '',
    newPw: '',
    newPwCheck: '',
    selectedMoveTypes: [] as string[],
    selectedRegions: [] as string[],
  });

  const isFormValid =
    formData.image !== null &&
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phoneAddress.trim() !== '' &&
    formData.currentPw.trim() !== '' &&
    formData.newPw &&
    formData.selectedMoveTypes.length > 0 &&
    formData.selectedRegions.length > 0;

  const updateFormData = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const moveType = ['소형 이사', '가정 이사', '사무실 이사'];

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
  // // 프로필 등록
  // const handleSubmit = () => {
  //   console.log('수정된 정보:', formData);
  // };
  const onSubmit = (data: any) => {
    console.log('입력된 데이터:', data);
  };

  return (
    <>
      <div className='flex justify-center h-screen items-start'>
        <div className='flex flex-col align-center items-center gap-[64px] sm:w-[375px] md:w-[744px] lg:w-[1400px] p-8'>
          <div className='flex flex-col sm:items-center md:items-center xl:items-start sm:gap-[32px] xl:gap-[40px] '>
            <div className='flex flex-col sm:gap-[16px] xl:gap-[32px] sm:w-[327px] xl:w-[640px]'>
              <div className='sm:text-2lg md:text-2lg xl:text-3xl font-semibold sm:font-bold'>
                프로필 수정
              </div>
            </div>
            <div className='border-b border-solid border-gray-100 sm:w-[327px] xl:w-[1352px]'></div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex sm:gap-4 sm:flex-col xl:items-start xl:flex-row xl:justify-between sm:items-center md:items-center xl:w-[1352px]'>
                {/* 왼쪽 */}
                <div className='flex flex-col sm:gap-5 xl:gap-8 sm:w-[327px] xl:w-[640px]'>
                  {/* 이름 */}
                  <div className='flex flex-col gap-4 text-xl'>
                    <span className='sm:text-lg xl:text-xl font-semibold'>
                      이름
                    </span>

                    <FormInput
                      register={register}
                      errors={errors}
                      placeholder='성함을 입력해 주세요.'
                      name='name'
                      type='text'
                      validation={{ required: '성함을 입력해 주세요.' }}
                      inputType='input'
                      styleVariant='primary'
                      inputVariant='form'
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
                      placeholder='codeit@email.com'
                      name='email'
                      type='text'
                      validation={{ required: '이메일을 입력해 주세요.' }}
                      inputType='input'
                      styleVariant='primary'
                      inputVariant='form'
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
                      placeholder='전화번호를 입력해주세요'
                      name='phoneAddress'
                      type='password'
                      validation={{ required: '전화번호를 입력해 주세요.' }}
                      inputType='input'
                      styleVariant='primary'
                      inputVariant='form'
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
                      name='passwordNewCheck'
                      type='password'
                      validation={{ required: '비밀번호가 같지 않습니다.' }}
                      inputType='input'
                      styleVariant='primary'
                      inputVariant='form'
                    />
                  </div>
                </div>
                {/* 오른쪽 */}
                <div className='flex flex-col sm:gap-5  xl:gap-8 sm:w-[327px] xl:w-[640px]'>
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
                    selectedOptions={formData.selectedMoveTypes}
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
                    selectedOptions={formData.selectedRegions}
                    onSelect={toggleRegion}
                    columns={5}
                  />
                </div>
              </div>
            </form>
            <div className='flex xl:flex-row-reverse sm:flex-col sm:gap-2 xl:gap-8 a w-full'>
              <CommonButton
                widthType='half'
                heightType='primary'
                backgroundColorType='gray'
                borderColorsType='none'
                type='submit'
                className={`sm:w-[327px] sm:h-[54px] xl:w-[660px] xl:h-[64px] ${
                  isFormValid
                    ? 'bg-blue-500 cursor-pointer'
                    : 'bg-gray-400 cursor-not-allowed'
                } `}
                // onClick={handleSubmit}
              >
                수정하기
              </CommonButton>
              <CommonButton
                widthType='half'
                heightType='primary'
                backgroundColorType='gray'
                borderColorsType='none'
                type='button'
                className='text-gray-400 sm:w-[327px] sm:h-[54px] xl:w-[660px] xl:h-[64px]'
              >
                취소
              </CommonButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
