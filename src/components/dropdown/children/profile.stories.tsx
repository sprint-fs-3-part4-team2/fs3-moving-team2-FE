import type { Meta, StoryObj } from '@storybook/react';

import Profile from './profile';

const meta = {
  component: Profile,
  argTypes: {
    className: {
      control: false,
      description: 'tailwind css',
    },
    isOpen: {
      control: 'boolean',
      description: 'alarm 모달 창 보여주는 상태',
    },
    children: {
      control: false,
      description: 'HTML (React.ReactNode)',
    },
  },
  parameters: {
    codeExample: `\`\`\`tsx

      // className?: string;
      // data: { name: string }[];
      // isOpen?: boolean;
      return (
        <Profile isOpen={true} className="" >
          <button>버튼</button>
        </Profile>
      );\
    `,
  },
} satisfies Meta<typeof Profile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Profile {...args}></Profile>,
  args: {
    isOpen: false,
    className: '',
    children: <button>버튼</button>,
  },
};
