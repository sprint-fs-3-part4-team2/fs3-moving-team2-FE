import { Meta, StoryFn } from '@storybook/react';
import FavoriteCount from '.';

export default {
  title: 'common/MoverInfo/FavoriteCount',
  component: FavoriteCount,
  tags: ['autodocs'],
} satisfies Meta<typeof FavoriteCount>;

const Template: StoryFn<typeof FavoriteCount> = (args) => (
  <FavoriteCount {...args} />
);

export const isFavorite = Template.bind({});

isFavorite.args = {
  favoriteCount: 500,
  isFavorite: true,
};
