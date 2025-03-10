import { FieldValues } from 'react-hook-form';
import { CustomInputProps } from './customInput.types';
import FormInput from './inputs/formInput';
import SearchInput from './inputs/searchInput';

export default function CustomInput<T extends FieldValues>(
  props: CustomInputProps<T>,
) {
  if (props.inputVariant === 'form') return <FormInput {...props} />;
  if (props.inputVariant === 'search') return <SearchInput {...props} />;
}
