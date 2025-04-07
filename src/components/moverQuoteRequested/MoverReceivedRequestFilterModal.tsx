import { Dispatch, SetStateAction, useState } from 'react';
import ModalWrapper from '../modal/ModalWrapper';
import cn from '@/utils/cn';
import CommonButton from '../common/commonBtn/commonBtn';
import {
  FilterOption,
  filterTypes,
  moveTypes,
} from './MoverQuoteFilterOption.types';

interface MoverReceivedRequestFilterModalProps {
  selectedFilters: Record<string, boolean>;
  setSelectedFilters: Dispatch<SetStateAction<Record<string, boolean>>>;
  onClose: () => void;
}

export default function MoverReceivedRequestFilterModal({
  selectedFilters,
  setSelectedFilters,
  onClose,
}: MoverReceivedRequestFilterModalProps) {
  const [tempFilters, setTempFilters] =
    useState<Record<string, boolean>>(selectedFilters);
  const [selectedCategory, setSelectedCategory] = useState<'이사유형' | '필터'>(
    '이사유형',
  );

  const toggleTempFilter = (id: string) => {
    setTempFilters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectAllTemp = (options: FilterOption[], select: boolean) => {
    const newFilters = { ...tempFilters };
    options.forEach((option) => {
      newFilters[option.id] = select;
    });
    setTempFilters(newFilters);
  };

  const applyFilters = () => {
    setSelectedFilters(tempFilters); // "조회하기" 버튼 클릭 시 실제 필터 적용
    onClose(); // 모달 닫기
  };

  return (
    <div className='block xl:hidden'>
      <ModalWrapper
        headerButtons={
          <>
            <button
              className={cn(
                'mr-6',
                selectedCategory !== '이사유형' && 'text-line-200',
              )}
              onClick={() => setSelectedCategory('이사유형')}
            >
              이사 유형
            </button>
            <button
              className={cn(selectedCategory !== '필터' && 'text-line-200')}
              onClick={() => setSelectedCategory('필터')}
            >
              필터
            </button>
          </>
        }
        onClose={onClose}
      >
        <label className='sm:w-full md:w-[327px] flex justify-between items-center mt-5 border-b pb-4 px-4 cursor-pointer'>
          <h2 className='text-lg font-medium text-grayscale-300'>
            전체 선택
            {/* ( 20 ) */}
          </h2>
          <input
            type='checkbox'
            className='w-5 h-5 rounded border-line-200'
            checked={
              selectedCategory === '이사유형'
                ? moveTypes.every((option) => tempFilters[option.id])
                : filterTypes.every((option) => tempFilters[option.id])
            }
            onChange={(e) =>
              selectAllTemp(
                selectedCategory === '이사유형' ? moveTypes : filterTypes,
                e.target.checked,
              )
            }
          />
        </label>
        {selectedCategory === '이사유형' ? (
          <ul>
            {moveTypes.map((option) => (
              <li key={option.id}>
                <label className='flex justify-between items-center py-5 px-4 border-t cursor-pointer'>
                  <span className='text-base'>
                    {option.label}
                    {/* ({option.count}) */}
                  </span>
                  <input
                    type='checkbox'
                    className='w-5 h-5 rounded border-line-200 text-blue-500'
                    checked={tempFilters[option.id]}
                    onChange={() => toggleTempFilter(option.id)}
                  />
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {filterTypes.map((option) => (
              <li key={option.id}>
                <label className='flex justify-between items-center py-5 px-4 border-t cursor-pointer'>
                  <span className='text-base'>
                    {option.label}
                    {/* ({option.count}) */}
                  </span>
                  <input
                    type='checkbox'
                    className='w-5 h-5 rounded border-line-200 text-blue-500'
                    checked={tempFilters[option.id]}
                    onChange={() => toggleTempFilter(option.id)}
                  />
                </label>
              </li>
            ))}
          </ul>
        )}
        <CommonButton
          className='mt-8'
          widthType='full'
          heightType='primary'
          backgroundColorType='blue'
          onClick={applyFilters}
        >
          조회하기
        </CommonButton>
      </ModalWrapper>
    </div>
  );
}
