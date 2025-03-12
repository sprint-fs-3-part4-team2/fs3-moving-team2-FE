'use client';
import InputSection from '@/components/common/inputSection/molecules';
import cn from '@/utils/cn';
import { useForm, type FieldValues, type FieldErrors } from 'react-hook-form';
import moverEditApi from './api/moverEdit';

const ul = cn('w-full', 'lg:flex lg:flex-wrap lg:justify-between');
const li = cn('pt-5 pb-8 border-t border-line-100 w-full', 'lg:w-[48%]');

export default function MoverBasicInfoEdit() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const res = await moverEditApi(data);
    console.log(res);
  };
  const onError = (errors: FieldErrors) => {
    console.log(errors);
    Object.keys(errors).forEach((v) => {
      if (errors[String(v)]) {
        setFocus(String(v));
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={cn(
        'w-full px-6 py-4 m-auto',
        'md:max-w-[650px]',
        'lg:max-w-[1400px]',
      )}
    >
      <h2 className={cn('mb-[16px] text-[18px] font-bold text-black-400')}>
        기본정보 수정
      </h2>
      <div className={cn('flex w-full flex-wrap')}>
        <ul className={cn(ul)}>
          <li className={cn(li)}>
            <InputSection
              content='이름'
              styleVariant='secondary'
              placeholder='이름'
              name='name'
              validation={{
                required: '이름은 필수 입니다.',
              }}
              register={register}
              errors={errors}
              inputVariant='form'
            />
          </li>
          <li className={cn(li)}>
            <InputSection
              content='이메일'
              styleVariant='secondary'
              placeholder='이메일을 입력해주세요'
              name='email'
              validation={{
                required: '이메일은 필수 입니다.',
              }}
              register={register}
              errors={errors}
              inputVariant='form'
            />
          </li>
          <li className={cn(li)}>
            <InputSection
              content='전화번호'
              styleVariant='secondary'
              placeholder='전화번호를 입력해주세요 (- 제외)'
              validation={{
                required: '전화번호를 입력',
              }}
              name='phone_number'
              register={register}
              errors={errors}
              inputVariant='form'
            />
          </li>
          <li className={cn(li)}>
            <InputSection
              content='현재 비밀번호'
              styleVariant='secondary'
              placeholder='현재 비밀번호를 입력해주세요'
              validation={{
                required: '비밀 번호를 입력해주세요',
              }}
              name='current_password'
              register={register}
              errors={errors}
              inputVariant='form'
            />
          </li>
          <li className={cn(li)}>
            <InputSection
              content='새 비밀번호'
              styleVariant='secondary'
              placeholder='새 비밀번호를 입력해주세요'
              validation={{
                required: '비밀번호를 입력해주세요',
              }}
              name='new_password'
              register={register}
              errors={errors}
              inputVariant='form'
            />
          </li>
          <li className={cn(li)}>
            <InputSection
              content='새 비밀번호 확인'
              styleVariant='secondary'
              placeholder='새 비밀번호 확인을 입력해주세요'
              validation={{
                required: '새 비밀번호 확인을 입력해주세요',
              }}
              name='new_confirm_password'
              register={register}
              errors={errors}
              inputVariant='form'
            />
          </li>
        </ul>
      </div>
      <div className={cn('flex flex-wrap justify-between')}>
        <div className='w-full border mb-2'>
          <button type='submit'>수정하기</button>
        </div>
        <div className='w-full border'>
          <button>취소</button>
        </div>
      </div>
    </form>
  );
}

/* <ServiceBadgeForm
            data={service}
            title={'제공 서비스'}
            value={sValue}
            setValue={setValue}
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
            setValue={setValue}
            dispatch={setService}
            inputProps={{
              ...register('service', {
                required: '서비스 가능 지역을 체크해주세요',
              }),
            }}
            className={['', cn('mb-3')]}
            error={errors}
          /> */
// interface ServiceBadgeFormProps {
//   data: { name: string; en: string }[];
//   title: string;
//   inputProps: InputHTMLAttributes<HTMLInputElement>;
//   value: InputHTMLAttributes<HTMLInputElement>['value'][];
//   error: FieldErrors<FieldValues>;
//   setValue: UseFormSetValue<FieldValues>;
//   dispatch: React.Dispatch<React.SetStateAction<string[]>>;
//   className?: string[];
// }
// function ServiceBadgeForm({
//   data,
//   title,
//   value,
//   inputProps,
//   error,
//   setValue,
//   dispatch,
//   className = [],
// }: ServiceBadgeFormProps) {
//   const handleClick = (
//     value: string,
//     dispatch: React.Dispatch<React.SetStateAction<string[]>>,
//   ) => {
//     dispatch((prev) => {
//       const newValue = prev.includes(value)
//         ? prev.filter((s) => s !== value)
//         : [...prev, value];

//       setValue('service', newValue); // react-hook-form 값 업데이트
//       return newValue;
//     });
//   };

//   return (
//     <li className={cn(li, className[0] && className[0])}>
//       <h2 className={innreH2}>{title}</h2>
//       <ul className={cn(innerUl)}>
//         <li className='hidden'>
//           <input
//             type='hidden'
//             // value={JSON.stringify(value)}
//             {...inputProps}
//           />
//         </li>
//         <li>
//           <span>
//             {inputProps['name'] && error[inputProps['name']]
//               ? String(error[inputProps['name']]?.message)
//               : ''}
//           </span>
//         </li>
//         {data.map((v) => {
//           return (
//             <li
//               key={v.en}
//               className={cn('mr-3', className[1] && className[1])}
//             >
//               <ServiceBadge
//                 selected={value?.includes(v.name)}
//                 onSelect={() => {
//                   handleClick(v.name, dispatch);
//                 }}
//               >
//                 {v.name}
//               </ServiceBadge>
//             </li>
//           );
//         })}
//       </ul>
//     </li>
//   );
// }
