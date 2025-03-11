'use client';
import InputSection from '@/components/common/inputSection/molecules';
import cn from '@/utils/cn';
import { useForm } from 'react-hook-form';

const slicebox = cn('w-full', 'lg:w-1/2');
const li = cn('pt-5 pb-8 border-t border-line-100');

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  const onError = (errors: any) => {
    console.log('오류 발생:', errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={cn('w-full px-6 py-4')}
    >
      <h2 className={cn('mb-[16px] text-[18px] font-bold text-black-400')}>
        프로필 수정
      </h2>
      <div className={cn('flex w-full flex-wrap', 'lg:flex-nowrap')}>
        <ul className={cn(slicebox)}>
          <li className={cn(li)}>
            <InputSection
              content='별명'
              styleVariant='secondary'
              placeholder='사이트에 노출될 이름을 입력해주세요'
              name='alias'
              validation={{
                required: '별명 필수 입니다.',
              }}
              register={register}
              errors={errors}
              inputVariant='form'
            />
          </li>
          <li className={cn(li)}>이미지들어갈 곳</li>
          <li className={cn(li)}>
            <InputSection
              content='경력'
              styleVariant='secondary'
              placeholder='기사님의 경력을 입력해주세요'
              validation={{
                required: '경력은 필수 입니다.',
              }}
              name='experience_years'
              register={register}
              errors={errors}
              inputVariant='form'
            />
          </li>
          <li className={cn(li)}>
            <InputSection
              content='한 줄 소개'
              styleVariant='secondary'
              placeholder='한 줄 소개를 입력해주세요'
              name='introduction'
              register={register}
              errors={errors}
              inputVariant='form'
            />
          </li>
          <li className={cn(li)}>
            <InputSection
              content='상세 설명'
              styleVariant='secondary'
              placeholder='상세 내용을 입력해주세요'
              name='description'
              inputType='textarea'
              register={register}
              errors={errors}
              inputVariant='form'
            />
          </li>
          <li className={cn(li)}></li>
          <li className={cn(li)}></li>
          <li className={cn(li)}></li>
          <li className={cn(li)}></li>
        </ul>
        <ul className={cn(slicebox)}></ul>
      </div>
      <div className={cn('flex justify-between')}>
        <button type='submit'>수정하기</button>
        <button>취소</button>
      </div>
    </form>
  );
}
