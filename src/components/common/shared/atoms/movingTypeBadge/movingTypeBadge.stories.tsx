import MovingTypeBadge from '.';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Common/Shared/Atoms/MovingTypeBadge',
  component: MovingTypeBadge,
  tags: ['autodocs'],
} satisfies Meta<typeof MovingTypeBadge>;

const Template: StoryFn<typeof MovingTypeBadge> = (args) => (
  <MovingTypeBadge {...args} />
);

export const Small = Template.bind({});

Small.args = {
  type: 'small',
};

export const Office = Template.bind({});

Office.args = {
  type: 'office',
};

export const Home = Template.bind({});

Home.args = {
  type: 'home',
};

export const Custom = Template.bind({});

Custom.args = {
  type: 'custom',
};

export const ConfirmedQuote = Template.bind({});

ConfirmedQuote.args = {
  type: 'confirmedQuote',
};

export const PendingQuote = Template.bind({});

PendingQuote.args = {
  type: 'pendingQuote',
};
