import { Meta, StoryFn } from '@storybook/react';
import ServiceBadge from '.';

export default {
  title: 'common/shared/atoms/ServiceBadge',
  component: ServiceBadge,
  tags: ['autodocs'],
} satisfies Meta<typeof ServiceBadge>;

const Template: StoryFn<typeof ServiceBadge> = (args) => (
  <ServiceBadge {...args} />
);

export const Small = Template.bind({});

Small.args = {
  children: '소형이사',
  color: 'blue',
};

export const Home = Template.bind({});

Home.args = {
  children: '가정이사',
  color: 'blue',
};

export const Office = Template.bind({});

Office.args = {
  children: '사무실이사',
  color: 'blue',
};

export const Region = Template.bind({});

Region.args = {
  children: '서울',
  color: 'gray',
  onSelect: () => alert('hi'),
};
