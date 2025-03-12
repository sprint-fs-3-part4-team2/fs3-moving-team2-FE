import { Meta, StoryFn } from '@storybook/react';
import StringInfo from '.';

export default {
  title: 'Common/Shared/Atoms/StringInfo',
  component: StringInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof StringInfo>;

const Template: StoryFn<typeof StringInfo> = (args) => <StringInfo {...args} />;

export const Example = Template.bind({});

Example.args = {
  children: '소형이사,가정이사',
};
