import { DropdownCta } from '@/components/dropdown/dropdown';
import Area from '@/components/dropdown/cta/area';
import Service from '@/components/dropdown/cta/service';
import cn from '@/utils/cn';

interface MoverFiltersProps {
  selectedArea: string;
  selectedService: string;
  onAreaChange: (value: string) => void;
  onServiceChange: (value: string) => void;
  onSortChange: (value: string) => void;
  isMobile?: boolean;
}

export default function MoverFilters({
  selectedArea,
  selectedService,
  onAreaChange,
  onServiceChange,
  onSortChange,
  isMobile = false,
}: MoverFiltersProps) {
  const sortOptions = [
    { name: '리뷰 많은순' },
    { name: '평점 높은순' },
    { name: '확정 많은순' },
    { name: '경력 높은순' },
  ];

  const sortMap: { [key: string]: string } = {
    '리뷰 많은순': 'reviews',
    '평점 높은순': 'rating',
    '확정 많은순': 'confirmed',
    '경력 높은순': 'experience',
  };

  if (isMobile) {
    return (
      <div className='flex flex-row justify-between w-full my-4 xl:hidden'>
        <div className='flex items-center gap-2'>
          <Area
            className={cn('w-[75px]')}
            dispatch={(value) => onAreaChange(value as string)}
            currentValue={selectedArea}
          />
          <Service
            className={cn('w-[95px]')}
            dispatch={(value) => onServiceChange(value as string)}
            currentValue={selectedService}
          />
        </div>
        <div className='flex items-center'>
          <DropdownCta
            name='review-sort'
            border={false}
            isOpen={false}
            allbtn={false}
            className='w-auto'
            data={sortOptions}
            dispatch={(value) =>
              onSortChange(sortMap[value as string] || 'reviews')
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col max-w-[328px] w-full xl:flex mx-auto md:hidden hidden'>
      <div className='flex flex-col items-center w-full mx-auto mb-[46px] gap-8'>
        <div className='flex justify-between w-full px-3 py-4 border-b border-gray-200'>
          <p className='text-xl font-semibold'>필터</p>
          <button
            onClick={() => {
              onAreaChange('지역');
              onServiceChange('서비스');
            }}
            className='bg-none text-gray-300 border-none hover:text-gray-500'
          >
            초기화
          </button>
        </div>

        <div className='flex flex-col w-full gap-4'>
          <p className='text-2lg font-semibold'>지역을 선택해주세요</p>
          <Area
            dispatch={(value) => onAreaChange(value as string)}
            currentValue={selectedArea}
          />
        </div>

        <div className='flex flex-col w-full gap-4'>
          <p className='text-2lg font-semibold'>어떤 서비스가 필요하세요?</p>
          <Service
            dispatch={(value) => onServiceChange(value as string)}
            currentValue={selectedService}
          />
        </div>
      </div>
    </div>
  );
}
