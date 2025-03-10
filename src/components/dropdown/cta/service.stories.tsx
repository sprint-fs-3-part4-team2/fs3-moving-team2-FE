import type { Meta, StoryObj } from '@storybook/react';

import Service from './service';
import { useState } from 'react';

const meta = {
  title: 'Components/dropdown/Service',
  component: Service,
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
} satisfies Meta<typeof Service>;
export default meta;

type Story = StoryObj<typeof meta>;

function SerivceWrapper({}) {
  const [value, setValue] = useState<string | object>('');
  return (
    <>
      <Service dispatch={setValue} />
      {value && '선택 값:' + value}
    </>
  );
}

export const Default: Story = {
  render: (args) => <SerivceWrapper />,
  args: {
    dispatch: () => {},
  },
};
