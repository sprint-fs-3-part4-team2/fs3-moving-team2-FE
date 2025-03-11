import { Meta, StoryFn } from '@storybook/react';
import MoverStat from './moverStat';

export default {
  title: 'common/MoverStat/Templates/MoverStat',
  component: MoverStat,
  tags: ['autodocs'],
} satisfies Meta<typeof MoverStat>;

const Template: StoryFn<typeof MoverStat> = (args) => <MoverStat {...args} />;

export const Example = Template.bind({});

Example.args = {
  years: 3,
  rating: 4.5,
  ratingCount: 3000,
  quoteCount: 5000,
};
