import { Meta, StoryFn } from '@storybook/react';
import MovingInfo from '.';

export default {
  title: 'Common/MovingInfo/Organisms/MovingInfo',
  component: MovingInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof MovingInfo>;

const Template: StoryFn<typeof MovingInfo> = (args) => <MovingInfo {...args} />;

export const Info = Template.bind({});

Info.args = {
  requestedDate: new Date(),
  movingDate: new Date(),
  movingType: '소형이사',
  departure: '서울 중구',
  arrival: '경기 김포',
};
