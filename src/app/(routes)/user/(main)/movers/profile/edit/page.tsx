'use client';
import InputSection from '@/components/common/inputSection/molecules';
import ServiceBadge from '@/components/common/shared/atoms/serviceBadge';
import area from '@/constants/dropdown/area';
import service from '@/constants/dropdown/service';
import cn from '@/utils/cn';
import { InputHTMLAttributes, useEffect, useState } from 'react';
import { FieldErrors, FieldValues, useForm } from 'react-hook-form';

const slicebox = cn('w-full', 'lg:w-1/2');
const li = cn('pt-5 pb-8 border-t border-line-100');
const innerUl = cn('flex flex-wrap');
const innreH2 = cn(
  'flex mb-4 font-semibold md:text-[16px] xl:text-[20px] gap-1',
);

export default function Page() {
  const [sValue, setService] = useState<string[]>([]);
  const [aValue, setArea] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // console.log(data);
    console.log(getValues());
  };
  const onError = (errors: any) => {
    console.log('오류 발생:', errors);
    console.log(getValues());
  };

  const handleClick = (
    value: string,
    dispatch: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    dispatch((prev) => {
      const newValue = prev.includes(value)
        ? prev.filter((s) => s !== value)
        : [...prev, value];

      setValue('service', newValue); // react-hook-form 값 업데이트
      return newValue;
    });
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
              validation={{
                required: '한 줄 소개를 입력하세요.',
              }}
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
              validation={{
                required: '상세 내용을 입력하세요.',
              }}
              name='description'
              inputType='textarea'
              register={register}
              errors={errors}
              inputVariant='form'
            />
          </li>
          <ServiceBadgeForm
            data={service}
            title={'제공 서비스'}
            value={sValue}
            onSelect={handleClick}
            dispatch={setService}
            inputProps={{
              ...register('service', {
                required: '서비스를 체크해주세요',
              }),
            }}
            error={errors}
          />
          <ServiceBadgeForm
            data={area}
            title={'서비스 가능 지역'}
            value={aValue}
            onSelect={handleClick}
            dispatch={setService}
            inputProps={{
              ...register('service', {
                required: '서비스 가능 지역을 체크해주세요',
              }),
            }}
            error={errors}
          />
          {/* <li className={cn(li)}>
            <h2 className={innreH2}>서비스 가능 지역</h2>
            <ul className={cn(innerUl)}>
              <li className='hidden'>
                <input
                  name='area'
                  type='hidden'
                  value={aValue}
                  readOnly
                />
              </li>
              {area.map((v) => {
                return (
                  <li
                    key={v.en}
                    className={cn('mr-3 mb-[18px]')}
                  >
                    <ServiceBadge
                      selected={aValue.includes(v.name)}
                      onSelect={() => {
                        handleClick(v.name, setArea);
                      }}
                    >
                      {v.name}
                    </ServiceBadge>
                  </li>
                );
              })}
            </ul>
          </li> */}
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

interface ServiceBadgeFormProps {
  data: { name: string; en: string }[];
  title: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  value: InputHTMLAttributes<HTMLInputElement>['value'][];
  error: FieldErrors<FieldValues>;
  onSelect: (
    value: string,
    dispatch: React.Dispatch<React.SetStateAction<string[]>>,
  ) => void;
  dispatch: React.Dispatch<React.SetStateAction<string[]>>;
}
function ServiceBadgeForm({
  data,
  title,
  value,
  inputProps,
  error,
  onSelect,
  dispatch,
}: ServiceBadgeFormProps) {
  return (
    <li className={cn(li)}>
      <h2 className={innreH2}>{title}</h2>
      <ul className={cn(innerUl)}>
        <li className='hidden'>
          <input
            type='hidden'
            // value={JSON.stringify(value)}
            {...inputProps}
          />
        </li>
        <li>
          <span>
            {inputProps['name'] && error[inputProps['name']]
              ? String(error[inputProps['name']]?.message)
              : ''}
          </span>
        </li>
        {data.map((v) => {
          return (
            <li
              key={v.en}
              className={cn('mr-3')}
            >
              <ServiceBadge
                selected={value?.includes(v.name)}
                onSelect={() => {
                  onSelect(v.name, dispatch);
                }}
              >
                {v.name}
              </ServiceBadge>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
