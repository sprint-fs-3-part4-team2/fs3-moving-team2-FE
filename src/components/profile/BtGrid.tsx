import ServiceBadge from '../common/shared/atoms/serviceBadge';

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
        className={`grid gap-3 sm:w-[277px] xl:w-[416px] text-nowrap`}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {options.map((value) => (
          <ServiceBadge
            key={value}
            selected={selectedOptions.includes(value)}
            color={selectedOptions.includes(value) ? 'blue' : 'gray'}
            onSelect={() => onSelect(value)}
          >
            {value}
          </ServiceBadge>
        ))}
      </div>
    </div>
  );
}
