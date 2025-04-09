'use client';
import { useState, useEffect, useRef, DragEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import { getUploadUrl, uploadImageOnS3 } from '@/services/s3Upload';
import { useForm } from 'react-hook-form';

interface ImageUploaderProps {
  imageUrl: string | null;
  onChange: (url: string | null) => void;
}

export default function ImageUpload({
  imageUrl,
  onChange,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(imageUrl);

  useEffect(() => {
    setPreviewImage(imageUrl); // imageUrl 변경 시 preview 업데이트
  }, [imageUrl]);

  // 파일 업로드 핸들러
  const handleFileUpload = async (file: File) => {
    try {
      // 미리보기 설정
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

      // S3 업로드 URL 가져오기
      const { uploadUrl, imageUrl } = await getUploadUrl(file.name);

      // S3에 업로드
      await uploadImageOnS3({ file, url: uploadUrl });

      // 업로드 완료 후 최종 URL 설정
      onChange(imageUrl);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  // 파일 선택 핸들러
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // 이미지 클릭 시 파일 선택
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
        {previewImage ? (
          <img
            src={previewImage}
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
        className='sm:w-[200px] sm:h-[100px] xl:w-[300px] xl:h-[160px] border-2 border-dashed border-gray-400 flex cursor-pointer items-center justify-center'
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={handleImageClick}
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
