'use client';
import { useState, DragEvent, ChangeEvent, useRef } from 'react';
import ImageUpload from '@/components/profile/ImageUpload';
import BtGrid from '@/components/profile/BtGrid';
import Image from 'next/image';

export default function Page() {
  // user 타입
  const [userType, setUserType] = useState<string>('');

  // 이미지 상태
  const [image, setImage] = useState<string | null>(null);
  // 파일 input 참조
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이사 유형 상태
  const [selectedMoveTypes, setSelectedMoveTypes] = useState<string[]>([]);
  // 지역 상태
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const isFormValid =
    image !== null &&
    selectedMoveTypes.length > 0 &&
    selectedRegions.length > 0;

  const userTypeData = ['customer', 'mover'];

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

  // user test toggle
  const toggleUserType = (value: string) => {
    setUserType(value);
  };

  // 이사 유형 버튼 선택/해제
  const toggleMoveType = (value: string) => {
    setSelectedMoveTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  // 🚀 지역 선택 (userType === 'mover'일 때만 중복 선택 가능)
  const toggleRegion = (value: string) => {
    if (userType === 'mover') {
      setSelectedRegions((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value],
      );
    } else {
      setSelectedRegions([value]); // 단일 선택
    }
  };

  // 프로필 등록
  const handleSubmit = () => {
    console.log('선택된 이미지:', image);
    console.log('선택된 이용 서비스:', selectedMoveTypes);
    console.log('선택된 지역:', selectedRegions);
  };

  return (
    <>
      <div className='flex justify-center h-screen items-start'>
        <div className='flex flex-col align-center items-center gap-[56px] w-[1400px] p-[24px] pb-[40px]'>
          <div className='flex flex-col items-center gap-[64px] w-[1350px]'>
            <div className='flex flex-col gap-[32px] w-[640px]'>
              <div className='text-3xl font-semibold'>프로필 등록</div>
              <div>추가 정보를 입력하여 회원가입을 완료해주세요.</div>
              <div className='border-b border-solid border-gray-400'></div>
            </div>
            <div className='flex flex-col gap-8 w-[640px]'>
              {/* 이미지 업로더 */}
              <div className='flex flex-col gap-6 '>
                <div className='w-auto text-xl font-semibold'>
                  프로필 이미지
                </div>
                <ImageUpload
                  image={image}
                  onChange={setImage}
                />
              </div>

              {/* usertype test */}
              <BtGrid
                title='유저 타입'
                description='고객이냐 기사냐'
                options={userTypeData}
                selectedOptions={[userType]}
                onSelect={toggleUserType}
                // columns={5}
              />

              {/* 이용 서비스 선택 */}
              <BtGrid
                title='이용 서비스'
                description='*이용 서비스는 중복 선택 가능해요!'
                options={moveType}
                selectedOptions={selectedMoveTypes}
                onSelect={toggleMoveType}
                // columns={5}
              />

              {/* 지역 선택 */}
              <BtGrid
                title='내가 사는 지역'
                description='*내가 사는 지역은 언제든 수정 가능해요!'
                options={regions}
                selectedOptions={selectedRegions}
                onSelect={toggleRegion}
                // columns={5}
              />
            </div>
          </div>
          <button
            className={`w-[640px] h-[64px] rounded-2xl ${
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
