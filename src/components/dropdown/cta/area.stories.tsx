import type { Meta, StoryObj } from '@storybook/react';

import Area from './area';
import { useState } from 'react';

const meta = {
  title: 'Components/dropdown/Area',
  component: Area,
  argTypes: {
    className: {
      control: false,
      description: 'tailwind css',
    },
    isOpen: {
      control: 'boolean',
    },
    name: { control: 'text' },
    dispatch: {
      control: false,
      description: 'useState`의 `setState` 함수 (예: `setValue`)',
    },
  },
} satisfies Meta<typeof Area>;
export default meta;

type Story = StoryObj<typeof meta>;

function AreaWrapper({}) {
  const [value, setValue] = useState<any>('');
  return (
    <div>
      <Area dispatch={setValue} />
      {value && '선택된 값은: ' + value}
    </div>
  );
}

export const Default: Story = {
  render: (args) => <AreaWrapper />,
  args: {
    dispatch: () => {},
  },
};
