'use client';
import InputSection from '@/components/common/inputSection/molecules';
import cn from '@/utils/cn';
import { useForm, type FieldValues, type FieldErrors } from 'react-hook-form';
import moverEditApi from './api/moverEdit';
import CommonButton from '@/components/common/commonBtn/commonBtn';

const ul = cn('w-full', 'lg:flex lg:flex-wrap lg:w-[47%]');
const li = cn('pt-5 pb-8 border-t border-line-100 w-full');
const button = cn('w-full even:mb-3 odd:order-2', 'lg:even:mb-0 lg:w-[49%]');

export default function MoverBasicInfoEdit() {
  const {
    register,
    handleSubmit,
    setFocus,
    watch,
    formState: { errors },
  } = useForm();
  const newPassword = watch('new_password');

  const onSubmit = async (data: FieldValues) => {
    const { new_confirm_password, ...rest } = data;
    const body = {
      user_type: 'MOVER', // 나중 유저의 값에서 타입 가져오기
      ...rest,
    };
    const res = await moverEditApi(body);
    console.log(res);
  };
  const onError = (errors: FieldErrors) => {
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
      <div
        className={cn(
          'flex w-full flex-wrap mb-8',
          'lg:mb-14 lg:justify-between',
        )}
      >
        <ul className={cn(ul)}>
          <li className={cn(li)}>
            <InputSection
              content='이름'
              styleVariant='secondary'
              placeholder='이름'
              name='name'
              validation={{
                required: '이름은 필수 입니다.',
                minLength: {
                  value: 2,
                  message: '두 글자 이상입력해주세요',
                },
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
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: '올바른 이메일 형식을 입력해주세요.',
                },
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
              placeholder='전화번호를 입력해주세요'
              validation={{
                required: '전화번호를 입력해주세요',
                pattern: {
                  value: /^(01[016789])[-]?[0-9]{3,4}[-]?[0-9]{4}$/,
                  message: '올바른 핸드폰 번호를 입력해주세요.',
                },
              }}
              name='phone_number'
              register={register}
              errors={errors}
              inputVariant='form'
            />
          </li>
        </ul>
        <ul className={cn(ul)}>
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
                validate: (v) =>
                  v === newPassword || '비밀번호가 일치 하지 않습니다.',
              }}
              name='new_confirm_password'
              register={register}
              errors={errors}
              inputVariant='form'
            />
          </li>
        </ul>
      </div>
      <div className={cn('flex flex-wrap lg:justify-between')}>
        <div className={cn(button)}>
          <CommonButton
            type='reset'
            className={cn('h-14 text-primary-blue-200', 'lg:h-15')}
            widthType='full'
            backgroundColorType='white'
            heightType='dynamic'
            textColorType='dynamic'
            borderColorsType='blue'
          >
            취소
          </CommonButton>
        </div>
        <div className={cn(button)}>
          <CommonButton
            type='submit'
            className={cn('h-14', 'lg:h-15')}
            widthType='full'
            heightType='dynamic'
          >
            수정하기
          </CommonButton>
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
