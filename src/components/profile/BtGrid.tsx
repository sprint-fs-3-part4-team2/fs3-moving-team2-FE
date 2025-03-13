interface ButtonGridProps {
  options: string[];
  selectedOptions: string[];
  onSelect: (value: string) => void;
  columns: number;
}

export default function ButtonGrid({
  options,
  selectedOptions,
  onSelect,
  columns,
}: ButtonGridProps) {
  return (
    <div className='flex flex-col gap-8 w-auto'>
      <div
        className={`grid gap-3 sm:w-[277px] xl:w-[416px]`}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {options.map((value) => (
          <button
            type='button'
            key={value}
            className={` px-2 py-2 border rounded-[100px] whitespace-nowrap sm:text-md sm:font-medium xl:text-2lg xl:font-regular text-center
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
