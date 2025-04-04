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
    border: {
      control: 'boolean',
      description: 'border 유무',
    },
    dispatch: {
      control: false,
      description: 'useState`의 `setState` 함수 (예: `setValue`)',
    },
  },
  parameters: {
    codeExample: `\`\`\`tsx
      const [selected, setSelected] = useState<any | null>(null);

      // className?: string;
      // data: { name: string }[];
      // isOpen?: boolean;
      return (
        <div>
          <DropdownCta
            border={true}
            className={className}
            isOpen={isOpen}
            data={data}
            name='area'
            dispatch={setSelected}
          />
          {selected && <p>선택된 값: {selected}</p>}
        </div>
      );
    `,
  },
} satisfies Meta<typeof DropdownCta>;

export default meta;

type Story = StoryObj<typeof meta>;

const DropdownWrapper = ({
  data,
  className,
  isOpen = false,
  border = true,
}: {
  className?: string;
  data: { name: string }[];
  isOpen?: boolean;
  border?: boolean;
}) => {
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <div>
      <DropdownCta
        border={border}
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
    border: true,
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

export const BorderFalse: Story = {
  render: (args) => <DropdownWrapper {...args} />,
  args: {
    border: false,
    className: '',
    isOpen: true,
    data: [{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }],
    dispatch: () => {},
  },
};

export const noAllbtn: Story = {
  render: (args) => <DropdownWrapper {...args} />,
  args: {
    border: false,
    allbtn: false,
    className: '',
    isOpen: true,
    data: [{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }],
    dispatch: () => {},
  },
};
