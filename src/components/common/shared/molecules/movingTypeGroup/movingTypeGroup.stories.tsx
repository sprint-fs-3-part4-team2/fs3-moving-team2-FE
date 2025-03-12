import { Meta, StoryObj } from '@storybook/react';
import MovingTypeGroup from '.';

export default {
  title: 'Common/Shared/Molecules/MovingTypeGroup',
  component: MovingTypeGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof MovingTypeGroup>;

type Story = StoryObj<typeof MovingTypeGroup>;

export const Example: Story = {
  args: {
    quoteState: 'pendingQuote',
    movingType: ['small'],
    isCustomQuote: true,
  },
};
