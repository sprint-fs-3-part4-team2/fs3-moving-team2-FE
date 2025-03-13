'use client';
import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  image: string | null;
  onChange: (image: string | null) => void;
}

export default function ImageUploader({ image, onChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 파일을 읽고 미리보기 설정
  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => onChange(reader.result as string);
  };
  // 드래그 앤 드롭
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  // 파일 선택 버튼
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };
  // 미리보기 이미지 클릭 시 파일 선택 창 열기
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='flex items-center gap-5'>
      {/* 이미지 미리보기 */}
      <div
        className='sm:w-[100px] h-[100px] xl:w-[160px] xl:h-[160px] border-1 rounded-md border-gray-400 cursor-pointer relative'
        onClick={handleImageClick}
      >
        {image ? (
          <img
            src={image}
            alt='Uploaded'
            className='w-full h-full object-cover'
          />
        ) : (
          <Image
            src='/img/image-upload.svg'
            alt='기본 프로필 이미지'
            layout='fill'
            objectFit='cover'
          />
        )}
      </div>

      {/* 드래그 앤 드롭 */}
      <div
        className='sm:w-[200] sm:h-[100px] xl:w-[300px] xl:h-[160px] border-2 border-dashed border-gray-400 flex cursor-pointer items-center justify-center'
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <span className='text-gray-500'>이미지를 드래그하여 업로드</span>
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type='file'
        className='hidden'
        accept='image/*'
        onChange={handleFileInput}
      />
    </div>
  );
}
