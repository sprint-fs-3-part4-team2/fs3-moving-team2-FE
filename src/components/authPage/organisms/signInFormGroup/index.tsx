'use client';

import InputSection from '@/components/common/inputSection/molecules';
import { useForm, type FieldValues, type FieldErrors } from 'react-hook-form';
import cn from '@/utils/cn';
import { FORM_LAYOUT_STYLES } from '../formGroupSection/constant';
import CommonButton from '@/components/common/commonBtn/commonBtn';
import {
  BUTTON_BASIC_STYLES,
  BUTTON_DESCTOP_STYLES,
  BUTTON_DISABLED_STYLES,
  VALIDATION_MESSAGES,
  VALIDATION_PATTERN,
} from '../constants';

export default function SignInFormGroup() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
  });

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
        로그인
      </CommonButton>
    </form>
  );
}
