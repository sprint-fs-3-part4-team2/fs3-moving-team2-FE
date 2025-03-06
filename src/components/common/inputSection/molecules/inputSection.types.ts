import { FieldValues } from 'react-hook-form';
import { FormTypeProps } from '../atoms/customInput/customInput.types';
import { CustomLabelProps } from '../atoms/customLabel/customLabel.types';

export type InputSectionProps<T extends FieldValues> = CustomLabelProps &
  FormTypeProps<T>;
