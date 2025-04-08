import { useState } from 'react';

interface OptionItem {
  label: string;
  value: string;
  disabled?: boolean;
}

type Option = string | OptionItem;

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const CustomSelect = ({ options, value, onChange }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const normalizedOptions = options.map((option) =>
    typeof option === 'string'
      ? { label: option, value: option, disabled: false }
      : option,
  );

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
          {normalizedOptions.map((option) => (
            <li
              key={option.value}
              className={`px-2 py-1 ${
                option.disabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'hover:bg-gray-100 cursor-pointer'
              }`}
              onClick={() => {
                if (!option.disabled) {
                  onChange(option.value);
                  setIsOpen(false);
                }
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
