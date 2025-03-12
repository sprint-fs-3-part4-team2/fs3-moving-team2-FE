'use client';
import { useState, useRef } from 'react';
import ImageUpload from '@/components/profile/ImageUpload';
import BtGrid from '@/components/profile/BtGrid';

export default function Page() {
  // user 타입
  const userType: string = 'mover';

  const [formData, setFormData] = useState({
    image: null as string | null,
    name: '',
    email: '',
    phoneAddress: '',
    currentPw: '',
    newPw: '',
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

  const moveType = ['소형 이사', '가정 이사', '사무실 이사'];

  const updateFormData = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

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

  // // 이사 유형 버튼 선택/해제
  // const toggleMoveType = (value: string) => {
  //   setFormData((prev) =>
  //     prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
  //   );
  // };
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
        <div className='flex flex-col align-center items-center gap-[64px] sm:w-[375px] md:w-[744px] lg:w-[1400px] p-8'>
          <div className='flex flex-col sm:items-center md:items-center xl:items-start sm:gap-[16px] xl:gap-[40px] '>
            <div className='flex flex-col sm:gap-[16px] xl:gap-[32px] sm:w-[327px] xl:w-[640px]'>
              <div className='sm:text-2lg md:text-2lg xl:text-3xl font-semibold'>
                프로필 수정
              </div>
              {/* <div className='sm:text-xs xl:text-xl font-regular text-black-200 '>
                추가 정보를 입력하여 회원가입을 완료해주세요.
              </div> */}
            </div>
            <div className='border-b border-solid border-gray-400 xl:w-[1352px]'></div>

            <div>
              <div className='flex sm:gap-4 sm:flex-col xl:items-start xl:flex-row xl:justify-between sm:items-center md:items-center xl:w-[1352px]'>
                {/* 왼쪽 */}
                <div className='flex flex-col sm:gap-5 xl:gap-8 sm:w-[327px] xl:w-[640px]'>
                  {/* 이름 */}
                  <div className='flex flex-col gap-4 text-xl'>
                    <span>이름</span>
                    <input
                      className='h-[64px]'
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                    ></input>
                  </div>
                  <div className='border-b border-solid border-gray-400'></div>
                  {/* 이메일 */}
                  <div className='flex flex-col gap-4 text-xl'>
                    <span>이메일</span>
                    <input
                      className='h-[64px]'
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                    ></input>
                  </div>
                  <div className='border-b border-solid border-gray-400'></div>
                  {/* 전화번호*/}
                  <div className='flex flex-col gap-4 text-xl'>
                    <span>전화번호</span>
                    <input
                      className='h-[64px]'
                      value={formData.phoneAddress}
                      onChange={(e) =>
                        updateFormData('phoneAddress', e.target.value)
                      }
                    ></input>
                  </div>
                  {/* 현재 비밀번호 */}
                  <div className='flex flex-col gap-4 text-xl'>
                    <span>현재 비밀번호</span>
                    <input
                      className='h-[64px]'
                      value={formData.currentPw}
                      onChange={(e) =>
                        updateFormData('currentPw', e.target.value)
                      }
                    ></input>
                  </div>
                  {/* 새 비밀번호 */}
                  <div className='flex flex-col gap-4 text-xl'>
                    <span>새 비밀번호</span>
                    <input
                      className='h-[64px]'
                      value={formData.newPw}
                      onChange={(e) => updateFormData('newPw', e.target.value)}
                    ></input>
                  </div>
                </div>
                {/* 오른쪽 */}
                <div className='flex flex-col sm:gap-5  xl:gap-8 sm:w-[327px] xl:w-[640px]'>
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
                    title='제공 서비스'
                    options={moveType}
                    selectedOptions={formData.selectedMoveTypes}
                    onSelect={toggleMoveType}
                    columns={4}
                  />
                  <div className='border-b border-solid border-gray-400'></div>

                  {/* 지역 선택 */}
                  <BtGrid
                    title='서비스 가능 지역'
                    options={regions}
                    selectedOptions={formData.selectedRegions}
                    onSelect={toggleRegion}
                    columns={5}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
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
      </div>
    </>
  );
}
