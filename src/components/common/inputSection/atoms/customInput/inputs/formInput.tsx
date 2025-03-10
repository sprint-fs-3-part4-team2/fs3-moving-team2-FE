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
  styleVariant: inputStyle,
}: FormTypeProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = name.includes('password');

  const inputProps = {
    type: isPassword ? (showPassword ? 'text' : 'password') : type,
    className: cn(
      INPUT_STYLES.common,
      INPUT_STYLES[inputStyle],
      errors[name] && 'border border-secondary-red-200 bg-gray-50',
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
        <span className='text-secondary-red-200 font-medium absolute right-[8px]'>
          {String(errors[name]?.message)}
        </span>
      )}
    </div>
  );
}
