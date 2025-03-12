import { Meta, StoryObj } from '@storybook/react';
import StarIcon from '.';

export default {
  title: 'Common/Shared/Atoms/StarIcon',
  component: StarIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof StarIcon>;

type Story = StoryObj<typeof StarIcon>;

export const Example: Story = {
  args: {
    filled: false,
  },
};
