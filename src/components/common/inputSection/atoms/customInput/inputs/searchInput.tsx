import cn from '@/utils/cn';
import { SearchTypeProps } from '../customInput.types';
import { INPUT_STYLES } from '../constants';
import SearchButton from '../buttons/searchButton';

export default function SearchInput({
  placeholder,
  onSearch,
  styleVariant: inputStyle,
  inputClassName,
}: SearchTypeProps) {
  const inputProps = {
    className: cn(
      INPUT_STYLES.common,
      INPUT_STYLES[inputStyle],
      'pl-[68px] xl:text-2lg',
      inputClassName,
    ),
    placeholder,
  };

  return (
    <div className={cn('relative flex items-center')}>
      <SearchButton onClick={onSearch} />
      <input {...inputProps} />
    </div>
  );
}
