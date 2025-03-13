import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ReviewBlock from './index';

const meta = {
  title: 'ReviewBlock',
  component: ReviewBlock,
  argTypes: {
    name: {
      control: 'text',
      description: '리뷰 작성자 이름',
    },
    writtenAt: {
      control: 'text',
      description: '리뷰 작성 시간',
    },
    rating: {
      control: 'number',
      description: '리뷰 별점',
    },
    content: {
      control: 'text',
      description: '리뷰 내용',
    },
    className: {
      control: 'text',
      description: 'tailwind css',
    },
  },
} satisfies Meta<typeof ReviewBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <ReviewBlock {...args} />,
  args: {
    name: '안재성',
    writtenAt: '2022.01.01',
    rating: 4,
    content: '리뷰 내용',
    className: '',
  },
};
