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
    5: 356,
    4: 252,
    3: 356,
    2: 200,
    1: 5,
  },
  averageRating: 4.5,
};

Rating.decorators = (Story) => (
  <div className='xl:w-[955px]'>
    <Story />
  </div>
);
