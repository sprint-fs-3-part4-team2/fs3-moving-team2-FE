import { Meta, StoryFn } from '@storybook/react';
import FavoriteCount from '.';
import { FavoriteCountCodeExample } from './codeExample';
import { FavoriteCountProps } from './favoriteCount.types';

export default {
  title: 'common/shared/atoms/FavoriteCount',
  component: FavoriteCount,
  tags: ['autodocs'],
} satisfies Meta<typeof FavoriteCount>;

const Template: StoryFn<typeof FavoriteCount> = (args) => (
  <FavoriteCount {...args} />
);

export const isFavorite = Template.bind({});

const favoriteCountProps: FavoriteCountProps = {
  favoriteCount: 500,
};

isFavorite.args = favoriteCountProps;

isFavorite.parameters = {
  codeExample: FavoriteCountCodeExample(favoriteCountProps),
};
