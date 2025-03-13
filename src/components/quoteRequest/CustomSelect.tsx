import { useState } from 'react';

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <div
        className='w-20 py-2 border border-gray-300 rounded-lg cursor-pointer text-center'
        onClick={() => setIsOpen(!isOpen)}
      >
        {value}
      </div>
      {isOpen && (
        <ul
          className='absolute left-0 mt-2 w-20 bg-white border border-gray-300 rounded-lg shadow-lg z-10'
          style={{ bottom: '100%' }} // 리스트가 위로 표시됩니다.
        >
          {options.map((option) => (
            <li
              key={option}
              className='px-2 py-1 hover:bg-gray-100 cursor-pointer'
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
