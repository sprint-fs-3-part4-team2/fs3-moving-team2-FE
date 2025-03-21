import { FieldValues } from 'react-hook-form';
import { InputSectionProps } from './inputSection.types';
import CustomLabel from '../atoms/customLabel';
import CustomInput from '../atoms/customInput';

export default function InputSection<T extends FieldValues>({
  content,
  ...props
}: InputSectionProps<T>) {
  return (
    <div>
      <CustomLabel
        styleVariant={props.styleVariant}
        content={content}
      />
      <CustomInput {...props} />
    </div>
  );
}
