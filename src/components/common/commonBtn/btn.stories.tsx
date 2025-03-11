import CommonBtn from '@/components/common/commonBtn/commonBtn';
import type { Meta, StoryFn } from '@storybook/react';

const meta: Meta<typeof CommonBtn> = {
  title: 'common/commonBtn',
  component: CommonBtn,
  argTypes: {
    widthType: {
      control: 'radio',
      options: ['full', 'half', 'dynamic'],
    },
    heightType: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary', 'dynamic'],
    },
    backgroundColorType: {
      control: 'radio',
      options: ['blue', 'gray', 'white', 'dynamic'],
    },
    textColorType: {
      control: 'radio',
      options: ['white', 'gray', 'blue', 'dynamic'],
    },
    BorderColorsType: {
      control: 'radio',
      options: ['blue', 'gray'],
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof CommonBtn>;

export const Default: Story = {
  args: {
    children: '시작하기',
    widthType: 'full',
    heightType: 'primary',
    backgroundColorType: 'blue',
    textColorType: 'white',
  },
};

export const FullWidth: Story = {
  args: {
    children: '전체 넓이',
    widthType: 'full ',
  },
};
