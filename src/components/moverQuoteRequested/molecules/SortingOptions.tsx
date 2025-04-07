import { useState } from 'react';
import { DropdownCta } from '../../dropdown/dropdown';

interface SortingOptionsProps {
  onChange: (value: string) => void;
  options: { name: string }[];
}

export default function SortingOptions({
  onChange,
  options,
}: SortingOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownCta
      className='mr-4'
      isOpen={isOpen}
      data={options}
      dispatch={(value: string | object) => {
        if (typeof value === 'string') {
          onChange(value.replace(/\s+/g, ''));
        }
      }}
      border={false}
      allbtn={false}
    />
  );
}
