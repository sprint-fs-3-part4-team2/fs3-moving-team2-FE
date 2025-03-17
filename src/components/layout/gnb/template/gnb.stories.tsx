import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import GNB from './index';
import { GNBCodeSnippet } from './codeExample';

const meta = {
  title: 'layout/GNB/template/GNB',
  component: GNB,
  tags: ['autodocs'],
  parameters: {
    codeExample: GNBCodeSnippet,
  },
  argTypes: {
    isUserAuthorized: {
      control: 'boolean',
      description: '인가 여부',
    },
    userType: {
      control: {
        type: 'radio',
        options: ['user', 'mover', 'guest'],
      },
      description: '유저 타입',
    },
    userName: {
      control: 'text',
      description: '유저 이름',
    },
    imageUrl: {
      control: 'text',
      description: '유저 프로필 이미지',
    },
    hasNotification: {
      control: 'boolean',
      description: '알림 존재 여부',
    },
  },
} satisfies Meta<typeof GNB>;

export default meta;

type Story = StoryObj<typeof meta>;

export const gnb: Story = {
  render: (args) => <GNB {...args} />,
  args: {
    isUserAuthorized: true,
    userType: 'user',
    userName: '안성재',
    imageUrl: '/img/sample-profile/sample-2.svg',
    hasNotification: true,
  },
};
