import { FieldValues } from 'react-hook-form';
import { InputSectionProps } from './inputSection.types';
import CustomLabel from '../atoms/customLabel';
import CustomInput from '../atoms/customInput';

export default function InputSection<T extends FieldValues>({
  content,
  inputClassName,
  labelClassName,
  showAsterisk = false,
  ...props
}: InputSectionProps<T>) {
  return (
    <div>
      <CustomLabel
        styleVariant={props.styleVariant}
        content={content}
        labelClassName={labelClassName}
        showAsterisk={showAsterisk}
      />
      <CustomInput
        inputClassName={inputClassName}
        {...props}
      />
    </div>
  );
}
