interface ButtonGridProps {
  title: string;
  description?: string;
  options: string[];
  selectedOptions: string[];
  onSelect: (value: string) => void;
  columns?: number; // 기본값: 5열 그리드
}

export default function ButtonGrid({
  title,
  description,
  options,
  selectedOptions,
  onSelect,
  // columns = 5,
}: ButtonGridProps) {
  return (
    <div className='flex flex-col gap-8 w-auto'>
      <div className='flex flex-col gap-2'>
        <div className='text-xl font-semibold'>{title}</div>
        <div className='text-lg font-regular text-gray-400'>{description}</div>
      </div>
      <div
        className='grid grid-cols-5 gap-2'
        // style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {options.map((value) => (
          <button
            type='button'
            key={value}
            className={`p-2 border rounded ${
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
