import { Dispatch, SetStateAction } from 'react';
import {
  FilterOption,
  filterTypes,
  moveTypes,
} from './MoverQuoteFilterOption.types';

// 이사 유형 필터 컴포넌트
interface MoverReceivedRequestFilterProps {
  selectedFilters: Record<string, boolean>;
  setSelectedFilters: Dispatch<SetStateAction<Record<string, boolean>>>;
}

export default function MoverReceivedRequestFilterSidebar({
  selectedFilters,
  setSelectedFilters,
}: MoverReceivedRequestFilterProps) {
  // 이사 유형 필터 선택/해제
  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 전체 선택/해제
  const selectAll = (options: FilterOption[], select: boolean) => {
    const newFilters = { ...selectedFilters };
    options.forEach((option) => {
      newFilters[option.id] = select;
    });
    setSelectedFilters(newFilters);
  };
  return (
    <div className='hidden xl:block xl:w-80 sticky top-28 h-fit'>
      {/* 이사 유형 필터 */}
      <div className='border-b pb-1'>
        <div className='flex justify-between items-center py-3 px-4 border-b '>
          <h2 className='text-xl font-medium '>이사 유형</h2>
          <label className='flex items-center cursor-pointer'>
            <input
              type='checkbox'
              className='h-5 w-5 rounded border-gray-300'
              checked={moveTypes.every((option) => selectedFilters[option.id])}
              onChange={(e) => selectAll(moveTypes, e.target.checked)}
            />
            <span className='ml-2 text-2lg text-gray-400'>전체선택</span>
          </label>
        </div>

        <div>
          {moveTypes.map((option) => (
            <label
              key={option.id}
              htmlFor={`move-${option.id}`}
              className='flex justify-between items-center py-5 px-4 border-t cursor-pointer'
            >
              <span className='text-2lg font-medium'>
                {option.label}
                {/* ({option.count}) */}
              </span>
              <input
                id={`move-${option.id}`}
                type='checkbox'
                className='h-5 w-5 rounded border-gray-300 text-blue-500'
                checked={selectedFilters[option.id]}
                onChange={() => toggleFilter(option.id)}
              />
            </label>
          ))}
        </div>
      </div>

      {/* 필터 */}
      <div className='border-b mt-6'>
        <div className='flex justify-between items-center py-3 px-4  border-b'>
          <h2 className='text-xl font-medium'>필터</h2>
          <label className='flex items-center cursor-pointer'>
            <input
              type='checkbox'
              className='h-5 w-5 rounded border-gray-300'
              checked={filterTypes.every(
                (option) => selectedFilters[option.id],
              )}
              onChange={(e) => selectAll(filterTypes, e.target.checked)}
            />
            <span className='ml-2 text-2lg text-gray-400'>전체선택</span>
          </label>
        </div>

        <div>
          {filterTypes.map((option) => (
            <label
              key={option.id}
              htmlFor={`filter-${option.id}`}
              className='flex justify-between items-center py-5 px-4 border-t cursor-pointer'
            >
              <span className='text-2lg font-medium'>
                {option.label}
                {/* ({option.count}) */}
              </span>
              <input
                id={`filter-${option.id}`}
                type='checkbox'
                className='h-5 w-5 rounded border-gray-300 text-blue-500'
                checked={selectedFilters[option.id]}
                onChange={() => toggleFilter(option.id)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
