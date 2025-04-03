import cn from '@/utils/cn';
import { SearchTypeProps } from '../customInput.types';
import { INPUT_STYLES } from '../constants';
import SearchButton from '../buttons/searchButton';
import { useState } from 'react';

export default function SearchInput({
  placeholder,
  onSearch,
  styleVariant: inputStyle,
  inputClassName,
  onChange,
}: SearchTypeProps) {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onChange?.({
        target: { value: searchValue },
      } as React.ChangeEvent<HTMLInputElement>); // 엔터 키로 부모에 값 전달
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value); // 내부 상태 업데이트
  };

  const handleSearch = () => {
    // 부모 컴포넌트에 검색어 전달
    onChange?.({
      target: { value: searchValue },
    } as React.ChangeEvent<HTMLInputElement>);

    // 검색 액션 실행
    onSearch();
  };

  const inputProps = {
    className: cn(
      INPUT_STYLES.common,
      INPUT_STYLES[inputStyle],
      'pl-[68px] xl:text-2lg',
      inputClassName,
    ),
    placeholder,
    value: searchValue, // 부모 값이 있으면 사용, 없으면 내부 상태
    onChange: handleChange, // 부모 제어 여부에 따라 분기
    onKeyDown: handleKeyDown, // 엔터 키 이벤트
  };

  return (
    <div className={cn('relative flex items-center')}>
      <SearchButton onClick={handleSearch} />
      <input {...inputProps} />
    </div>
  );
}
