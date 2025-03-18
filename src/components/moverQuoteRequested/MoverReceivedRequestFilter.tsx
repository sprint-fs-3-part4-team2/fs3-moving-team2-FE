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

export default function MoverReceivedRequestFilter({
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
    <div className='hidden xl:block xl:w-80'>
      {/* 이사 유형 필터 */}
      <div className='border-b pb-1'>
        <div className='flex justify-between items-center py-3 px-4 border-b '>
          <h2 className='text-xl font-medium '>이사 유형</h2>
          <div className='flex items-center'>
            <input
              type='checkbox'
              className='h-5 w-5 rounded border-gray-300'
              checked={moveTypes.every((option) => selectedFilters[option.id])}
              onChange={(e) => selectAll(moveTypes, e.target.checked)}
            />
            <span className='ml-2 text-2lg text-gray-400'>전체선택</span>
          </div>
        </div>

        <div>
          {moveTypes.map((option) => (
            <div
              key={option.id}
              className='flex justify-between items-center py-5 px-4 border-t'
            >
              <span className='text-2lg font-medium'>
                {option.label} ({option.count})
              </span>
              <input
                type='checkbox'
                className='h-5 w-5 rounded border-gray-300 text-blue-500'
                checked={selectedFilters[option.id]}
                onChange={() => toggleFilter(option.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 필터 */}
      <div className='border-b mt-6'>
        <div className='flex justify-between items-center py-3 px-4  border-b'>
          <h2 className='text-xl font-medium'>필터</h2>
          <div className='flex items-center'>
            <input
              type='checkbox'
              className='h-5 w-5 rounded border-gray-300'
              checked={filterTypes.every(
                (option) => selectedFilters[option.id],
              )}
              onChange={(e) => selectAll(filterTypes, e.target.checked)}
            />
            <span className='ml-2 text-2lg text-gray-400'>전체선택</span>
          </div>
        </div>

        <div>
          {filterTypes.map((option) => (
            <div
              key={option.id}
              className='flex justify-between items-center py-5 px-4 border-t'
            >
              <span className='text-2lg font-medium'>
                {option.label} ({option.count})
              </span>
              <input
                type='checkbox'
                className='h-5 w-5 rounded border-gray-300 text-blue-500'
                checked={selectedFilters[option.id]}
                onChange={() => toggleFilter(option.id)}
              />
            </div>
          ))}
        </div>
      </div>
      {}
    </div>
  );
}
