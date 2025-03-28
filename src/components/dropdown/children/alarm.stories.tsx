import type { Meta, StoryObj } from '@storybook/react';

import Alarm from './alarm';

const meta = {
  component: Alarm,
  argTypes: {
    className: {
      control: false,
      description: 'tailwind css',
    },
    isOpen: {
      control: 'boolean',
      description: 'alarm 모달 창 보여주는 상태',
    },
    data: {
      control: 'object',
      description: '알람 리스트',
    },
    children: {
      control: false,
      description: 'HTML (React.ReactNode)',
    },
  },
  parameters: {
    codeExample: `\`\`\`tsx
        const args =  {
        className: "",
        isOpen: false,
        data: [
          {
            id: 'asdf',
            is_read: false,
            create_at: new Date('2025-03-07T12:00:00Z'),
            message: '메시지',
            url: '#',
          },
          {
            id: 'asdf2',
            is_read: false,
            create_at: new Date('2025-03-06T12:00:00Z'),
            message: '메시지2',
            url: '#',
          },
          {
            id: 'asdf3',
            is_read: false,
            create_at: new Date('2025-03-10T12:00:00Z'),
            message: '메시지3',
            url: '#',
          },
          {
            id: 'asdf4',
            is_read: false,
            create_at: new Date('2025-03-10T12:00:00Z'),
            message: '메시지4',
            url: '#',
          },
        ],
      },
      
      return (
        <Alarm {...args}>
          <button>버튼 </button>
        </Alarm>
      );
    `,
  },
} satisfies Meta<typeof Alarm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Alarm {...args}></Alarm>,
  args: {
    readFn: () => {},
    children: <button>버튼</button>,
    isOpen: false,
    data: [
      {
        id: 'asdf',
        isRead: false,
        createdAt: new Date('2025-03-07T12:00:00Z'),
        message: '메시지',
        url: '#',
        userId: 'test',
        highlight: ['메시지'],
      },
      {
        id: 'asdf2',
        isRead: false,
        createdAt: new Date('2025-03-07T12:00:00Z'),
        message: '메시지',
        url: '#',
        userId: 'test',
        highlight: ['메시지'],
      },
      {
        id: 'asdf3',
        isRead: false,
        createdAt: new Date('2025-03-07T12:00:00Z'),
        message: '메시지',
        url: '#',
        userId: 'test',
        highlight: ['메시지'],
      },
      {
        id: 'asdf4',
        isRead: false,
        createdAt: new Date('2025-03-07T12:00:00Z'),
        message: '메시지',
        url: '#',
        userId: 'test',
        highlight: ['메시지'],
      },
    ],
  },
};
