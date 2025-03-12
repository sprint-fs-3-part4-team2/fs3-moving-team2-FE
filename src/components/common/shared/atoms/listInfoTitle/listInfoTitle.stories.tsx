import { Meta, StoryFn } from '@storybook/react';
import ListInfoTitle from '.';
import StringInfo from '../stringInfo';
import VerticalDivider from '../verticalDivider';

export default {
  title: 'Common/Shared/Atoms/ListInfoTitle',
  component: ListInfoTitle,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='flex'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ListInfoTitle>;

const Template: StoryFn<typeof ListInfoTitle> = (args) => (
  <ListInfoTitle {...args} />
);

export const Component = Template.bind({});

Component.args = {
  children: '이사종류',
};

export const Example = Template.bind({});

Example.args = {
  children: '이사종류',
};

Example.decorators = (Story) => (
  <div className='flex w-full gap-2'>
    <Story />
    <VerticalDivider />
    <StringInfo>소형 이사</StringInfo>
  </div>
);
