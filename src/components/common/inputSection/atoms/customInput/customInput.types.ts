import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
  RegisterOptions,
} from 'react-hook-form';

interface InputBaseProps {
  placeholder: string;
  rows?: number;
  styleVariant: 'primary' | 'secondary';
}

export interface SearchTypeProps extends InputBaseProps {
  inputVariant: 'search';
  onSearch: () => void;
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
}

export type CustomInputProps<T extends FieldValues> =
  | SearchTypeProps
  | FormTypeProps<T>;
