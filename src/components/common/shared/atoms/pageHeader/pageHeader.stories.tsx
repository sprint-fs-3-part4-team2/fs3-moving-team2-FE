import { Meta, StoryObj } from '@storybook/react';
import PageHeader from '.';

export default {
  title: 'Common/Shared/Atoms/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof PageHeader>;

type Story = StoryObj<typeof PageHeader>;

export const Component: Story = {
  args: {
    children: '견적 상세',
  },
};
