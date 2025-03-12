import { Meta, StoryFn } from '@storybook/react';
import MoverStatInfo from '.';

export default {
  title: 'Common/MoverInfo/Organisms/MoverStatInfo',
  component: MoverStatInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof MoverStatInfo>;

const Template: StoryFn<typeof MoverStatInfo> = (args) => (
  <MoverStatInfo {...args} />
);

export const FavoriteMoverInfo = Template.bind({});

const baseProps = {
  image: null,
  moverName: '김코드',
  rating: 4.5,
  ratingCount: 500,
  experienceYears: 5,
  isFavorite: false,
  favoriteCount: 300,
  quoteCount: 300,
};

FavoriteMoverInfo.args = {
  ...baseProps,
  isFavoriteMoverList: true,
};

FavoriteMoverInfo.decorators = [
  (Story) => (
    <div className='w-[327px]'>
      <Story />
    </div>
  ),
];

export const MoverInfo = Template.bind({});

MoverInfo.args = {
  ...baseProps,
  isFavoriteMoverList: false,
};

MoverInfo.decorators = [
  (Story) => (
    <div className='xl:w-[1000px]'>
      <Story />
    </div>
  ),
];
