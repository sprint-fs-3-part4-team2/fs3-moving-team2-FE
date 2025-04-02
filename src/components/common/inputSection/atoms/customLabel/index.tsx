import cn from '@/utils/cn';
import { CUSTOM_LABEL_STYLE } from './constants';
import { CustomLabelProps } from './customLabel.types';

export default function CustomLabel({
  styleVariant,
  content,
  labelClassName,
  showAsterisk,
}: CustomLabelProps) {
  return (
    <label
      className={cn('flex', CUSTOM_LABEL_STYLE[styleVariant], labelClassName)}
    >
      <span>{content}</span>
      {styleVariant === 'secondary' && showAsterisk && (
        <span className='text-primary-blue-300'>*</span>
      )}
    </label>
  );
}
