import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DropdownCta } from './dropdown';

const meta = {
  title: 'Components/DropdownCta',
  component: DropdownCta,
  argTypes: {
    className: {
      control: false,
      description: 'tailwind css',
    },
    isOpen: {
      control: 'boolean',
    },
    data: {
      control: 'object',
      description: 'Dropdown에 표시될 데이터 목록',
    },
    name: { control: 'text' },
    dispatch: {
      control: false,
      description: 'useState`의 `setState` 함수 (예: `setValue`)',
    },
  },
} satisfies Meta<typeof DropdownCta>;

export default meta;

type Story = StoryObj<typeof meta>;

// ✅ 상태를 관리하는 Wrapper 컴포넌트
const DropdownWrapper = ({
  data,
  className,
  isOpen = false,
}: {
  className?: string;
  data: { name: string }[];
  isOpen?: boolean;
}) => {
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <div>
      <DropdownCta
        className={className}
        isOpen={isOpen}
        data={data}
        name='area'
        dispatch={setSelected}
      />
      {selected && <p>선택된 값: {selected}</p>}
    </div>
  );
};

export const Default: Story = {
  args: {
    data: [],
    isOpen: false,
    dispatch: () => {},
  },
};

export const Option: Story = {
  render: (args) => <DropdownWrapper {...args} />,
  args: {
    className: '',
    isOpen: true,
    data: [{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }],
    dispatch: () => {},
  },
};
