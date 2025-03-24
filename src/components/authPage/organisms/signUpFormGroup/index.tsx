'use client';

import InputSection from '@/components/common/inputSection/molecules';
import cn from '@/utils/cn';
import { useForm, type FieldValues, type FieldErrors } from 'react-hook-form';
import { FORM_LAYOUT_STYLES } from '../formGroupSection/constant';
import CommonButton from '@/components/common/commonBtn/commonBtn';
import {
  BUTTON_BASIC_STYLES,
  BUTTON_DESCTOP_STYLES,
  BUTTON_DISABLED_STYLES,
  PHONE_NUMBER_INPUT_CLASS_NAME,
  VALIDATION_MESSAGES,
  VALIDATION_PATTERN,
} from '../constants';

export default function SignUpFormGroup() {
  const {
    register,
    handleSubmit,
    setFocus,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const passowrd = watch('password');

  const onSubmit = async (data: FieldValues) => {
    // 서버에 전송할 데이터
    console.log('data: ', data);
  };

  const onError = (errors: FieldErrors) => {
    // validation 실패한 입력 form에 focus 되도록 함
    Object.keys(errors).forEach((v) => {
      if (errors[String(v)]) {
        setFocus(String(v));
      }
    });
  };

  return (
    <form
      className={cn(FORM_LAYOUT_STYLES)}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      {/* 이름 */}
      <InputSection
        content='이름'
        placeholder='이름'
        type='text'
        name='name'
        register={register}
        errors={errors}
        validation={{
          required: VALIDATION_MESSAGES.REQUIRED_NAME,
          minLength: {
            value: 2,
            message: VALIDATION_MESSAGES.MIN_LENGTH_NAME,
          },
        }}
        inputVariant='form'
        styleVariant='primary'
      />

      {/* 이메일 */}
      <InputSection
        content='이메일'
        placeholder='이메일을 입력해주세요'
        type='email'
        name='email'
        register={register}
        errors={errors}
        validation={{
          required: VALIDATION_MESSAGES.REQUIRED_EMAIL,
          pattern: {
            value: VALIDATION_PATTERN.EMAIL,
            message: VALIDATION_MESSAGES.INVALID_EMAIL,
          },
        }}
        inputVariant='form'
        styleVariant='primary'
      />

      {/* 전화번호 */}
      <InputSection
        content='전화번호'
        placeholder='숫자만 입력해주세요'
        type='number'
        name='phone_number'
        register={register}
        errors={errors}
        validation={{
          required: VALIDATION_MESSAGES.REQUIRED_PHONE_NUMBER,
          minLength: {
            value: 10,
            message: VALIDATION_MESSAGES.MIN_LENGTH_PHONE_NUMBER,
          },
          pattern: {
            value: VALIDATION_PATTERN.PHONE_NUMBER,
            message: VALIDATION_MESSAGES.INVALID_PHONE_NUMBER,
          },
        }}
        inputVariant='form'
        styleVariant='primary'
        inputClassName={PHONE_NUMBER_INPUT_CLASS_NAME}
      />

      {/* 비밀번호 */}
      <InputSection
        content='비밀번호'
        placeholder='비밀번호를 입력해주세요'
        type='password'
        name='password'
        register={register}
        errors={errors}
        validation={{
          required: VALIDATION_MESSAGES.REQUIRED_PASSWORD,
          pattern: {
            value: VALIDATION_PATTERN.PASSWORD,
            message: VALIDATION_MESSAGES.INVALID_PASSWORD,
          },
          minLength: {
            value: 8,
            message: VALIDATION_MESSAGES.MIN_LENGTH_PASSWORD,
          },
        }}
        inputVariant='form'
        styleVariant='primary'
      />

      {/* 비밀번호 확인 */}
      <InputSection
        content='비밀번호 확인'
        placeholder='비밀번호 다시 한번 입력해주세요'
        type='password'
        name='check_password'
        register={register}
        errors={errors}
        validation={{
          required: VALIDATION_MESSAGES.REQUIRED_CHECK_PASSWORD,
          // 커스텀 validate 함수
          validate: (value) =>
            value === passowrd || VALIDATION_MESSAGES.INVALID_CHECK_PASSWORD,
        }}
        inputVariant='form'
        styleVariant='primary'
      />

      <CommonButton
        type='submit'
        widthType='full'
        heightType='primary'
        backgroundColorType='blue'
        borderColorsType='blue'
        className={cn(
          BUTTON_BASIC_STYLES,
          BUTTON_DESCTOP_STYLES,
          isValid ? '' : BUTTON_DISABLED_STYLES,
        )}
      >
        시작하기
      </CommonButton>
    </form>
  );
}
