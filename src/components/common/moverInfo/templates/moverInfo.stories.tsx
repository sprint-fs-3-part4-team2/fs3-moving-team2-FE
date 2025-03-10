import { Meta, StoryFn } from '@storybook/react';
import MoverInfo from './moverInfo';

export default {
  title: 'common/MoverInfo/Templates',
  component: MoverInfo,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-full md:w-full xl:w-1/2'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MoverInfo>;

const Template: StoryFn<typeof MoverInfo> = (args) => <MoverInfo {...args} />;

export const MoverStatInfo = Template.bind({});

MoverStatInfo.args = {
  variant: 'quote',
  subVariant: 'pending',
  moverName: '김코드',
  movingType: 'small',
  isCustomQuote: true,
  quoteState: 'confirmedQuote',
  rating: 5,
  ratingCount: 500,
  experienceYears: 3,
  isFavoriteMoverInfo: true,
  quoteCount: 500,
  favoriteCount: 500,
  price: 50000,
  movingDate: new Date(),
  departure: '서울 중구',
  arrival: '경기도 김포시',
  onConfirmClick: () => alert(''),
  onDetailClick: () => alert(''),
};

export const PendingReviewInfo = Template.bind({});

PendingReviewInfo.args = {
  variant: 'review',
  subVariant: 'pending',
  moverName: '김코드',
  movingType: 'small',
  isCustomQuote: true,
  date: new Date(),
  price: 50000,
  onClickReviewButton: () => alert(''),
};

export const WrittenReviewInfo = Template.bind({});

WrittenReviewInfo.args = {
  variant: 'review',
  subVariant: 'written',
  moverName: '김코드',
  movingType: 'small',
  isCustomQuote: true,
  date: new Date(),
  price: 50000,
  reviewContent: '친절하고 좋아요 다음에도 요청드릴게요.',
  rating: 5,
  writtenAt: new Date(),
};
