import cn from '@/utils/cn';
import { SearchTypeProps } from '../customInput.types';
import { INPUT_STYLES } from '../constants';
import SearchButton from '../buttons/searchButton';

export default function SearchInput({
  placeholder,
  onSearch,
  styleVariant: inputStyle,
}: SearchTypeProps) {
  const inputProps = {
    className: cn(INPUT_STYLES.common, INPUT_STYLES[inputStyle], 'pl-[68px]'),
    placeholder,
  };

  return (
    <div className='relative flex items-center'>
      <SearchButton onClick={onSearch} />
      <input {...inputProps} />
    </div>
  );
}
