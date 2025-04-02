import { FieldValues } from 'react-hook-form';
import { FormTypeProps } from '../customInput.types';
import { useState } from 'react';
import cn from '@/utils/cn';
import VisibleButton from '../buttons/visibleButton';
import { INPUT_STYLES } from '../constants';

export default function FormInput<T extends FieldValues>({
  register,
  errors,
  name,
  placeholder,
  type,
  validation,
  inputType,
  rows,
  styleVariant,
  inputClassName,
}: FormTypeProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = name.includes('password');

  const inputProps = {
    type: isPassword ? (showPassword ? 'text' : 'password') : type,
    className: cn(
      INPUT_STYLES.common,
      INPUT_STYLES[styleVariant],
      errors[name] && 'border border-secondary-red-200 bg-gray-50',
      inputClassName,
    ),
    placeholder,
    ...register(name, validation),
  };

  return (
    <div className='relative'>
      <div className='relative flex items-center'>
        {inputType === 'textarea' ? (
          <textarea
            rows={rows}
            {...inputProps}
          />
        ) : (
          <input {...inputProps} />
        )}
        {isPassword && (
          <VisibleButton
            onClick={() => setShowPassword((value) => !value)}
            showPassword={showPassword}
          />
        )}
      </div>
      {errors[name]?.message && (
        <div className='flex justify-end w-full'>
          <span className='text-secondary-red-200 font-medium mr-2 mt-1 md:mt-1 xl:mt-2 text-sm md:text-sm xl:text-base'>
            {String(errors[name]?.message)}
          </span>
        </div>
      )}
    </div>
  );
}
