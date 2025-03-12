interface ButtonGridProps {
  title: string;
  description?: string;
  options: string[];
  selectedOptions: string[];
  onSelect: (value: string) => void;
  columns: number;
}

export default function ButtonGrid({
  title,
  description,
  options,
  selectedOptions,
  onSelect,
  columns,
}: ButtonGridProps) {
  return (
    <div className='flex flex-col gap-8 w-auto'>
      <div className='flex flex-col gap-2'>
        <div className='text-xl font-semibold'>{title}</div>
        {description && (
          <div className='text-lg font-regular text-gray-400'>
            {description}
          </div>
        )}
      </div>
      <div
        className={`grid grid-cols-${columns} gap-3 sm:w[277px] xl:w-[416px] `}
      >
        {options.map((value) => (
          <button
            type='button'
            key={value}
            className={` py-2 border rounded-[100px] whitespace-nowrap sm:text-md sm:font-medium xl:text-2lg xl:font-regular text-center
              ${
                selectedOptions.includes(value)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-blue-950'
              }`}
            onClick={() => onSelect(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
