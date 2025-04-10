import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
  RegisterOptions,
} from 'react-hook-form';

interface InputBaseProps {
  placeholder: string;
  styleVariant: 'primary' | 'secondary';
  inputClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchTypeProps extends InputBaseProps {
  inputVariant: 'search';
  onSearch: () => void;
  value?: string;
}

export interface FormTypeProps<T extends FieldValues> extends InputBaseProps {
  inputVariant: 'form';
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  type?: string;
  validation?: RegisterOptions<T, Path<T>>;
  inputType?: 'input' | 'textarea';
  rows?: number;
  disabled?: boolean; // 추가된 것
}

export type CustomInputProps<T extends FieldValues> =
  | SearchTypeProps
  | FormTypeProps<T>;
