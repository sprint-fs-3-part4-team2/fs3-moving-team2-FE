import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ReviewBlock from './index';
import { ReviewBlockCodeSnippet } from './codeExample';

const meta = {
  title: 'common/ReviewBlock/template/ReviewBlock',
  component: ReviewBlock,
  parameters: {
    codeExample: ReviewBlockCodeSnippet,
  },
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

export const Review: Story = {
  render: (args) => <ReviewBlock {...args} />,
  args: {
    name: '안성재',
    writtenAt: '2025-03-33',
    rating: 3,
    content: '정말 멋진 이사였습니다. 이븐한 이사라고 할 수 있겠네요.',
    className: '',
  },
};
