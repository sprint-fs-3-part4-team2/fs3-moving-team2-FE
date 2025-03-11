import { Meta, StoryFn } from '@storybook/react';
import CustomerInfo from '.';
import { CustomerInfoProps } from './customerInfo.types';

export default {
  title: 'common/CustomerInfo/Templates/CustomerInfo',
  component: CustomerInfo,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='xl:w-[800px]'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CustomerInfo>;

const Template: StoryFn<typeof CustomerInfo> = (args) => (
  <CustomerInfo {...args} />
);

const COMMON_PROPS = {
  movingType: 'small',
  quoteState: 'confirmedQuote',
  isCustomQuote: true,
  customerName: '김코드',
  movingDate: new Date(),
  departure: '서울 중구',
  arrival: '경기 김포',
};

export const Requested = Template.bind({});

const RequestedProps = {
  ...COMMON_PROPS,
  variant: 'requested',
  onSubmit: () => alert(''),
  onDecline: () => alert(''),
  requestedAt: new Date(),
} as CustomerInfoProps;

Requested.args = RequestedProps;

export const SubmittedWithPrice = Template.bind({});

const SubmittedProps = {
  ...COMMON_PROPS,
  variant: 'submitted',
  quotePrice: 50000,
} as CustomerInfoProps;

SubmittedWithPrice.args = SubmittedProps;

export const SubmittedWithoutPrice = Template.bind({});

const SubmittedWithoutPriceProps = {
  ...COMMON_PROPS,
  variant: 'submitted',
} as CustomerInfoProps;

SubmittedWithoutPrice.args = SubmittedWithoutPriceProps;
