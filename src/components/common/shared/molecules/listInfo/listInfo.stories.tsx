import { Meta, StoryObj } from '@storybook/react';
import ListInfo from '.';

export default {
  title: 'Common/Shared/Molecules/ListInfo',
  component: ListInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof ListInfo>;

type Story = StoryObj<typeof ListInfo>;

export const Component: Story = {
  args: {
    title: '이사 종류',
    content: '소형 이사',
  },
};
