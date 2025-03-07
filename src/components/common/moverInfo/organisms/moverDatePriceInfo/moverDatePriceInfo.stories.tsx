import { Meta, StoryFn } from '@storybook/react';
import MoverDatePrice from '.';

export default {
  title: 'common/MoverInfo/MoverDatePrice',
  component: MoverDatePrice,
  tags: ['autodocs'],
} satisfies Meta<typeof MoverDatePrice>;

const Template: StoryFn<typeof MoverDatePrice> = (args) => (
  <MoverDatePrice {...args} />
);

const props = {
  imageUrl: null,
  moverName: '김코드',
  movingDate: new Date(),
  price: 50000,
};

export const MoverDatePriceInfo = Template.bind({});

MoverDatePriceInfo.args = props;

export const MoverDatePriceInfoWithRating = Template.bind({});

MoverDatePriceInfoWithRating.args = {
  ...props,
  rating: 5,
};
