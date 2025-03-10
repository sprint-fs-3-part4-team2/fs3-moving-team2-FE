import ProfileImage from '.';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'common/shared/atoms/ProfileImage',
  component: ProfileImage,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileImage>;

const Template: StoryFn<typeof ProfileImage> = (args) => (
  <ProfileImage {...args} />
);

export const DefaultImage = Template.bind({});

DefaultImage.args = {
  className: 'w-[56px] h-[56px]',
};
