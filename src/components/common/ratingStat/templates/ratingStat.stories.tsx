import { Meta, StoryFn } from '@storybook/react';
import RatingStat from './ratingStat';

export default {
  title: 'common/RatingStat',
  component: RatingStat,
  tags: ['autodocs'],
} satisfies Meta<typeof RatingStat>;

const Template: StoryFn<typeof RatingStat> = (args) => <RatingStat {...args} />;

export const Rating = Template.bind({});

Rating.args = {
  ratingCounts: {
    5: 500,
    4: 500,
    3: 300,
    2: 100,
    1: 100,
  },
  averageRating: 4.5,
  totalCount: 1500,
};

Rating.decorators = (Story) => (
  <div className='xl:w-[955px]'>
    <Story />
  </div>
);
