import cn from '@/utils/cn';
import { CUSTOM_LABEL_STYLE } from './constants';
import { CustomLabelProps } from './customLabel.types';

export default function CustomLabel({
  styleVariant,
  content,
  labelClassName,
}: CustomLabelProps) {
  return (
    <label
      className={cn(
        'flex mb-4',
        CUSTOM_LABEL_STYLE[styleVariant],
        labelClassName,
      )}
    >
      <span>{content}</span>
      {styleVariant === 'secondary' && (
        <span className='text-primary-blue-300'>*</span>
      )}
    </label>
  );
}
